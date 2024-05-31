import { useEffect, useRef } from 'react'
import { PanelStack, ItemNav } from '@components'
import { setCurrentItem, addItemToStore, getResultSet } from '@lib'
import Grid from './grid'
import Item from './item'

let lastItemMetrics

const StockLayout = (props) => {
  const { filters, item: ajaxRequestedItem } = props
  const { id, category, size } = filters
  const gridRef = useRef<HTMLDivElement>(null!)

  /*
     * Item
     *
     *  1. sold/deleted & DOM request ... will be in props from the start as imbedded in page
     *  2. Ajax request, props.item will initall be nill ... as its ajaxa must be in tile list ... so just read the basics
     *     ... then on ajax complete ajaxRequestedItem will be pupulated & re-rendered with full data
     */

  if (ajaxRequestedItem) {
    addItemToStore(ajaxRequestedItem) // we do this so that once loaded its not constantly flashing from empty
  }
  const item = setCurrentItem(id)

  useEffect(() => {
    const metrics = getResultSet()
    /**
         * So if w have last item filters & they match the gid filters get the position ...
         * The edge cases non really ... in mobile the nav option just isnt there (no menu on item page)
         * In desktop it means go to grid, will alawys put you in the scroll pos , 1st time ... which is what we want (kind of)
         */
    if (lastItemMetrics && !id && metrics.key === lastItemMetrics.key) {
      const { gridIdx = 0 } = lastItemMetrics
      const el = gridRef.current.children[gridIdx]
      el
      && setTimeout(() => {
        // take the position here >> after render
        const { top } = el.getBoundingClientRect()
        const ypos = Math.max(0, top - 100)
        window.scrollTo(0, ypos)
      }, 0)
    }
    lastItemMetrics = { ...metrics, ypos: window.scrollY }
  }, [id])

  return (
    <>
      <PanelStack active={id}>
        <Grid {...{ category, size }} ref={gridRef} />
        <Item item={item} />
      </PanelStack>
      <ItemNav item={id && item} filterCategory={category || size} />
    </>
  )
}

export default StockLayout
