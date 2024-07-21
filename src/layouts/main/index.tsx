import { useEffect } from 'react'
import { Overlay, OverlayMain, PageSwitch } from '@raiz/nuggins'
import type { Context } from '@raiz/nuggins'
import { HeaderMobile } from './header-mobile'
import { burgerClose } from './header-mobile'
import { Sidebar } from './sidebar'
import * as style from './styles.scss'

export const Layout = (props: Context) => {
  const { route, response, request, component: Page, ...context } = props
  const filters = { ...route.meta, ...route.params }
  const args = { ...response?.getPageData(), route, context, params: route.params, filters } // reshape the args ... need to lift this up above to @raiz/client

  useEffect(() => {
    burgerClose()
  }, [request])

  return (
    <>
      <HeaderMobile {...args} />
      <Sidebar />
      <OverlayMain className={style.main} error={response.status !== 200}>
        <PageSwitch animations={null}>
          <Page {...args} />
        </PageSwitch>
      </OverlayMain>
      <Overlay className={style.overlay} hasTrans={false}></Overlay>
    </>
  )
}

// const easing = 'cubic-bezier(0.55, 0.055, 0.675, 0.19)'
// const animationIn = [
//     [{ opacity: 0 }, { opacity: 1 }],
//     { duration: 300, fill: 'forwards', easing },
// ]
// const animationOut = [
//     [{ opacity: 1 }, { opacity: 0 }],
//     { duration: 300, fill: 'forwards', easing },
// ]
// const animations = [// https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats
//     animationIn,
//     animationOut,
// ]
