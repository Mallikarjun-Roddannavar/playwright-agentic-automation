import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";
import { test } from "node:test";
import { reviewedDrafts } from "../knowledge/ReviewGate.mjs";

const root = process.cwd();
function sandbox(t) {
  const parent = path.resolve(root, "qa-results", "tooling-tests");
  fs.mkdirSync(parent, { recursive: true });
  const directory = fs.mkdtempSync(path.join(parent, "qa-safety-"));
  t.after(() => {
    assert.equal(path.dirname(path.resolve(directory)), parent);
    fs.rmSync(directory, { recursive: true, force: true });
  });
  fs.cpSync(path.join(root, "qa"), path.join(directory, "qa"), { recursive: true });
  return directory;
}
function run(script, args, cwd) {
  return spawnSync(process.execPath, [path.join(root, "scripts", script), ...args], {
    cwd,
    encoding: "utf8",
  });
}
function result(classification = "APPLICATION_DEFECT") {
  const policy = JSON.parse(fs.readFileSync(path.join(root, "qa/failure-taxonomy.json"), "utf8"));
  return {
    test: "Viewer write",
    status: "FAILED",
    classification,
    confidence: "HIGH",
    testModificationAllowed: false,
    reason: "Observed unauthorized write",
    evidence: policy.categories[classification].expectedEvidence,
  };
}
function write(directory, name, value) {
  fs.writeFileSync(path.join(directory, name), JSON.stringify(value));
}

test("result gate rejects forbidden permission, malformed data and missing evidence", (t) => {
  const directory = sandbox(t);
  for (const invalid of [
    { ...result(), testModificationAllowed: true },
    { ...result(), reason: 7 },
    { ...result(), evidence: ["failed-test"] },
    { ...result(), evidence: [7] },
    { ...result(), artifacts: ["missing-trace.zip"] },
    { ...result("LOCATOR_DRIFT"), testModificationAllowed: true, confidence: "LOW" },
  ]) {
    write(directory, "result.json", invalid);
    assert.notEqual(run("qaResult.mjs", ["result.json"], directory).status, 0);
  }
  write(directory, "result.json", result());
  assert.equal(run("qaResult.mjs", ["result.json"], directory).status, 0);
  write(directory, "result.json", { ...result("LOCATOR_DRIFT"), testModificationAllowed: true });
  assert.equal(run("qaResult.mjs", ["result.json"], directory).status, 0);
});

test("human-review record cannot override a product-defect repair prohibition", (t) => {
  const directory = sandbox(t);
  write(directory, "result.json", result());
  write(directory, "review.json", {
    result: "result.json",
    decision: "APPROVED",
    reviewedBy: "fixture-reviewer",
    reviewedAt: "2026-09-10T10:00:00Z",
    reason: "fixture only",
  });
  assert.notEqual(run("qaReview.mjs", ["review.json"], directory).status, 0);
  write(directory, "result.json", result("ASSERTION_ERROR"));
  assert.equal(run("qaReview.mjs", ["review.json"], directory).status, 0);
});

test("portable scanner accepts existing locator layout but rejects unsafe and empty scans", (t) => {
  const directory = sandbox(t);
  fs.mkdirSync(path.join(directory, "tests"));
  const file = path.join(directory, "tests", "example.test.js");
  fs.writeFileSync(file, 'await expect(page.getByRole("button")).toBeVisible();');
  assert.equal(run("qaGuardrails.mjs", ["--portable", "tests"], directory).status, 0);
  assert.notEqual(run("qaGuardrails.mjs", ["tests"], directory).status, 0);
  fs.writeFileSync(file, "await customPage.waitForTimeout(1000);\nexpect(true).toBe(true);");
  assert.notEqual(run("qaGuardrails.mjs", ["--portable", "tests"], directory).status, 0);
  fs.unlinkSync(file);
  assert.notEqual(run("qaGuardrails.mjs", ["--portable", "tests"], directory).status, 0);
});

test("all promotion entry points preserve pending drafts without creating active knowledge", (t) => {
  const directory = sandbox(t);
  for (const [stage, script] of [
    ["product", "promoteProductKnowledge.mjs"],
    ["manual", "promoteManualKnowledge.mjs"],
    ["automated", "promoteKnowledge.mjs"],
  ]) {
    const drafts = path.join(directory, "knowledge", "drafts", stage);
    fs.mkdirSync(drafts, { recursive: true });
    const file = path.join(drafts, "REQ-EXAMPLE-001.md");
    const original =
      "---\nstatus: draft\nreview_status: pending\n---\nUnreviewed product meaning\n";
    fs.writeFileSync(file, original);
    assert.notEqual(run(`knowledge/${script}`, [], directory).status, 0);
    assert.equal(fs.readFileSync(file, "utf8"), original);
    assert.equal(fs.existsSync(path.join(directory, "knowledge", "archive")), false);
  }
});

test("review gate requires recorded review and existing evidence", (t) => {
  const directory = sandbox(t);
  const drafts = path.join(directory, "knowledge", "drafts", "manual");
  fs.mkdirSync(drafts, { recursive: true });
  const file = path.join(drafts, "example.md");
  const body =
    '---\nstatus: draft\nreview_status: reviewed\nreviewed_by: fixture-reviewer\nreviewed_at: "2026-09-10T10:00:00Z"\nreview_reference: fixture-only\nsources:\n  - resource: /evidence.txt\n---\n';
  fs.writeFileSync(file, body);
  assert.throws(() => reviewedDrafts(directory, "manual"), /missing or external evidence/);
  fs.writeFileSync(path.join(directory, "evidence.txt"), "fixture evidence");
  assert.deepEqual(reviewedDrafts(directory, "manual"), ["example.md"]);
  fs.writeFileSync(file, body.replace("reviewed_by: fixture-reviewer\n", ""));
  assert.throws(() => reviewedDrafts(directory, "manual"), /record reviewed_by/);
});

test("relationships reject archive-only endpoints and preserve broken evidence during sync", (t) => {
  const directory = sandbox(t);
  const knowledge = path.join(directory, "knowledge");
  fs.mkdirSync(path.join(knowledge, "archive"), { recursive: true });
  fs.writeFileSync(path.join(knowledge, "archive", "old.md"), "---\nid: old-only\n---\n");
  const relation = {
    from: "old-only",
    to: "missing.ts",
    relation: "SUPPORTED_BY_SOURCE",
    evidence: ["missing.ts"],
  };
  write(knowledge, "relationships.json", {
    format: "semantic-knowledge-relationships",
    version: "1.0",
    relationships: [relation],
  });
  assert.notEqual(run("knowledge/validateRelationships.mjs", [], directory).status, 0);
  assert.equal(run("knowledge/syncRelationships.mjs", [], directory).status, 0);
  assert.equal(
    JSON.parse(fs.readFileSync(path.join(knowledge, "relationships.json"), "utf8")).relationships
      .length,
    1
  );
});
