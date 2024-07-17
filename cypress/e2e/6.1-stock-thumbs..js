import { isInViewport } from '@raiz/cypress'
import { urls } from './_constants'
const url = urls.stock;

context('stock item Thumbs nav', () => {

  /**
   * just check that we can scroll to the last image,
   * If we use anchors/hashis we can find the target easier, but nth child works just fine
   */
  it(`Test thumbs scroll`, { scrollBehavior: false }, () => {
    cy.visit(url).then(() => {
      cy.get('[data-testid="thumbs"]  > :last-child').click();
      cy.wait(500);
      isInViewport('[data-testid="gallery"] > :last-child') //https://github.com/cypress-io/cypress/issues/877
    })
  })
})