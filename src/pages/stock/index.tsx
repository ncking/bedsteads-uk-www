import { useRef, useEffect } from 'react'
import { stockStore } from '@store'
import Grid from './grid'
import { ItemLayout } from './item-layout'
import { ItemNav } from './item-nav'

const StockPage = (props) => {
  const { item: ajaxRequestedItem, filters } = props
  const gridRef = useRef<HTMLDivElement>(null!)
  const { id } = filters
  if (ajaxRequestedItem) stockStore.add(ajaxRequestedItem) // we do this so that once loaded its not constantly flashing from empty
  const { stock, item } = stockStore.init(filters)

  useEffect(() => {
    stockStore.updateState()
  }, [id])

  if (!id) {
    return <Grid {...filters} stock={stock} ref={gridRef} />
  }

  return (
    <>
      <ItemLayout item={item} />
      <ItemNav item={item} />
    </>
  )
}

export default StockPage
