import { useEffect } from 'react'
import { nativeScrollbar, loadScript } from '@raiz/browser'
import { Overlay, OverlayMain, scrollHistory } from '@raiz/nuggins'
import { onloadComplete, importModule } from '@raiz/nuggins'
// @SALE import { SaleMain } from '@sale'

import { HeaderMobile, burgerClose } from './header-mobile'
import { Sidebar } from './sidebar'
import '/scss/global/index.global.scss'
import * as style from './styles.scss'

const Layout = ({ children, context }) => {
  const { route, request } = context
  const filters = { ...route.params }
  const args = { route, filters }
  // const notSale = ['contact', 'item', 'reproduction'].includes(route.id)

  useEffect(() => {
    burgerClose()
    scrollHistory.setScrollPosition() // not using PageSwitch so call manually
  }, [request])

  return (
    <>
      <HeaderMobile {...args} />
      <Sidebar />
      <OverlayMain className={style.main}>
        {/* {notSale ? null : <SaleMain></SaleMain>} */}
        {children}
      </OverlayMain>
      <Overlay className={style.overlay} hasTrans={false}></Overlay>
    </>
  )
}

export default Layout

onloadComplete(() => {
  nativeScrollbar()
  const host = window.location.origin
  importModule('/modules/raiz.smoothscroll.1.2.1.min.esm.js').then(
    ({ smoothScroll } = {}) => {
      if (smoothScroll) {
        smoothScroll()
      }
    },
  )
  if (host.includes('bedsteads')) {
    loadScript({
      src: 'https://www.googletagmanager.com/gtag/js?id=G-B3Y30SRPVH',
    })
  }
})
