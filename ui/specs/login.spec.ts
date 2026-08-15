import { expect, test } from "@playwright/test";
import config from "@config/test-config.json";

import { LoginPage } from "@pages/LoginPage";

const roleCredentials = {
  admin: {
    username: config.USERS.ADMIN.USER_NAME,
    password: config.USERS.ADMIN.PASSWORD,
  },
};

test.describe("Login", () => {
  test("admin login succeeds", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    const homePage = await loginPage.login(
      roleCredentials.admin.username,
      roleCredentials.admin.password
    );
    await expect(homePage.title).toBeVisible();
  });

  test("invalid credentials show error", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginExpectingFailure("bad-user", "bad-password");
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test("expired stored session redirects to login", async ({ page }) => {
    await page.addInitScript(() => {
      const encoded = (value: object) =>
        btoa(JSON.stringify(value)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
      const token = `${encoded({ alg: "none", typ: "JWT" })}.${encoded({
        sub: "admin",
        role: "admin",
        exp: 1,
        iat: 1,
        auth_source: "password",
      })}.expired`;
      localStorage.setItem(
        "playwright_practice_auth_user",
        JSON.stringify({ username: "admin", role: "admin", accessToken: token })
      );
    });

    const loginPage = new LoginPage(page);
    await loginPage.gotoProtectedHome();
    await expect(loginPage.loginForm).toBeVisible();
  });
});
