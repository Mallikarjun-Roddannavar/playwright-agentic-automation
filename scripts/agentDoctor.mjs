import { spawnSync } from "node:child_process";
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import process from "node:process";

const repoRoot = process.cwd();
const require = createRequire(import.meta.url);
const results = [];

recordNodeVersion();
recordPath(
  "Root dependencies",
  "node_modules/@playwright/test/package.json",
  "Run npm install from the repository root."
);
recordPath(
  "Frontend dependencies",
  "app/frontend/node_modules/vite/package.json",
  "Run npm install in app/frontend."
);
recordBackendEnvironment();
recordChromium();
recordKnowledgeFreshness();

const failures = results.filter((result) => result.status === "FAIL");
globalThis.console.log("\nAgent readiness summary");
globalThis.console.log(`${results.length - failures.length}/${results.length} checks passed.`);

if (failures.length > 0) {
  globalThis.console.error(
    "Resolve the failed checks before running the agent demo or Playwright suite."
  );
  process.exitCode = 1;
} else {
  globalThis.console.log("Ready. Next: npm run agent:demo");
}

function recordNodeVersion() {
  const major = Number.parseInt(process.versions.node.split(".")[0] ?? "0", 10);
  if (major >= 20) {
    pass("Node.js", `v${process.versions.node}`);
    return;
  }

  fail(
    "Node.js",
    `v${process.versions.node}; Node.js 20 or newer is required.`,
    "Install Node.js 20 or newer."
  );
}

function recordPath(label, relativePath, resolution) {
  if (fs.existsSync(path.join(repoRoot, relativePath))) {
    pass(label, relativePath);
    return;
  }

  fail(label, `${relativePath} was not found.`, resolution);
}

function recordBackendEnvironment() {
  const pythonPath = path.join(
    repoRoot,
    "app",
    "backend",
    ".venv",
    process.platform === "win32" ? "Scripts/python.exe" : "bin/python"
  );

  if (!fs.existsSync(pythonPath)) {
    fail(
      "Backend environment",
      "app/backend/.venv was not found.",
      "Create it and install dependencies as documented in docs/GETTING_STARTED.md."
    );
    return;
  }

  const result = run(pythonPath, ["-c", "import fastapi, uvicorn, pydantic"], "app/backend");
  if (result.status === 0) {
    pass("Backend environment", "FastAPI dependencies import successfully.");
    return;
  }

  fail(
    "Backend environment",
    "The virtual environment cannot import FastAPI dependencies.",
    "Run the backend dependency installation in docs/GETTING_STARTED.md."
  );
}

function recordChromium() {
  try {
    const { chromium } = require("playwright");
    const executablePath = chromium.executablePath();
    if (fs.existsSync(executablePath)) {
      pass("Playwright Chromium", executablePath);
      return;
    }
  } catch {
    // The root dependency check provides the actionable install message.
  }

  fail(
    "Playwright Chromium",
    "The Chromium executable is not installed.",
    "Run npm run install:browsers."
  );
}

function recordKnowledgeFreshness() {
  const result = run(process.execPath, ["scripts/buildKnowledge.mjs", "--check"], repoRoot);
  if (result.status === 0) {
    pass("Knowledge freshness", "Generated codebase knowledge is current.");
    return;
  }

  fail(
    "Knowledge freshness",
    "Generated codebase knowledge is stale or cannot be checked.",
    "Run npm run knowledge:build, then npm run knowledge:validate."
  );
}

function run(command, args, cwd) {
  return spawnSync(command, args, {
    cwd,
    encoding: "utf8",
    stdio: "pipe",
  });
}

function pass(label, detail) {
  results.push({ status: "PASS" });
  globalThis.console.log(`PASS ${label}: ${detail}`);
}

function fail(label, detail, resolution) {
  results.push({ status: "FAIL" });
  globalThis.console.error(`FAIL ${label}: ${detail}`);
  globalThis.console.error(`  Fix: ${resolution}`);
}
