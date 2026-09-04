import fs from "fs";
import path from "path";

const projectRoot = path.resolve(process.cwd());
const uiSpecsDir = path.join(projectRoot, "ui", "specs");
const apiSpecsDir = path.join(projectRoot, "api", "specs");
const uiPagesDir = path.join(projectRoot, "ui", "pages");

let errorsFound = 0;

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach((f) => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function checkFile(filePath, isTestFile) {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  let inTest = false;
  let hasAssertion = false;
  let testName = "";

  lines.forEach((line, index) => {
    const lineNumber = index + 1;

    // 1. Detect page.waitForTimeout
    if (line.includes("page.waitForTimeout(")) {
      console.error(`❌ [Guardrail] Hardcoded timeout found in ${filePath}:${lineNumber}`);
      console.error(`   ${line.trim()}`);
      errorsFound++;
    }

    // 2. Detect swallowed exceptions (empty catch block)
    if (line.match(/catch\s*\([^)]*\)\s*{\s*}/)) {
      console.error(`❌ [Guardrail] Swallowed exception found in ${filePath}:${lineNumber}`);
      console.error(`   ${line.trim()}`);
      errorsFound++;
    }

    // 3. Detect disabled tests added to hide failures (.skip without a reason/issue)
    if (
      line.includes("test.skip(") &&
      !line.includes("https://") &&
      !line.toLowerCase().includes("issue") &&
      !line.toLowerCase().includes("bug")
    ) {
      console.error(
        `❌ [Guardrail] test.skip without bug/issue reference in ${filePath}:${lineNumber}`
      );
      console.error(`   ${line.trim()}`);
      errorsFound++;
    }

    // 4. Detect poor locators (xpath or css that looks brittle)
    if (line.match(/page\.locator\(['"](\/|\/\/(div|span|p|a|li|ul|table|tr|td)|body|html)/)) {
      console.error(
        `❌ [Guardrail] Brittle locator (xpath/CSS) found in ${filePath}:${lineNumber}. Prefer data-testid or role.`
      );
      console.error(`   ${line.trim()}`);
      errorsFound++;
    }

    if (isTestFile) {
      if (line.match(/test\s*\(['"`].*['"`]\s*,\s*(async\s*)?\(\)\s*=>/)) {
        inTest = true;
        hasAssertion = false;
        testName = line.trim();
      }

      if (inTest && line.includes("expect(")) {
        hasAssertion = true;
      }

      if (inTest && line.match(/^\s*}\s*\)\s*;/)) {
        inTest = false;
        if (!hasAssertion) {
          console.error(`❌ [Guardrail] Test without assertion found in ${filePath}.`);
          console.error(`   ${testName}`);
          errorsFound++;
        }
      }
    }
  });
}

console.log("🛡️ Running Agentic QA Guardrails...");

walkDir(uiSpecsDir, (file) => checkFile(file, true));
walkDir(apiSpecsDir, (file) => checkFile(file, true));
walkDir(uiPagesDir, (file) => checkFile(file, false));

if (errorsFound > 0) {
  console.error(`\n❌ Guardrails failed! Found ${errorsFound} issues.`);
  console.error(
    "Agents MUST fix these issues before proceeding. Do not weaken assertions or hide failures."
  );
  process.exit(1);
} else {
  console.log("\n✅ All guardrails passed.");
  process.exit(0);
}
