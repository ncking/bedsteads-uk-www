import { useEffect } from 'react'
import { Overlay, OverlayMain, PageSwitch } from '@raiz/nuggins'
import type { LayoutProps } from '@raiz/nuggins'
import { HeaderMobile, burgerClose } from './header-mobile'
import { Sidebar } from './sidebar'
import { nativeScrollbar, loadScript } from '@raiz/browser'
import { init, onloadComplete, importModule } from '@raiz/nuggins'
import '/scss/global/index.global.scss'
import * as style from './styles.scss'

const Layout = (props: LayoutProps) => { 
  const {  page:Page, ...rest } = props
  const {route, request, response} = rest.context
  const filters = { ...route.meta, ...route.params }
  const args = { ...rest, route, filters } // reshape the args ... need to lift this up above to @raiz/client

  useEffect(() => {
    burgerClose()
  }, [request])

  return (
    <>
      <HeaderMobile {...args} />
      <Sidebar />
      <OverlayMain className={style.main} error={response.status !== 200}>
        <PageSwitch animations={null}>
          <Page {...args}/>
        </PageSwitch>
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
      smoothScroll && smoothScroll()
    },
  )
  host.includes('bedsteads')
  && loadScript({
    src: 'https://www.googletagmanager.com/gtag/js?id=G-B3Y30SRPVH',
  })
})
