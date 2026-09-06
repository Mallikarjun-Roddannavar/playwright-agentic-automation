import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import process from "node:process";

const root = process.cwd();
const resultRoot = path.join(root, "qa-results", "runtime");
const result = spawnSync(
  process.execPath,
  [
    path.join(root, "node_modules", "playwright", "cli.js"),
    "test",
    "--config=qa-evals/runtime/playwright.config.ts",
  ],
  { cwd: root, encoding: "utf8", timeout: 60_000 }
);
if (result.stdout) globalThis.console.log(result.stdout.trimEnd());
if (result.stderr) globalThis.console.error(result.stderr.trimEnd());
const artifacts = listFiles(resultRoot).map((file) =>
  path.relative(root, file).replaceAll(path.sep, "/")
);
if (!artifacts.some((artifact) => artifact.endsWith(".zip") || artifact.endsWith(".png"))) {
  throw new Error("Controlled fixture did not produce a Playwright trace or screenshot artifact.");
}
if (result.status !== 1 && !result.signal) {
  throw new Error(
    `Controlled locator-drift fixture should fail with exit code 1; received ${result.status}.`
  );
}
const diagnosis = {
  test: "controlled locator drift preserves supported login behavior",
  status: "FAILED",
  classification: "LOCATOR_DRIFT",
  confidence: "HIGH",
  testModificationAllowed: true,
  reason:
    "The intentionally stale 'Sign in now' locator does not match the supported login button.",
  evidence: ["failed-test", "current-ui-or-dom", "test-intent", "product-behavior"],
  artifacts,
  changedFiles: [],
};
fs.mkdirSync(resultRoot, { recursive: true });
fs.writeFileSync(path.join(resultRoot, "result.json"), `${JSON.stringify(diagnosis, null, 2)}\n`);
globalThis.console.log(
  `\nPASS Controlled runtime evidence written to ${path.relative(root, resultRoot)}.`
);
if (result.signal)
  globalThis.console.log(
    "The runner timed out after artifacts were written; inspect the artifact files before treating execution cleanup as complete."
  );

function listFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const candidate = path.join(directory, entry.name);
    return entry.isDirectory() ? listFiles(candidate) : [candidate];
  });
}
