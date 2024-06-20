import { useEffect } from 'react'
import { Overlay, OverlayMain } from '@raiz/nuggins'
import { HeaderMobile } from './header-mobile'
import { burgerClose } from './header-mobile'
import { Sidebar } from './sidebar'
import * as style from './styles.scss'

export const Layout = (props) => {
  const { route, response, request, component: Page, ...context } = props
  const { params, id, meta = {} } = route
  const itemPage = id === 'item' // @todo replace with <Helmet/> style
  const gridPage = meta?.category
  const args = { ...response?.getPageData(), route, context, params, gridPage, itemPage } // reshape the args ... need to lift this up above to @raiz/client

  useEffect(() => {
    burgerClose()
    scrollTo({ top: 0 })
  }, [request])

  console.log(args)
  return (
    <>
      <HeaderMobile {...args} />
      <Sidebar />
      <OverlayMain className={style.main} error={response.status !== 200}>
        <Page {...args} />
      </OverlayMain>
      <Overlay className={style.overlay} hasTrans={false}></Overlay>
    </>
  )
}
