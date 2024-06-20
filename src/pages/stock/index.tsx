import { useRef, useEffect } from 'react'
import { PanelStack } from '@components'
import { stockStore } from '@store'
import Grid from './grid'
import { ItemLayout } from './item-layout'
import { ItemNav } from './item-nav'

const StockLayout = (props) => {
  const { item: ajaxRequestedItem, route } = props
  const gridRef = useRef<HTMLDivElement>(null!)
  const filters = { ...route.meta, ...route.params }
  const { id } = filters
  if (ajaxRequestedItem) stockStore.add(ajaxRequestedItem) // we do this so that once loaded its not constantly flashing from empty
  const { resultSet, stock, item } = stockStore.initSync(filters)

  useEffect(() => {
    stockStore.updateState()
  }, [id])

  return (
    <>
      <PanelStack active={id}>
        <Grid {...filters} stock={stock} ref={gridRef} />
        {item && <ItemLayout item={item} />}
      </PanelStack>
      {item && <ItemNav item={item} resultSet={resultSet} />}
    </>
  )
}

export default StockLayout

// useEffect(() => {

//   /**
//        * So if w have last item filters & they match the gid filters get the position ...
//        * The edge cases non really ... in mobile the nav option just isnt there (no menu on item page)
//        * In desktop it means go to grid, will alawys put you in the scroll pos , 1st time ... which is what we want (kind of)
//        */
//   if (lastItemMetrics && !id && resultSet.categoryLabel === lastItemMetrics.categoryLabel) {
//     const { gridIdx = 0 } = lastItemMetrics
//     const el = gridRef.current.children[gridIdx]
//     el
//       && setTimeout(() => {
//         // take the position here >> after render
//         const { top } = el.getBoundingClientRect()
//         const ypos = Math.max(0, top - 100)
//         window.scrollTo(0, ypos)
//       }, 0)
//   }
//   lastItemMetrics = { ...resultSet, ypos: window.scrollY }
// }, [id])
