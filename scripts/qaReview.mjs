import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const input = process.argv[2];
if (!input) throw new Error("Usage: npm run qa:review -- <review.json>");
const review = JSON.parse(fs.readFileSync(path.resolve(root, input), "utf8"));
for (const key of ["result", "decision", "reviewedBy", "reviewedAt", "reason"]) {
  if (!review[key]) throw new Error(`Review record is missing ${key}.`);
}
if (!["APPROVED", "REJECTED", "REVIEW_REQUIRED"].includes(review.decision)) {
  throw new Error("decision must be APPROVED, REJECTED, or REVIEW_REQUIRED.");
}
if (review.decision === "APPROVED" && review.result.classification === "UNKNOWN") {
  throw new Error("UNKNOWN classifications cannot be approved for modification.");
}
globalThis.console.log(`PASS human review record is valid: ${review.decision} by ${review.reviewedBy}`);
