import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = process.cwd();
const suppliedPaths = process.argv.slice(2).filter((argument) => !argument.startsWith("-"));
const targets = suppliedPaths.length > 0 ? suppliedPaths : ["ui/specs", "api/specs"];
const findings = [];

for (const target of targets) {
  inspectTarget(target);
}

globalThis.console.log("QA Guardrails\n");
if (findings.length === 0) {
  globalThis.console.log("PASS  No guarded anti-patterns found.");
  globalThis.console.log("\nResult: PASS");
  process.exit(0);
}
for (const finding of findings) {
  globalThis.console.log(
    `${finding.level.padEnd(5)} ${finding.file}:${finding.line} ${finding.message}`
  );
}
const blocked = findings.some((finding) => finding.level === "FAIL");
globalThis.console.log(`\nResult: ${blocked ? "BLOCKED" : "WARNINGS"}`);
process.exitCode = blocked ? 1 : 0;

function inspectTarget(target) {
  const absoluteTarget = path.resolve(repoRoot, target);
  if (!fs.existsSync(absoluteTarget)) {
    findings.push({ level: "FAIL", file: target, line: 1, message: "Target does not exist." });
    return;
  }
  const files = fs.statSync(absoluteTarget).isDirectory()
    ? collectFiles(absoluteTarget)
    : [absoluteTarget];
  for (const filePath of files.filter((file) => /\.spec\.ts$/.test(file))) {
    inspectSpec(filePath);
  }
}

function collectFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? collectFiles(entryPath) : [entryPath];
  });
}

function inspectSpec(filePath) {
  const relativePath = path.relative(repoRoot, filePath).replaceAll(path.sep, "/");
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  let assertionCount = 0;
  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    if (/\bexpect\s*\(/.test(line)) assertionCount += 1;
    reportIf(
      line,
      /page\.waitForTimeout\s*\(/,
      "FAIL",
      "Hard wait introduced; use a domain or web-first readiness condition."
    );
    reportIf(
      line,
      /\btest\.(?:skip|fixme|only)\s*\(/,
      "FAIL",
      "Test disabling or focused execution is not permitted in QA changes."
    );
    reportIf(line, /force\s*:\s*true/, "FAIL", "Forced interaction hides actionability failures.");
    reportIf(
      line,
      /\.nth\s*\(\s*\d+\s*\)/,
      "WARN",
      "Arbitrary nth() locator needs documented stability evidence."
    );
    reportIf(
      line,
      /catch\s*(?:\([^)]*\))?\s*\{\s*\}/,
      "FAIL",
      "Empty catch swallows failure evidence."
    );
    reportIf(
      line,
      /catch\s*(?:\([^)]*\))?\s*\{\s*(?:\/\/.*)?\s*(?:return;?|continue;?)\s*\}/,
      "FAIL",
      "Catch branch appears to swallow failure evidence."
    );
    if (/\bpage\.(?:getBy|locator\s*\()/.test(line)) {
      findings.push({
        level: "FAIL",
        file: relativePath,
        line: lineNumber,
        message: "Raw page selector in spec; move it to a Page Object.",
      });
    }
    function reportIf(source, pattern, level, message) {
      if (pattern.test(source)) {
        findings.push({ level, file: relativePath, line: lineNumber, message });
      }
    }
  });
  if (assertionCount === 0) {
    findings.push({
      level: "FAIL",
      file: relativePath,
      line: 1,
      message: "Spec has no meaningful expect() assertion.",
    });
  }
}
