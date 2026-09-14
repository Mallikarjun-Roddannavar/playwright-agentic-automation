import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const input = process.argv[2];
if (!input) throw new Error("Usage: npm run qa:validate-result -- <result.json>");
const resultPath = path.resolve(root, input);
const result = JSON.parse(fs.readFileSync(resultPath, "utf8"));
const schema = JSON.parse(fs.readFileSync(path.join(root, "qa", "evidence-schema.json"), "utf8"));
const allowed = new Set(Object.keys(schema.properties));
for (const key of schema.required) {
  if (!(key in result)) throw new Error(`QA result is missing required field: ${key}`);
}
for (const key of Object.keys(result)) {
  if (!allowed.has(key)) throw new Error(`QA result contains unsupported field: ${key}`);
}
for (const [key, definition] of Object.entries(schema.properties)) {
  if (!(key in result) || !definition.enum) continue;
  if (!definition.enum.includes(result[key]))
    throw new Error(`QA result has invalid ${key}: ${result[key]}`);
}
for (const [key, definition] of Object.entries(schema.properties)) {
  if (!(key in result)) continue;
  const value = result[key];
  if (definition.type === "string" && (typeof value !== "string" || !value.trim()))
    throw new Error(`${key} must be a non-empty string.`);
  if (definition.type === "boolean" && typeof value !== "boolean")
    throw new Error(`${key} must be boolean.`);
  if (
    definition.type === "array" &&
    (!Array.isArray(value) ||
      value.length < (definition.minItems ?? 0) ||
      value.some((item) => typeof item !== "string" || !item.trim()))
  )
    throw new Error(`${key} must be an array of non-empty strings.`);
}
const policy = JSON.parse(fs.readFileSync(path.join(root, "qa", "failure-taxonomy.json"), "utf8"));
const category = policy.categories[result.classification];
if (!category) throw new Error("Classification is missing from the failure policy.");
const missing = category.expectedEvidence.filter((item) => !result.evidence.includes(item));
if (missing.length) throw new Error(`Missing policy evidence categories: ${missing.join(", ")}`);
if (
  result.testModificationAllowed &&
  (category.modification !== "PERMITTED_WITH_HIGH_CONFIDENCE" ||
    result.confidence !== "HIGH" ||
    result.status !== "FAILED")
)
  throw new Error(
    "This result cannot grant test modification under the failure policy. Record review separately when required."
  );
for (const artifact of result.artifacts ?? []) {
  const absolute = path.resolve(root, artifact);
  const relative = path.relative(root, absolute);
  if (
    relative.startsWith("..") ||
    path.isAbsolute(relative) ||
    !fs.existsSync(absolute) ||
    !fs.statSync(absolute).isFile()
  )
    throw new Error(`Artifact must be an existing repository-local file: ${artifact}`);
}
globalThis.console.log(
  `PASS QA result is valid: ${result.test} (${result.classification}, ${result.confidence})`
);
globalThis.console.log(
  "Structure and policy consistency checked; evidence labels do not prove diagnosis or human approval."
);
