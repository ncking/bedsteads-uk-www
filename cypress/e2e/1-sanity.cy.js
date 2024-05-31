import { check404, checkAllLinks, checkInlinedSVG, checkEmailLinks } from '@raiz/cypress'
import * as config from "../../src/config/client"


Cypress.on('uncaught:exception', (err, runnable, promise) => {
  // returning false here prevents Cypress from
  // failing the test
  console.log('Cypress detected uncaught exception: ', err, runnable, promise);
  return false;
});


context('basic sanity checks', () => {
  check404('/dgfgrhfghrigjrjgioduhg/dsfsdf')
  checkInlinedSVG('/', 'facebook', 'instagram')
  checkAllLinks('/')
  checkEmailLinks('/', { email: config.email }) //
})
