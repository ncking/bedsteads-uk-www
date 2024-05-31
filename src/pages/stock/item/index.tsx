import { useEffect } from 'react'
import { TOUCH_DEVICE } from '@raiz/browser'
import { SwipeStack, useWindowSize } from '@raiz/react'
import { findItems, next, prev, itemAnalyics } from '@lib'
import { ItemPage } from './item-page'
import * as styles from './panels.scss'

const onChange = (dir) => {
  dir === 1
    ? (next(), itemAnalyics('swipe next'))
    : (prev(), itemAnalyics('swipe prev'))
}

/**
 * So its **alkways in the store, either from Document request or
 * from the embeded store
 * The **totals** may not be in the store
 */

let hasLoaded = false
const ItemPageLayout = (props) => {
  const { item } = props
  const { isDesktop } = useWindowSize()

  useEffect(() => {
    // for SSR we need to switch to mobile after load - SSR was getting confused and magling on hydration
    // I guess it was tring to make sense of 2 differnt layouts
    // for inital load boath show the SEO/SSR single product
    hasLoaded = true
  }, [])
  const isSwiper = !isDesktop && TOUCH_DEVICE
  const hasLoadedAndMobile = hasLoaded && isSwiper
  return hasLoadedAndMobile
    ? (
      <SwipeStack
        key="swipestack"
        items={findItems(item)}
        styles={styles}
        Panel={ItemPage}
        onChange={onChange}
      />
      )
    : (
      <ItemPage key="product" item={item} activePanel={true} />
      )
}

export default ItemPageLayout
