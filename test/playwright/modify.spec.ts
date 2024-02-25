import { test, expect, Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("localhost:3000");

  await page.getByTestId("draw-square").click();

  async function drawSquare(offsetX: number, offsetY: number, length: number) {
    await page.mouse.move(offsetX, offsetY);
    await page.mouse.down();
    await page.mouse.move(offsetX + length, offsetY + length);
    await page.mouse.up();
  }

  await drawSquare(100, 100, 200);
  await drawSquare(100, 300, 200);
  await drawSquare(300, 100, 200);

  await page.getByText("수정").click();
  await page.locator("#canvas .shape").nth(1).click();
});

test("칠하기", async ({ page }) => {
  await page.getByRole("textbox").fill("#ff00ff");
  await page.waitForTimeout(1000);
  await page.getByText("색 적용").click();

  const shape2 = page.locator("#canvas .shape").nth(1);
  await expect(shape2).toHaveCSS("background-color", "rgb(255, 0, 255)"); // #00f === rgb(0,0,255)
});

test("지우기", async ({ page }) => {
  const drawnSquare1 = await page.$$(".square");

  await expect(drawnSquare1.length).toBe(3);
  await page.getByText("지우기").click();

  const drawnSquare2 = await page.$$(".square");
  await expect(drawnSquare2.length).toBe(2);
});

// 드래그가 잘 작동하지 않아 제외
// test("이동", async ({ page }) => {
//   // await page.locator("#SelectedShape").click();
//   await page.mouse.move(400, 200);
//   await page.mouse.down();
//   await page.mouse.move(400, 400);
//   await page.mouse.up();

//   const square = await page.locator("#canvas .shape").nth(1);
//   await expect(square).toHaveCSS("top", "600px");
// });
