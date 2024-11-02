import { useEffect } from 'react'
import { stockStore } from '@store'
import { ItemNav } from './item-nav'


import { TOUCH_DEVICE } from '@raiz/browser'
import { SwipeStack, useWindowSize } from '@raiz/react'
import { next, prev, itemAnalyics } from '@lib'
import { ItemPage } from './item-page'
import * as styles from './panels.scss'

const onChange = (dir) => {
  dir === 1
    ? (next(), itemAnalyics('swipe next'))
    : (prev(), itemAnalyics('swipe prev'))
}


const StockPage = (props) => {
  const { item, params: filters, loading } = props
  stockStore.init(filters)

  // useEffect(() => {
  //   stockStore.updateState()
  // }, [id])

  const { isDesktop } = useWindowSize()

  let itemLayout

  if (process.env.SSR || isDesktop || !TOUCH_DEVICE) {
    itemLayout = <ItemPage key="product" activePanel={true} item={item} />
  } else {
    const items = stockStore.getSwipSet()
    if(item)items[1] = item
    itemLayout = <SwipeStack
      key="swipestack"
      items={items}
      styles={styles}
      Panel={ItemPage}
      onChange={onChange}
      isLoading={loading}
    />
  }


  return (
    <>
      {itemLayout}
      {/* <ItemNav item={item} /> */}
    </>
  )
}

export default StockPage
