import { test, expect } from '@playwright/test';
import { urls } from '../constants'
import { BasePage } from '@raiz/playwright'
import * as config from "../../src/config/client"

/**
 * Base checks on all pages
 */
const pageUrls = Object.values(urls);
//const pageUrls = ['/']

pageUrls.map((url) => {

  test.describe(`Base checks; ${url}`, () => {

    let p;
    let response


    test.beforeEach(async ({ page }) => {
      p = new BasePage(page);
      response = await page.goto(url);
    });

    test(`should return 200, ${url}`, async () => {
      expect(response.status()).toBe(200);
    });

    test(`No "undefined", ${url}`, async () => {
      const hasUndefined = await p.contentHasString('undefined')
      expect(hasUndefined).toBe(false);
    });

    test(`should have a valid title on ${url}`, async () => {
      const title = await p.getTitle();
      expect(title.length > 20).toBe(true)
    });

    test(`should have description ${url}`, async () => {
      const desc = await p.getDescription()
      expect(desc?.length > 20).toBe(true)
    });


    test(`should have auth ${url}`, async () => {
      const auth = await p.getAuthor()
      expect('Raiz, Bristol UK' === auth).toBe(true)
    });


    test(`check Facebook OpenGraph`, async () => {
      const og = await p.getOpenGraph()
      expect(og?.title?.content.length > 20).toBe(true)
      expect(og?.description?.content.length > 20).toBe(true)
    });


    test(`check RichSnippets`, async () => {
      const snippet = await p.richSnippetsByType('LocalBusiness')
      expect(snippet).not.toBeNull();
    });


    test(`checking email links`, async () => {
      const errors = await p.validateEmailLinks(config.email)
      expect(errors.length).toBe(0);
    });


    test(`validate HTMl`, async () => { // vaildates the RAW HTML, before the Browser has modified: boolean attributes, closing tags ...
      const errors = await p.validateRawHTML()
      //expect(errors.length).toBe(0);
    });

  });
})