import { randomUUID } from "node:crypto";

import { FilesService } from "@api/services/FilesService";
import { FoldersService } from "@api/services/FoldersService";
import { folderName } from "@utils/common/CommonUtils";
import { test, expect } from "@utils/fixtures/TestFixtures";

test("uploads use safe storage names and reject unauthorized or missing folders", async ({
  editorRequest,
  viewerRequest,
  adminRequest,
  cleanup,
}) => {
  const editorFolders = new FoldersService(editorRequest);
  const adminFolders = new FoldersService(adminRequest);
  const createResponse = await editorFolders.create(folderName("api-files"));
  expect(createResponse.ok()).toBeTruthy();
  const folder = (await createResponse.json()) as { id: string };

  cleanup.add(async () => {
    const response = await adminFolders.remove(folder.id);
    expect(response.ok()).toBeTruthy();
  });

  const editorFiles = new FilesService(editorRequest);
  const viewerFiles = new FilesService(viewerRequest);
  const uploadResponse = await editorFiles.upload(
    folder.id,
    "../nested\\unsafe-name.txt",
    Buffer.from("safe upload content", "utf-8")
  );
  expect(uploadResponse.ok()).toBeTruthy();
  const uploaded = (await uploadResponse.json()) as { name: string; storedName: string };
  expect(uploaded).toMatchObject({ name: "unsafe-name.txt" });
  expect(uploaded.storedName).toMatch(/^[a-f0-9]{32}$/);

  const viewerUpload = await viewerFiles.upload(
    folder.id,
    "viewer.txt",
    Buffer.from("viewer cannot upload", "utf-8")
  );
  expect(viewerUpload.status()).toBe(403);

  const missingFolderUpload = await editorFiles.upload(
    randomUUID(),
    "orphan.txt",
    Buffer.from("must not be written", "utf-8")
  );
  expect(missingFolderUpload.status()).toBe(404);

  const listResponse = await editorFiles.list(folder.id);
  expect(listResponse.ok()).toBeTruthy();
  const files = (await listResponse.json()) as Array<{ id: string }>;
  expect(files).toHaveLength(1);
});
