import { forwardRef } from 'react'
import { cx } from '@raiz/browser'
import { Tile } from '@components'
import type { Stock } from '@types'
import * as styles from './grid.scss'

interface Props {
  category: string
  size: number
  stock: Stock[]
}

const Grid = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { category, size, stock } = props
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
      ref={ref}
      className={cx(
        styles.grid,
        category === 'furniture' ? styles.gridFurniture : '',
      )}
    >
      {tiles}
    </div>
  )
})

export default Grid
