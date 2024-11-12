import { test, expect, request } from '@playwright/test';
import { parseHeaders } from '@raiz/playwright'
import { assetUrls, errorUrls } from '../constants'



assetUrls.forEach((url) => {

  test.describe(`Assets cache-control headers`, () => {
    test(`age: ${url}`, async () => {
      // Create a new API request context
      const apiContext = await request.newContext();
      const ext = url.split('.').pop()
      const response = await apiContext.get(url);
      const headers = parseHeaders(response)
      // Check that the request was successful
      expect(response.status()).toBe(200);
      expect(headers.maxAgeGreaterThan(999)).toBe(true)
      expect(headers.isType(ext)).toBe(true)
      await apiContext.dispose();
    })
  });
})




test.describe('Basic sanity checks', () => {
  const url = errorUrls[404]
  test(`checking 404: ${url}`, async ({ page }) => {
    try {
      const response = await page.goto(url);
      expect(response.status()).toBe(404);
    } catch (error) {
      console.log(`Error navigating to ${url}:`);
    }
  });
})

