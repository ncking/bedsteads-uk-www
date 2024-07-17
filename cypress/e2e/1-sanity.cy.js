import { check404, checkInternalLinks, checkInlinedSVG, checkEmailLinks } from '@raiz/cypress'
import * as config from "../../src/config/client"
import { urls } from './_constants'

Cypress.on('uncaught:exception', (err, runnable, promise) => {
  // returning false here prevents Cypress from
  // failing the test
  console.log('Cypress detected uncaught exception: ', err, runnable, promise);
  return false;
});


context('basic sanity checks', () => {
  check404('/dfdsfdsfsd/sd/f/dsf/s/f/sd')
  checkInlinedSVG(urls.home, 'facebook', 'instagram')
  checkInternalLinks(urls.home)
  checkEmailLinks(urls.home, { email: config.email })
})
