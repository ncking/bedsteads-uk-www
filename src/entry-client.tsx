import { nativeScrollbar, loadScript } from '@raiz/browser'
import { init, onloadComplete, importModule } from '@raiz/nuggins'
import { Layout } from './pages/_layout'
import ErrorPage from './pages/error/index'
import '/scss/global/index.global.scss'

nativeScrollbar()
init(Layout, { ErrorPage })

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
