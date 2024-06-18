import { useEffect } from 'react'
import { Overlay, OverlayMain } from '@raiz/nuggins'
import { filterStock } from '@lib'
import { HeaderMobile } from './header-mobile'
import { burgerClose } from './header-mobile'
import { Sidebar } from './sidebar'
import * as style from './styles.scss'

export const Layout = (props) => {
  const { route, response, request, component: Page, ...context } = props
  const args = { ...response?.getPageData(), params: route.params, context } // reshape the args ... need to lift this up above to @raiz/client

  useEffect(() => {
    burgerClose()
    scrollTo({ top: 0 })
  }, [request]) // @NK this is perfect nigel ... dont change this
  /**
     * Errors can come from 3 points
     * 1. route not found
     * 2. A thrown error ...
     * 3. A 4xx/5xx from the ajax or document response
     */
  const filters = { ...route.meta, ...route.params }
  filterStock(filters)

  return (
    <>
      <HeaderMobile {...filters} />
      <Sidebar />
      <OverlayMain className={style.main} error={response.status !== 200}>
        <Page {...args} filters={filters} />
      </OverlayMain>
      <Overlay className={style.overlay} hasTrans={false}></Overlay>
    </>
  )
}
