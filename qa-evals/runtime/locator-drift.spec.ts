import { expect, test } from "@playwright/test";

test("controlled locator drift preserves supported login behavior", async ({ page }) => {
  await page.goto("http://127.0.0.1:5174/login");

  // Intentional benchmark fault: the app exposes "Sign in", never "Sign in now".
  await expect(page.getByRole("button", { name: "Sign in now" })).toBeVisible();
});
