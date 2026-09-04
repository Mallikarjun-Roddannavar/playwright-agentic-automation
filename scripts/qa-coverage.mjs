import fs from "fs";
import path from "path";

const projectRoot = path.resolve(process.cwd());
const reqDir = path.join(projectRoot, "knowledge", "01-product", "requirements");
const automatedDir = path.join(projectRoot, "knowledge", "03-automated", "generated-proposals");

// Fallback if generated-proposals is empty or missing, check archive or main folder
const testInventoryFile = path.join(projectRoot, "knowledge", "test-inventory.json");

console.log("📊 QA Coverage Analysis\n");

if (!fs.existsSync(reqDir)) {
  console.error(`Requirement directory not found: ${reqDir}`);
  process.exit(1);
}

const requirements = fs.readdirSync(reqDir).filter((f) => f.endsWith(".md") && f !== "index.md");
let testInventory = { tests: [] };

if (fs.existsSync(testInventoryFile)) {
  try {
    testInventory = JSON.parse(fs.readFileSync(testInventoryFile, "utf8"));
  } catch (e) {
    console.error("Failed to parse test-inventory.json");
  }
}

// Map to store coverage levels
const coverage = {};
const missingScenarios = [];

requirements.forEach((reqFile) => {
  const reqName = reqFile.replace(".md", "");
  let testCount = 0;

  // Check if there's a corresponding automated proposal
  // Realistically, we'd parse the markdown files to see links,
  // but for the MVP we do a simple heuristic check based on names.
  const proposalName = `REQ-${reqName.toUpperCase()}-001.md`;
  const proposalPath = path.join(automatedDir, proposalName);

  if (fs.existsSync(proposalPath)) {
    const content = fs.readFileSync(proposalPath, "utf8");
    // Count scenarios mentioned in the automated knowledge
    const matches = content.match(/- \*\*.*?\*\*/g);
    if (matches) {
      testCount += matches.length;
    } else {
      testCount += 1;
    }
  }

  // Also cross-reference test inventory for mentions of the feature
  testInventory.tests.forEach((test) => {
    if (test.specFile && test.specFile.toLowerCase().includes(reqName.toLowerCase())) {
      testCount++;
    }
  });

  let level = "LOW";
  if (testCount >= 4) {
    level = "HIGH";
  } else if (testCount >= 2) {
    level = "MEDIUM";
  }

  // Capitalize first letter for display
  const displayName = reqName.charAt(0).toUpperCase() + reqName.slice(1);
  coverage[displayName] = level;

  if (level === "LOW") {
    missingScenarios.push(`- ${displayName} scenarios (needs more coverage)`);
  }
});

// Format the output
const maxLen = Math.max(...Object.keys(coverage).map((k) => k.length));

Object.keys(coverage).forEach((feature) => {
  const padding = " ".repeat(maxLen - feature.length + 4);
  console.log(`${feature}${padding}${coverage[feature]}`);
});

console.log("\nCritical missing scenarios:");
if (missingScenarios.length > 0) {
  missingScenarios.forEach((scenario) => console.log(scenario));
} else {
  console.log("- None! Excellent coverage.");
}
