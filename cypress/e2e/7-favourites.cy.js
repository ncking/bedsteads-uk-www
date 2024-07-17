import { baseChecks, checkInlinedSVG, checkHTML } from '@raiz/cypress'
import { urls } from './_constants'
const url = urls.favourites

context('favourites page', () => {
  baseChecks(url)
  checkInlinedSVG(url, 'favouriteOn')
  checkInlinedSVG(url, 'favouriteOff')
  checkHTML(url)
})