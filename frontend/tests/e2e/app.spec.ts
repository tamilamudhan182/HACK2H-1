import { test, expect } from "@playwright/test";

test("homepage renders election experience", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: /premium civic assistant/i
    })
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { name: /move through the election process/i })
  ).toBeVisible();
});

