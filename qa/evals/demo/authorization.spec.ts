import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import { expect, test } from "@playwright/test";
import { FoldersService } from "@api/services/FoldersService";

// Controlled miniature API, not the sample FastAPI app or real authentication.
// Both runs use this same test. Only the fixture's authorization behavior changes.
test("Viewer cannot create folders because Viewer is read-only", async ({
  playwright,
}, testInfo) => {
  const folders: Array<{ id: string; name: string }> = [];
  const faulty = process.env.QA_DEMO_FAULT === "authorization";
  const server = createServer((request, response) => {
    response.setHeader("Content-Type", "application/json");
    if (request.url !== FoldersService.routes.folders) {
      response.writeHead(404).end(JSON.stringify({ detail: "Not found" }));
    } else if (request.method === "GET") {
      response.end(JSON.stringify(folders));
    } else if (request.method === "POST" && request.headers["x-demo-role"] === "viewer") {
      if (faulty) {
        const folder = { id: "controlled-folder", name: "viewer-write" };
        folders.push(folder);
        response.end(JSON.stringify(folder));
      } else {
        response.writeHead(403).end(JSON.stringify({ detail: "Viewer is read-only" }));
      }
    } else {
      response.writeHead(405).end(JSON.stringify({ detail: "Unsupported demo request" }));
    }
  });
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  try {
    const baseURL = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
    const context = await playwright.request.newContext({
      baseURL,
      extraHTTPHeaders: { "X-Demo-Role": "viewer" },
    });
    try {
      const service = new FoldersService(context);
      const created = await service.create("viewer-write");
      const listed = await service.list();
      const exchange = {
        fixture: "controlled miniature API; role header is not authentication",
        request: { method: "POST", path: FoldersService.routes.folders, role: "viewer" },
        response: { status: created.status(), body: (await created.json()) as unknown },
        after: { status: listed.status(), folders: (await listed.json()) as unknown },
      };
      await testInfo.attach("api-evidence", {
        body: Buffer.from(JSON.stringify(exchange, null, 2)),
        contentType: "application/json",
      });
      expect(created.status(), "Viewer writes must be rejected").toBe(403);
      expect(listed.ok()).toBeTruthy();
      expect(exchange.after.folders).toEqual([]);
    } finally {
      await context.dispose();
    }
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
      server.closeAllConnections();
    });
  }
});
