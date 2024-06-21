import { useRef, useEffect } from 'react'
import { PanelStack } from '@components'
import { stockStore } from '@store'
import Grid from './grid'
import { ItemLayout } from './item-layout'
import { ItemNav } from './item-nav'

const StockPage = (props) => {
  const { item: ajaxRequestedItem, filters } = props
  const gridRef = useRef<HTMLDivElement>(null!)
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

export default StockPage
