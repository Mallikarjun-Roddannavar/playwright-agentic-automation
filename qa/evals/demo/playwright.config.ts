import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: ".",
  testMatch: "authorization.spec.ts",
  workers: 1,
  retries: 0,
  timeout: 10_000,
  reporter: "json",
  use: { trace: "off" },
});
