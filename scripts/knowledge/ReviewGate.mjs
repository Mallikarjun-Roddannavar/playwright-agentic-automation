import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

// A recorded review is a prerequisite, not cryptographic proof of human consent.
// Read and validate every candidate before any promotion writes take place.
export function reviewedDrafts(root, stage) {
  const directory = path.join(root, "knowledge", "drafts", stage);
  if (!fs.existsSync(directory)) return [];
  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".md") && file !== "README.md")
    .map((filename) => {
      const file = path.join(directory, filename);
      const content = fs.readFileSync(file, "utf8");
      const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---/u)?.[1];
      const attributes = yaml.load(frontmatter ?? "") ?? {};
      if (attributes.status !== "draft" || attributes.review_status !== "reviewed")
        throw new Error(`${filename}: explicit human review is required before promotion.`);
      for (const key of ["reviewed_by", "reviewed_at", "review_reference"]) {
        if (typeof attributes[key] !== "string" || !attributes[key].trim())
          throw new Error(`${filename}: record ${key} from the actual human review.`);
      }
      if (!Number.isFinite(Date.parse(attributes.reviewed_at)))
        throw new Error(`${filename}: reviewed_at must be a quoted date-time.`);
      const resources =
        stage === "product"
          ? [attributes.source_requirement]
          : (attributes.sources ?? []).map((item) => item.resource);
      if (!resources.length) throw new Error(`${filename}: evidence sources are required.`);
      for (const resource of resources) {
        if (typeof resource !== "string" || !resource.trim())
          throw new Error(`${filename}: invalid evidence source.`);
        const absolute = path.resolve(root, resource.replace(/^\//u, ""));
        const relative = path.relative(root, absolute);
        if (
          relative.startsWith("..") ||
          path.isAbsolute(relative) ||
          !fs.existsSync(absolute) ||
          !fs.statSync(absolute).isFile()
        )
          throw new Error(`${filename}: missing or external evidence ${resource}.`);
        if (
          stage === "product" &&
          !relative.replaceAll(path.sep, "/").startsWith("requirements/incoming/")
        )
          throw new Error(`${filename}: product evidence must come from requirements/incoming/.`);
      }
      if (
        stage === "automated" &&
        (attributes.verification_status !== "grounded" ||
          attributes.feature_status !== "existing_match")
      )
        throw new Error(`${filename}: automated evidence and semantic matching need review.`);
      return filename;
    });
}
