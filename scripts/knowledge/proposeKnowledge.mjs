import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { logWorkflowEvent } from "./WorkflowLog.mjs";

const root = process.cwd();
const inventoryPath = path.join(root, "knowledge", "test-inventory.json");
if (!fs.existsSync(inventoryPath)) {
  logWorkflowEvent({ stage: "proposal", status: "ERROR", error: "Test inventory is missing" });
  globalThis.console.error("Test inventory is missing. Run npm run knowledge:inventory first.");
  process.exitCode = 1;
} else {
  const inventory = JSON.parse(fs.readFileSync(inventoryPath, "utf8"));
  const draftsRoot = path.join(root, "knowledge", "drafts");
  fs.mkdirSync(draftsRoot, { recursive: true });
  for (const item of inventory.tests) {
    const slug = item.spec.replace(/\.spec\.ts$/u, "").replaceAll(/[\\/]/gu, "-");
    const draftPath = path.join(draftsRoot, `${slug}.md`);
    const relationships =
      item.relationships.map((entry) => `- ${entry.relation}: ${entry.target}`).join("\n") ||
      "- None extracted";
    const content = `---\ntype: Testing Knowledge Proposal\nid: draft-${slug}\nstatus: draft\ntrust_status: grounded\nfeature_status: candidate\nverification_status: pending\nsources:\n  - resource: /${item.spec}\n---\n\n# ${item.spec}\n\nThis is an agent-generated proposal. Review the semantic feature name before promotion.\n\n## Test evidence\n\n- Kind: ${item.kind}\n- Describe blocks: ${item.describe.join(", ") || "None extracted"}\n- Tests: ${item.tests.join(", ") || "No test titles extracted"}\n- Source SHA-256: ${item.source_sha256}\n\n## Static relationships\n\n${relationships}\n`;
    if (!fs.existsSync(draftPath)) {
      fs.writeFileSync(draftPath, content, "utf8");
    } else {
      const existing = fs.readFileSync(draftPath, "utf8");
      if (existing.includes("This is an agent-generated proposal.")) {
        const refreshed = existing.replace(
          /## Static relationships[\s\S]*?(?=\r?\nverification_status:|$)/u,
          `## Static relationships\n\n${relationships}\n`
        );
        fs.writeFileSync(draftPath, refreshed, "utf8");
      }
    }
  }
  globalThis.console.log(
    `Knowledge proposals available: ${inventory.tests.length}. Existing drafts were preserved.`
  );
  logWorkflowEvent({
    stage: "proposal",
    status: "COMPLETED",
    artifact: "knowledge/drafts/",
    draftCount: inventory.tests.length,
  });
}
