import { baseChecks, checkInlinedSVG } from '@raiz/cypress'

context('favourites page', () => {
  const url = "/favourites"
  baseChecks(url)
  checkInlinedSVG(url, 'favouriteOn')
  checkInlinedSVG(url, 'favouriteOff')
})