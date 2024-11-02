import { useEffect } from 'react'
import { stockStore } from '@store'
import { ItemLayout } from './item-layout'
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
  const { id } = filters
  // if (item) stockStore.add(ajaxRequestedItem) // we do this so that once loaded its not constantly flashing from empty
  const { item: itemMin } = stockStore.init(filters)
  console.log('props should have pending', props)
  useEffect(() => {
    stockStore.updateState()
  }, [id])

  const { isDesktop } = useWindowSize()
  const isSwiper = !isDesktop && TOUCH_DEVICE

  let itemLayout

  if (process.env.SSR || isDesktop){
    itemLayout = <ItemPage key="product" activePanel={true} item={item} />
  } else {
    const items = stockStore.getSwipSet()
    itemLayout = <SwipeStack
      key="swipestack"
      items={items}
      styles={styles}
      Panel={ItemPage}
      onChange={onChange}
    />
  }


  return (
    <>
      {itemLayout}
      <ItemNav item={item || itemMin} />
    </>
  )
}

export default StockPage
