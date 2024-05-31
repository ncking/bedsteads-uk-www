import { checkMeta, checkFacebook } from '@raiz/cypress'
import { urls } from './_constants'



Cypress.on('uncaught:exception', (err, runnable, promise) => {
  // returning false here prevents Cypress from
  // failing the test
  console.log('Cypress detected uncaught exception: ', err, runnable, promise);
  return false;
});


context('META checks', () => {
  urls.map(url => {
    checkMeta(url)
    checkFacebook(url)
  })
})