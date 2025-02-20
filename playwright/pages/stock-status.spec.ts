import { test, expect, request } from '@playwright/test';
import { soldUrls } from '../constants'
import { BasePage } from '@raiz/playwright'


soldUrls.forEach((url) => {
  test.describe(`Display "SOLD" tab`, () => {
    test(`page: ${url}`, async ({ page }) => {
      await page.goto(url);
      await expect(page.getByTestId("status")).toHaveText("sold");
    })
  });
})





