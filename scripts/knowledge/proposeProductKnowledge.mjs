import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { logWorkflowEvent } from "./WorkflowLog.mjs";

const root = process.cwd();
const inputArgument = process.argv.find((argument) => argument.startsWith("--file="));
const input = inputArgument?.slice("--file=".length);
if (!input) {
  globalThis.console.error(
    "Usage: npm run knowledge:product:propose -- --file=requirements/incoming/REQ-EXAMPLE-001.md"
  );
  process.exitCode = 1;
} else {
  const inputPath = path.resolve(root, input);
  const incomingRoot = path.resolve(root, "requirements", "incoming");
  if (!inputPath.startsWith(`${incomingRoot}${path.sep}`) || !fs.existsSync(inputPath)) {
    globalThis.console.error("The input file must exist under requirements/incoming/.");
    process.exitCode = 1;
  } else {
    const filename = path.basename(inputPath, path.extname(inputPath));
    const outputRoot = path.join(root, "knowledge", "drafts", "product");
    const outputPath = path.join(outputRoot, `${filename}.md`);
    fs.mkdirSync(outputRoot, { recursive: true });
    if (!fs.existsSync(outputPath)) {
      const raw = fs.readFileSync(inputPath, "utf8").trim();
      const lines = [
        "---",
        "type: Product Requirement Draft",
        `id: ${filename}`,
        "status: draft",
        "trust_status: grounded",
        "review_status: pending",
        `source_requirement: /${path.relative(root, inputPath).replaceAll("\\", "/")}`,
        "---",
        "",
        `# Proposed product knowledge: ${filename}`,
        "",
        "## Raw requirement",
        "",
        raw,
        "",
        "## Agent proposal",
        "",
        "- Feature overview: pending semantic review.",
        "- Business requirement: pending semantic review.",
        "- Acceptance criteria: pending semantic review.",
        "- Expected behavior: pending semantic review.",
        "- Business rules and ambiguities: pending semantic review.",
        "",
        "An external AI coding agent may complete this proposal, but a human must review its meaning before it is copied to knowledge/01-product/requirements/.",
        "",
      ];
      fs.writeFileSync(outputPath, lines.join("\n"), "utf8");
      globalThis.console.log(`Product draft created: ${path.relative(root, outputPath)}`);
    } else {
      globalThis.console.log(`Product draft already exists: ${path.relative(root, outputPath)}`);
    }
    logWorkflowEvent({
      stage: "product-proposal",
      status: "COMPLETED",
      artifact: path.relative(root, outputPath).replaceAll("\\", "/"),
      source: path.relative(root, inputPath).replaceAll("\\", "/"),
    });
  }
}
