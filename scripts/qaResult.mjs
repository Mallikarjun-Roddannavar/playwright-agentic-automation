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
  if (!definition.enum.includes(result[key])) throw new Error(`QA result has invalid ${key}: ${result[key]}`);
}
if (typeof result.testModificationAllowed !== "boolean") throw new Error("testModificationAllowed must be boolean.");
if (!Array.isArray(result.evidence) || result.evidence.length === 0) throw new Error("evidence must be non-empty.");
globalThis.console.log(`PASS QA result is valid: ${result.test} (${result.classification}, ${result.confidence})`);
