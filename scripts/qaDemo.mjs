import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { createHash } from "node:crypto";
import { Buffer } from "node:buffer";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const parent = path.join(root, "qa-results", "demo");
fs.mkdirSync(parent, { recursive: true });
const run = fs.mkdtempSync(path.join(parent, "run-"));
const sources = [
  "knowledge/01-product/requirements/rbac.md",
  "api/specs/rbac.spec.ts",
  "api/services/FoldersService.ts",
  "api/services/BaseApiService.ts",
  "qa/evals/demo/authorization.spec.ts",
  "qa/evals/demo/playwright.config.ts",
  "qa/failure-taxonomy.json",
];
const manifest = {
  kind: "controlled-demo-not-agent-evaluation",
  startedAt: new Date().toISOString(),
  sources: Object.fromEntries(sources.map((file) => [file, digest(file)])),
  runs: [],
};
console.log("Living QA + Product Knowledge demo\n");
console.log("Intent: REQ-RBAC-001 says Viewer is read-only. The existing API test expects 403.");
console.log(
  "The requirement leaves the exact HTTP status open; a successful write still violates read-only intent."
);
console.log(
  "Running real Playwright requests against an isolated miniature API, not the sample app.\n"
);
try {
  for (const phase of ["correct", "faulty"]) {
    const directory = path.join(run, phase);
    fs.mkdirSync(directory);
    const args = [
      "node_modules/playwright/cli.js",
      "test",
      "--config=qa/evals/demo/playwright.config.ts",
      `--output=${path.join(directory, "artifacts")}`,
    ];
    const result = spawnSync(process.execPath, args, {
      cwd: root,
      env: {
        ...process.env,
        QA_DEMO_FAULT: phase === "faulty" ? "authorization" : "",
        PLAYWRIGHT_JSON_OUTPUT_FILE: path.join(directory, "report.json"),
      },
      encoding: "utf8",
      timeout: 45_000,
    });
    fs.writeFileSync(
      path.join(directory, "runner.log"),
      `${result.stdout ?? ""}\n${result.stderr ?? ""}`
    );
    if (result.error || result.signal || result.status !== (phase === "correct" ? 0 : 1)) {
      throw new Error(
        `${phase}: runner did not complete with the required exit code; inspect runner.log. ${result.error?.message ?? ""}`
      );
    }
    const report = JSON.parse(fs.readFileSync(path.join(directory, "report.json"), "utf8"));
    const tests = flatten(report.suites);
    if (report.errors?.length || tests.length !== 1 || tests[0].results.length !== 1)
      throw new Error(`${phase}: unexpected runner errors or test count.`);
    const actual = tests[0].results[0];
    if (actual.status !== (phase === "correct" ? "passed" : "failed"))
      throw new Error(`${phase}: unexpected test status ${actual.status}.`);
    const attachment = actual.attachments.find((item) => item.name === "api-evidence");
    if (!attachment?.body) throw new Error(`${phase}: API evidence is missing.`);
    const evidence = JSON.parse(Buffer.from(attachment.body, "base64").toString("utf8"));
    if (
      evidence.response.status !== (phase === "correct" ? 403 : 200) ||
      evidence.after.status !== 200 ||
      !Array.isArray(evidence.after.folders) ||
      evidence.after.folders.length !== (phase === "correct" ? 0 : 1)
    )
      throw new Error(`${phase}: observed API evidence does not match the controlled experiment.`);
    if (
      phase === "faulty" &&
      !actual.errors.some((error) => error.message?.includes("Viewer writes must be rejected"))
    )
      throw new Error("The failure was not the intended authorization assertion.");
    fs.writeFileSync(
      path.join(directory, "api-evidence.json"),
      `${JSON.stringify(evidence, null, 2)}\n`
    );
    manifest.runs.push({
      phase,
      exitCode: result.status,
      testStatus: actual.status,
      command: [process.execPath, ...args],
      directory: path.relative(root, directory).replaceAll(path.sep, "/"),
    });
    console.log(
      `${phase}: test ${actual.status}; POST ${evidence.response.status}; stored folders ${evidence.after.folders.length}.`
    );
  }
  for (const file of sources)
    if (digest(file) !== manifest.sources[file])
      throw new Error(`Source changed during demonstration: ${file}`);
  console.log(
    "\nDemonstration complete: the unchanged regression catches the injected unauthorized write."
  );
  console.log(
    "Policy says preserve this failure. Ask your coding agent to inspect the evidence and explain its decision."
  );
  console.log(
    "This script checks a controlled experiment; it does not measure or impersonate an agent."
  );
  manifest.completed = true;
} catch (error) {
  manifest.completed = false;
  manifest.error = error.message;
  console.error(`Demo incomplete: ${error.message}`);
  process.exitCode = 1;
} finally {
  fs.writeFileSync(path.join(run, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Evidence: ${path.relative(root, run).replaceAll(path.sep, "/")}`);
}

function digest(file) {
  return createHash("sha256")
    .update(fs.readFileSync(path.join(root, file)))
    .digest("hex");
}
function flatten(suites) {
  return suites.flatMap((suite) => [
    ...(suite.specs ?? []).flatMap((spec) => spec.tests),
    ...flatten(suite.suites ?? []),
  ]);
}
