import { nativeScrollbar, loadScript } from '@raiz/browser'
import { init, onloadComplete, importModule } from '@raiz/nuggins'
import { Layout } from './layouts/main'
import '/scss/global/index.global.scss'

nativeScrollbar()
init(Layout)

onloadComplete(() => {
  const host = window.location.origin
  importModule('/modules/raiz.smoothscroll.1.2.1.min.esm.js').then(
    ({ smoothScroll } = {}) => {
      smoothScroll && smoothScroll()
    },
  )
  host.includes('bedsteads')
  && loadScript({
    src: 'https://www.googletagmanager.com/gtag/js?id=G-B3Y30SRPVH',
  })
})
