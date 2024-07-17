import { baseChecks, checkRichSnippets, checkConsole, checkHTML } from '@raiz/cypress'
import { urls } from './_constants'

const url = urls.home

context('home page', () => {
  baseChecks(url)
  checkRichSnippets(url, 'LocalBusiness')
  checkConsole(url)
  checkHTML(url)
})
