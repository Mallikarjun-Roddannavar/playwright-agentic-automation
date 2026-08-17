import fs from "node:fs";
import path from "node:path";

const rootArgument = process.argv.find((argument) => argument.startsWith("--root="));
const root = rootArgument ? path.resolve(rootArgument.slice("--root=".length)) : process.cwd();
const failures = [];
const file = (relativePath) => path.join(root, relativePath);
const source = (relativePath) => (fs.existsSync(file(relativePath)) ? fs.readFileSync(file(relativePath), "utf8") : "");
const requireFile = (relativePath) => {
  if (!fs.existsSync(file(relativePath))) failures.push(`missing referenced file: ${relativePath}`);
};

const loginPage = source("ui/pages/LoginPage.ts");
const homePage = source("ui/pages/HomePage.ts");
const loginSpec = source("ui/specs/login.spec.ts");
const frontendLogin = source("app/frontend/src/pages/LoginPage.tsx");
const backend = source("app/backend/main.py");

for (const relativePath of [
  "knowledge/product/features/login.md",
  "knowledge/product/expected-behavior/login-success.md",
  "ui/specs/login.spec.ts",
  "ui/pages/LoginPage.ts",
  "ui/pages/HomePage.ts",
]) requireFile(relativePath);

if (!/test\("admin login succeeds"/u.test(loginSpec)) failures.push("referenced Playwright test is missing");
if (!/class LoginPage/u.test(loginPage)) failures.push("LoginPage class evidence is missing");
if (!/class HomePage/u.test(homePage)) failures.push("HomePage class evidence is missing");
if (!/login\([^)]*\): Promise<HomePage>/u.test(loginPage) || !/new HomePage/u.test(loginPage)) failures.push("LoginPage -> HomePage evidence is missing");
if (!/expect\(homePage\.title\)\.toBeVisible\(\)/u.test(loginSpec)) failures.push("successful-login assertion evidence is missing");
if (!/api\.login\(username, password\)/u.test(frontendLogin) || !/navigate\("\/"\)/u.test(frontendLogin)) failures.push("frontend login behavior evidence is missing");
if (!/@app\.post\("\/auth\/login"/u.test(backend)) failures.push("backend login route evidence is missing");

if (failures.length) {
  globalThis.console.error("Login knowledge status: STALE or CONFLICTED");
  failures.forEach((failure) => globalThis.console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  globalThis.console.log("Login knowledge status: VERIFIED");
  globalThis.console.log("Independent source and test-evidence checks passed.");
}
