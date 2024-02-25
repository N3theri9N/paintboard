import { test, expect, Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("localhost:3000");
});

async function dragOne(page: Page) {
  await page.mouse.move(100, 100);
  await page.mouse.down();
  await page.mouse.move(200, 200);
  await page.mouse.up();
}

async function refresh(page: Page) {
  await page.reload();
}

test("사각형 그리기", async ({ page }) => {
  await page.getByTestId("draw-square").click();

  dragOne(page);

  const square = page.locator(".square").first();
  await expect(square).toBeVisible();
  await expect(square).toHaveCSS("width", "100px");
  await expect(square).toHaveCSS("height", "100px");
  await expect(square).toHaveCSS("border-radius", "0%");

  refresh(page);

  const squareReload = page.locator(".square").first();
  await expect(squareReload).toBeVisible();
});

test("원 그리기", async ({ page }) => {
  await page.getByTestId("draw-circle").click();

  dragOne(page);

  const circle = page.locator(".circle").first();
  await expect(circle).toBeVisible();
  await expect(circle).toHaveCSS("width", "100px");
  await expect(circle).toHaveCSS("height", "100px");
  await expect(circle).toHaveCSS("border-radius", "9999%");

  refresh(page);

  const circleReload = page.locator(".circle").first();
  await expect(circleReload).toBeVisible();
});
