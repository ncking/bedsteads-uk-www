import { Suspense } from 'react'
import { cx } from '@raiz/browser'
import { useDelay } from '@raiz/react'
import ButtonNav from './button-nav'
import { SpeedDial } from './speed-dial'
import ThumbNav from './thumb-nav'
import * as styles from './style.scss'

/**
 * So the desgin is it slides up & out
 * after the item view ... so it cant be part of the item view
 *
 */
export const ItemNav = ({ item = {}, filterCategory }) => {
  const complete = useDelay(500)
  const { id } = item
  if (!id) {
    return null
  }

  return (
    <>
      <div
        className={cx(
          styles.itNav,
          complete && item && styles.itemNavOn,
        )}
      >
        <nav className={styles.nav}>
          <Suspense>
            <ThumbNav {...item} key={id} />
          </Suspense>

          {/**  we need the id to reset teh state on theTHumb Nav & the ID */}
          <ButtonNav filterCategory={filterCategory} id={id} />
        </nav>
      </div>
      <SpeedDial item={item} />
    </>
  )
}
