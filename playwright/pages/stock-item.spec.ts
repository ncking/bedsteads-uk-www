import { test, expect, request } from '@playwright/test';
import { urls } from '../constants'
import { BasePage } from '@raiz/playwright'
const url = urls.stock



test.describe(`Stock item page`, () => {

  let p;
  let response


  test.beforeEach(async ({ page }) => {
    p = new BasePage(page);
    response = await page.goto(url);
  });



  test(`check Product RichSnippets`, async () => {
    const snippets = await p.richSnippetsByType('Product')
    expect(snippets.length).toBe(1);
  });

  /**
   * Stock urls can be prefixed by category/size, or have outdated url 
   * If any of the above is ncorrect it should redirect to the canonical url
   */
  test(`check redirect`, async ({ page }) => {
    const wrongUrl = url.replace('_', 'AAAAAAA_')
    // await page.goto(wrongUrl);
    // const finalUrl = page.url();
    const r = await request.newContext();
    const response = await r.get(wrongUrl, { maxRedirects: 0 })
    const locationHeader = response.headers()['location'];
    expect(response.status()).toBe(307);
    expect(locationHeader.endsWith(url)).toBe(true);
  });



  // test(`thumb select`, async () => {
  //   await p.click('[data-testid="thumbs"]  > :last-child');
  //   await p.waitForTimeout(500);
  //   const targetElement = await p.locator('[data-testid="gallery"] > :last-child');
  //   // Check if the element is visible in the viewport
  //   await expect(targetElement).toBeVisible();
  // });


})
