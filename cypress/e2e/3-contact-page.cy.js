import { baseChecks, checkRichSnippets, checkConsole, shouldntRedirect } from '@raiz/cypress'


const url = "/contact"
context('contact page', () => {
  baseChecks(url)
  checkRichSnippets(url, 'LocalBusiness')
  checkConsole(url)
  shouldntRedirect(url + '/')
})
