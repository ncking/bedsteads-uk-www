import { baseChecks, checkRichSnippets, checkConsole, check404 } from '@raiz/cypress'

const url = "/"
context('home page', () => {
  baseChecks(url)
  checkRichSnippets(url, 'LocalBusiness')
  checkConsole(url)
})
