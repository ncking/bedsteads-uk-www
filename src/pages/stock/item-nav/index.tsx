import { cx } from '@raiz/browser'
import { useDelay } from '@raiz/react'
import { ButtonNav } from './button-nav'
import { SpeedDial } from './speed-dial'
import { ThumbNav } from './thumb-nav'
import * as styles from './style.scss'

/**
 * So the desgin is it slides up & out
 * after the item view ... so it cant be part of the item view
 *
 */
export const ItemNav = ({ item }) => {
  const complete = useDelay(500)

  return (
    <>
      <div
        className={cx(
          styles.itNav,
          complete && styles.itemNavOn,
        )}
      >
        <nav className={styles.nav}>
          <ThumbNav {...item} key={item.id} />
          <ButtonNav />
        </nav>
      </div>
      <SpeedDial id={item.id} />
    </>
  )
}
