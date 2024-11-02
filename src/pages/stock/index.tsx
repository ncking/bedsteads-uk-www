import { useEffect } from 'react'
import { stockStore } from '@store'
import { ItemLayout } from './item-layout'
import { ItemNav } from './item-nav'

const StockPage = (props) => {
  const { item, params: filters } = props
  const { id } = filters
  // if (item) stockStore.add(ajaxRequestedItem) // we do this so that once loaded its not constantly flashing from empty
  const { item: itemMin } = stockStore.init(filters)

  useEffect(() => {
    stockStore.updateState()
  }, [id])


  return (
    <>
      <ItemLayout item={item || itemMin} />
      <ItemNav item={item || itemMin} />
    </>
  )
}

export default StockPage
