import { baseChecks, checkRichSnippets, checkConsole, shouldRedirect, checkInlinedSVG } from '@raiz/cypress'
import { stockPage as url } from './_constants';

context('stock item page', () => {
  baseChecks(url)
  checkRichSnippets(url, 'Product')
  checkConsole(url)
  shouldRedirect(url.replace('_', 'AAAAAAA_'), url)
  checkInlinedSVG(url, 'arrow')
})

