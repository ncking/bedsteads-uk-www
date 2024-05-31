import { baseChecks, checkRichSnippets, checkConsole } from '@raiz/cypress'

const url = "/antique"
context('stock grid page', () => {
  baseChecks(url)
  checkRichSnippets(url, 'LocalBusiness')
  checkConsole(url)
})
