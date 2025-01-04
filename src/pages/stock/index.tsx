import { useEffect } from 'react'
import { TOUCH_DEVICE } from '@raiz/browser'
import { SwipeStack, useWindowSize } from '@raiz/react'
import { next, prev, itemAnalyics } from '@lib'
import { stockStore } from '@store'
import { ItemNav } from './item-nav'
import { ItemPage } from './item-page'
import * as styles from './panels.scss'

let hasLoaded = false

const onChange = (dir) => {
    if (dir === 1) {
        next()
        itemAnalyics('swipe next')
    } else {
        prev()
        itemAnalyics('swipe prev')
    }
}

const StockPage = (props) => {
    const { item, params, loading } = props
    stockStore.init(params)

    useEffect(() => {
        stockStore.updateState()
    }, [params.id])

    const { isDesktop } = useWindowSize()

    useEffect(() => {
        // for SSR we need to switch to mobile after load - SSR was getting confused and magling on hydration
        // I guess it was tring to make sense of 2 differnt layouts
        // for inital load boath show the SEO/SSR single product
        hasLoaded = true
    }, [])

    const isSwiper = !isDesktop && TOUCH_DEVICE
    const hasLoadedAndMobile = hasLoaded && isSwiper
    let itemLayout

    if (hasLoadedAndMobile) {
        const items = stockStore.getSwipSet()
        if (item) items[1] = item
        itemLayout = (
            <SwipeStack
                key="swipestack"
                items={items}
                styles={styles}
                Panel={ItemPage}
                onChange={onChange}
                isLoading={loading}
            />
        )
    } else {
        itemLayout = <ItemPage key="product" activePanel={true} item={item} />
    }

    return (
        <>
            {itemLayout}
            <ItemNav item={item} />
        </>
    )
}

export default StockPage
