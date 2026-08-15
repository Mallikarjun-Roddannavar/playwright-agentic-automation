import { defineConfig, devices } from "@playwright/test";
import { resolve } from "node:path";
import { BaseApiService } from "@api/services/BaseApiService";
import config from "@config/test-config.json";
import { BasePage } from "@pages/BasePage";
import { timeouts } from "@utils/common/Waits";

const uiBaseUrl = config.BASE_URLS.UI;
const apiBaseUrl = config.BASE_URLS.API;
const uiUrl = new URL(uiBaseUrl);
const apiUrl = new URL(apiBaseUrl);
const startLocalServers = process.env.PLAYWRIGHT_SKIP_WEBSERVER !== "1";

if (startLocalServers && (!uiUrl.port || !apiUrl.port)) {
  throw new Error("Local UI and API base URLs must include explicit ports.");
}

const appRoot = resolve(__dirname, process.env.PLAYWRIGHT_APP_ROOT ?? "app");
const pythonExecutable =
  process.platform === "win32" ? ".venv\\Scripts\\python.exe" : ".venv/bin/python";
const reuseExistingServer = !process.env.CI;

export default defineConfig({
  testDir: ".",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: timeouts.test,
  expect: {
    timeout: timeouts.expect,
  },
  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: "playwright-report" }],
    ["./utils/common/CustomReporter.ts"],
  ],
  use: {
    baseURL: uiBaseUrl,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: timeouts.action,
    navigationTimeout: timeouts.navigation,
  },
  projects: [
    {
      name: "setup",
      testDir: "./ui/setup",
      testMatch: /.*\.setup\.ts/,
      use: {
        baseURL: apiBaseUrl,
      },
    },
    {
      name: "ui",
      testDir: "./ui/specs",
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"],
        baseURL: uiBaseUrl,
      },
    },
    {
      name: "api",
      testDir: "./api/specs",
      dependencies: ["setup"],
      use: {
        baseURL: apiBaseUrl,
      },
    },
  ],
  webServer: startLocalServers
    ? [
        {
          command: `${pythonExecutable} -m uvicorn main:app --host ${apiUrl.hostname} --port ${apiUrl.port}`,
          cwd: resolve(appRoot, "backend"),
          env: {
            CORS_ALLOWED_ORIGINS: uiBaseUrl,
          },
          url: `${apiBaseUrl}${BaseApiService.routes.health}`,
          reuseExistingServer,
          timeout: timeouts.apiServerStartup,
        },
        {
          command: `node ./node_modules/vite/bin/vite.js --host ${uiUrl.hostname} --strictPort --port ${uiUrl.port}`,
          cwd: resolve(appRoot, "frontend"),
          env: {
            VITE_API_BASE_URL: apiBaseUrl,
          },
          url: `${uiBaseUrl}${BasePage.routes.login}`,
          reuseExistingServer,
          timeout: timeouts.uiServerStartup,
        },
      ]
    : undefined,
});
