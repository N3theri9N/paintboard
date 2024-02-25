import { test, expect } from "@playwright/test";
test("초기화", async ({ page }) => {
  await page.goto("localhost:3000");

  await page.getByTestId("draw-square").click();

  async function drawSquare(offsetX: number, offsetY: number, length: number) {
    await page.mouse.move(offsetX, offsetY);
    await page.mouse.down();
    await page.mouse.move(offsetX + length, offsetY + length);
    await page.mouse.up();
  }

  await drawSquare(100, 100, 100);
  await drawSquare(100, 300, 100);

  const drawnSquare1 = await page.$$(".square");

  await expect(drawnSquare1.length).toBe(2);

  await page.locator("div").getByText("초기화").click();
  const drawnSquare2 = await page.$$(".square");

  await expect(drawnSquare2.length).toBe(0);
});
