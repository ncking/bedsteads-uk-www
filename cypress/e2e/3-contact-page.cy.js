import { baseChecks, checkRichSnippets, checkConsole, shouldntRedirect, checkHTML } from '@raiz/cypress'
import { urls } from './_constants'
const url = urls.contact


context('contact page', () => {
  baseChecks(url)
  checkRichSnippets(url, 'LocalBusiness')
  checkConsole(url)
  shouldntRedirect(url + '/')
  checkHTML(url)
})
