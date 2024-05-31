import { baseChecks, checkRichSnippets, checkConsole, check404 } from '@raiz/cypress'

const url = "/mattresses"
context('mattress page', () => {
  baseChecks(url)
  checkRichSnippets(url, 'LocalBusiness')
  checkConsole(url)
})
