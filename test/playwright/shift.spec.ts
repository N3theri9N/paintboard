import { test, expect, Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("localhost:3000");

  async function drawSquare(offsetX: number, offsetY: number, length: number) {
    await page.mouse.move(offsetX, offsetY);
    await page.mouse.down();
    await page.mouse.move(offsetX + length, offsetY + length);
    await page.mouse.up();
  }

  async function fillColor(index: number, color: string) {
    await page.locator("#canvas .shape").nth(index).click();
    await page.getByRole("textbox").fill(color);
    await page.waitForTimeout(1000);
    await page.getByText("색 적용").click();
  }

  await page.getByTestId("draw-square").click();

  await drawSquare(100, 100, 200);
  await drawSquare(250, 250, 200);
  await drawSquare(400, 400, 200);

  await page.getByText("수정").click();

  await fillColor(0, "#ff0000");
  await fillColor(1, "#00ff00");
  await fillColor(2, "#0000ff");

  await page.locator("#canvas").click();
});

const compareSame = async (page: Page, fromIndex: number, toIndex: number) => {
  const squareColor: string[] = ["rgb(255, 0, 0)", "rgb(0, 255, 0)", "rgb(0, 0, 255)"];

  await expect(page.locator("#canvas .shape").nth(toIndex)).toHaveCSS(
    "background-color",
    squareColor[fromIndex]
  );
};

test("맨 앞으로", async ({ page }) => {
  await page.locator("#canvas .shape").nth(0).click();
  await compareSame(page, 0, 0);

  await page.getByText("맨앞으로", { exact: true }).click();

  await compareSame(page, 0, 2);
  await compareSame(page, 2, 1);
  await compareSame(page, 1, 0);
});
test("앞으로", async ({ page }) => {
  await page.locator("#canvas .shape").nth(0).click();
  await compareSame(page, 0, 0);

  await page.getByText("앞으로", { exact: true }).click();

  await compareSame(page, 1, 0);
  await compareSame(page, 0, 1);
});
test("뒤로", async ({ page }) => {
  await page.locator("#canvas .shape").last().click();
  await compareSame(page, 2, 2);

  await page.getByText("뒤로", { exact: true }).click();

  await compareSame(page, 1, 2);
  await compareSame(page, 2, 1);
});
test("맨 뒤로", async ({ page }) => {
  await page.locator("#canvas .shape").last().click();
  await compareSame(page, 2, 2);

  await page.getByText("맨뒤로", { exact: true }).click();

  await compareSame(page, 2, 0);
  await compareSame(page, 1, 2);
  await compareSame(page, 0, 1);
});
