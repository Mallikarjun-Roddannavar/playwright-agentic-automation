import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { execFileSync } from "node:child_process";
import { fileURLToPath, URL } from "node:url";

const root = process.cwd();
const input = process.argv[2];
if (!input) throw new Error("Usage: npm run qa:review -- <review.json>");
const review = JSON.parse(fs.readFileSync(path.resolve(root, input), "utf8"));
for (const key of ["result", "decision", "reviewedBy", "reviewedAt", "reason"]) {
  if (typeof review[key] !== "string" || !review[key].trim())
    throw new Error(`Review record needs a non-empty ${key}; result must name a result JSON file.`);
}
if (!Number.isFinite(Date.parse(review.reviewedAt)))
  throw new Error("reviewedAt must be a date-time.");
execFileSync(
  process.execPath,
  [fileURLToPath(new URL("qaResult.mjs", import.meta.url)), review.result],
  { cwd: root, stdio: "pipe" }
);
const result = JSON.parse(fs.readFileSync(path.resolve(root, review.result), "utf8"));
const policy = JSON.parse(fs.readFileSync(path.join(root, "qa", "failure-taxonomy.json"), "utf8"));
if (!["APPROVED", "REJECTED", "REVIEW_REQUIRED"].includes(review.decision)) {
  throw new Error("decision must be APPROVED, REJECTED, or REVIEW_REQUIRED.");
}
if (
  review.decision === "APPROVED" &&
  (policy.categories[result.classification].modification === "NOT_PERMITTED" ||
    result.confidence !== "HIGH" ||
    result.status !== "FAILED")
) {
  throw new Error(
    "This classification, status or confidence cannot be approved for test modification."
  );
}
globalThis.console.log(
  `PASS human review record is valid: ${review.decision} by ${review.reviewedBy}`
);
globalThis.console.log(
  "The record is structurally valid; reviewer identity and consent must be verified by the team."
);
