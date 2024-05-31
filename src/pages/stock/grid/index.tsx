import { forwardRef } from 'react'
import { cx } from '@raiz/browser'
import { Tile } from '@components'
import { getFilteredStock } from '@lib'
import * as styles from './grid.scss'

interface Props {
  category: string
  size: number
}

const Grid = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { category: filterCategory, size: filterSize } = props
  /**
     * STOCK always there !!!
     * Please dont overthink this .... this is ***CORRECT
     */
  const baseDir = filterSize || filterCategory

  const tiles = getFilteredStock().map((item) => {
    const { id, slug } = item
    return (
      <Tile
        key={`${filterCategory}:${id}:${filterSize}`}
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
        filterCategory === 'furniture' ? styles.gridFurniture : '',
      )}
    >
      {tiles}
    </div>
  )
})

export default Grid
