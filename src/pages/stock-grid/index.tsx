import { useRef, forwardRef } from 'react'
import { stockStore } from '@store'
import { cx } from '@raiz/browser'
import { Tile } from '@components'
import * as styles from './grid.scss'


const StockGridPage = (props) => {
  const { params: filters } = props
  const { stock } = stockStore.init(filters)
  const { category, size } = filters
  /**
   * STOCK always there !!!
   * Please dont overthink this .... this is ***CORRECT
   */
  const baseDir = size || category

  const tiles = stock.map((item) => {
    const { id, slug } = item
    return (
      <Tile
        key={`${category}:${id}:${size}`} /** Key is not just ID, otherwise on category change, some tiles remain ... as expected, but looks janky  */
        {...item}
        url={`/${baseDir}/${slug}_${id}`}
        classPortrait={styles.portrait}
      />
    )
  })

  return (
    <div
      className={cx(
        styles.grid,
        category === 'furniture' ? styles.gridFurniture : '',
      )}
    >
      {tiles}
    </div>
  )
}

export default StockGridPage
