import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const defaultFile = path.join(root, "knowledge", "evaluations", "login.json");

function parseArgs(args) {
  const values = { file: defaultFile };
  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === "--file") {
      values.file = path.resolve(root, args[index + 1]);
      index += 1;
    } else if (args[index] === "--help" || args[index] === "-h") {
      values.help = true;
    }
  }
  return values;
}

function usage() {
  console.log("Usage: node ./scripts/knowledge/evaluateAnswers.mjs [--file <evaluation.json>]");
}

function normalize(value) {
  return String(value).toLowerCase();
}

function findMissingPhrases(response, phrases) {
  const normalized = normalize(response);
  return phrases.filter((phrase) => !normalized.includes(normalize(phrase)));
}

function findForbiddenPhrases(response, phrases) {
  const normalized = normalize(response);
  return phrases.filter((phrase) => normalized.includes(normalize(phrase)));
}

function evaluateCase(testCase) {
  const response = typeof testCase.response === "string" ? testCase.response : "";
  const missingPhrases = findMissingPhrases(response, testCase.requiredPhrases ?? []);
  const forbiddenPhrases = findForbiddenPhrases(response, testCase.forbiddenPhrases ?? []);
  const missingEvidence = (testCase.evidencePaths ?? []).filter(
    (relativePath) => !fs.existsSync(path.join(root, relativePath))
  );

  const failures = [];
  if (!response.trim()) failures.push("response is empty");
  if (missingPhrases.length)
    failures.push(`missing required phrases: ${missingPhrases.join(", ")}`);
  if (forbiddenPhrases.length)
    failures.push(`forbidden claims found: ${forbiddenPhrases.join(", ")}`);
  if (missingEvidence.length)
    failures.push(`missing evidence files: ${missingEvidence.join(", ")}`);

  return {
    id: testCase.id,
    question: testCase.question,
    status: failures.length ? "FAIL" : "PASS",
    failures,
    checked: {
      requiredPhrases: testCase.requiredPhrases?.length ?? 0,
      evidencePaths: testCase.evidencePaths?.length ?? 0,
      forbiddenPhrases: testCase.forbiddenPhrases?.length ?? 0,
    },
  };
}

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  usage();
  process.exit(0);
}

try {
  const suite = JSON.parse(fs.readFileSync(args.file, "utf8"));
  if (!Array.isArray(suite.cases) || suite.cases.length === 0) {
    throw new Error("Evaluation file must contain a non-empty cases array");
  }

  console.log(`Knowledge answer evaluation: ${suite.suite ?? path.basename(args.file)}`);
  const results = suite.cases.map(evaluateCase);
  for (const result of results) {
    console.log(`${result.status}: ${result.id}`);
    if (result.failures.length) {
      for (const failure of result.failures) console.log(`  - ${failure}`);
    }
  }

  const failed = results.filter((result) => result.status === "FAIL");
  console.log(
    `Evaluation summary: ${results.length - failed.length} passed, ${failed.length} failed.`
  );
  if (failed.length) process.exitCode = 1;
} catch (error) {
  console.error(`Knowledge answer evaluation failed: ${error.message}`);
  process.exitCode = 1;
}
