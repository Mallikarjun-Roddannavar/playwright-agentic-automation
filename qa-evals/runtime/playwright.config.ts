import { defineConfig } from "@playwright/test";
import { resolve } from "node:path";
import process from "node:process";

const root = resolve(__dirname, "../..");
const pythonExecutable =
  process.platform === "win32" ? ".venv\\Scripts\\python.exe" : ".venv/bin/python";

export default defineConfig({
  testDir: ".",
  timeout: 30_000,
  outputDir: resolve(root, "qa-results", "runtime", "test-results"),
  reporter: [["list"]],
  use: {
    baseURL: "http://127.0.0.1:5174",
    trace: "on",
    screenshot: "on",
    video: "off",
  },
  webServer: [
    {
      command: `${pythonExecutable} -m uvicorn main:app --host 127.0.0.1 --port 8001`,
      cwd: resolve(root, "app", "backend"),
      url: "http://127.0.0.1:8001/health",
      reuseExistingServer: true,
      timeout: 120_000,
      env: { CORS_ALLOWED_ORIGINS: "http://127.0.0.1:5174" },
    },
    {
      command: "node ./node_modules/vite/bin/vite.js --host 127.0.0.1 --strictPort --port 5174",
      cwd: resolve(root, "app", "frontend"),
      url: "http://127.0.0.1:5174/login",
      reuseExistingServer: true,
      timeout: 120_000,
      env: { VITE_API_BASE_URL: "http://127.0.0.1:8001" },
    },
  ],
});
