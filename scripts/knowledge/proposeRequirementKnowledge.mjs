import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const args = new Map(process.argv.slice(2).map((arg) => {
  const [key, value] = arg.split("=", 2);
  return [key.replace(/^--/, ""), value ?? true];
}));
const stage = args.get("stage");
if (!['manual', 'automated'].includes(stage)) {
  console.error("Usage: node ./scripts/knowledge/proposeRequirementKnowledge.mjs --stage=manual|automated [--requirement=REQ-ID]");
  process.exit(1);
}

const productRoot = path.join(root, "knowledge", "01-product", "requirements");
const outputRoot = path.join(root, "knowledge", "drafts", stage);
const requirementFilter = args.get("requirement");
const files = fs.readdirSync(productRoot).filter((file) => file.endsWith(".md") && file !== "index.md");
const specs = [...walk(path.join(root, "ui", "specs")), ...walk(path.join(root, "api", "specs"))]
  .filter((file) => file.endsWith(".spec.ts"));

fs.mkdirSync(outputRoot, { recursive: true });
for (const filename of files) {
  const product = fs.readFileSync(path.join(productRoot, filename), "utf8");
  const id = product.match(/^id:\s*(\S+)/mu)?.[1];
  if (!id || (requirementFilter && id !== requirementFilter)) continue;
  const slug = id.replace(/^REQ-/, "").replace(/-\d+$/, "").toLowerCase();
  const relatedSpecs = specs.filter((file) => {
    const name = path.basename(file).toLowerCase();
    return slug.split("-").some((term) => name.includes(term)) ||
      (id === "REQ-RBAC-001" && /rbac|multi-role|viewer-rbac/.test(name));
  });
  const relativeProduct = `../../01-product/requirements/${filename}`;
  const sourceLines = relatedSpecs.length
    ? relatedSpecs.map((file) => `  - resource: /${path.relative(root, file).replaceAll("\\", "/")}`).join("\n")
    : "  - resource: /knowledge/01-product/requirements/" + filename;
  const content = stage === "manual"
    ? manualDocument({ id, relativeProduct, sourceLines, product })
    : automatedDocument({ id, relativeProduct, sourceLines, relatedSpecs, product });
  fs.writeFileSync(path.join(outputRoot, `${id}.md`), content, "utf8");
  console.log(`${stage} proposal created: knowledge/drafts/${stage}/${id}.md`);
}

function manualDocument({ id, relativeProduct, sourceLines, product }) {
  return `---
type: Manual Test Scenario Proposal
id: draft-manual-${id}
title: Manual verification for ${id}
status: draft
trust_status: grounded
review_status: pending
requirement: ${relativeProduct}
sources:
${sourceLines}
---

# Manual verification for ${id}

This proposal translates the approved product requirement into human-verifiable
scenarios. Review the business meaning, preconditions, and expected outcomes
before promotion.

## Requirement basis

${product.split("## Raw requirement")[0].trim()}

## Scenarios to review

1. Verify each approved acceptance criterion under its applicable user role or
   service state.
2. Verify the expected successful outcome and visible/API result.
3. Verify the relevant rejection, missing-resource, or persistence behavior.
4. Confirm that unrelated product data is unchanged.

## Review points

- Confirm exact roles, error wording, response status, and persistence rules.
- Add feature-specific steps before promotion; this proposal is intentionally
  grounded but not semantically verified.
`;
}

function automatedDocument({ id, relativeProduct, sourceLines, relatedSpecs, product }) {
  const coverage = relatedSpecs.length
    ? relatedSpecs.map((file) => `- Candidate evidence: \`${path.relative(root, file).replaceAll("\\", "/")}\``).join("\n")
    : "- No matching UI/API spec was found by deterministic filename matching.";
  return `---
type: Testing Knowledge Proposal
id: draft-automated-${id}
title: Automated coverage for ${id}
status: draft
trust_status: grounded
feature_status: review_required
verification_status: grounded
requirements:
  - ${relativeProduct}
sources:
${sourceLines}
---

# Automated coverage for ${id}

This requirement-focused proposal maps approved product meaning to existing
Playwright evidence. Review semantic coverage before promotion.

## Product basis

${product.split("## Raw requirement")[0].trim()}

## Candidate automation evidence

${coverage}

## Coverage review

- Confirm which acceptance criteria are covered by existing tests.
- Identify missing UI/API scenarios, roles, assertions, and error paths.
- Do not treat source-file existence as proof that a requirement is verified.
`;
}

function* walk(directory) {
  if (!fs.existsSync(directory)) return;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}
