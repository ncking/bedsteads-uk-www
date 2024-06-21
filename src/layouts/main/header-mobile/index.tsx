import { setUnsetBodyClass, cx } from '@raiz/browser'
import { Link, getPathname } from '@raiz/nuggins'
import { HeaderSticky } from '@raiz/react'
import { Button, ResultCount } from '@components'
import { stockStore } from '@store/stock'
import BurgerButton from '../burger-button'
import NavMask from '../nav-mask'
import * as styles from './style.scss'
export * from '../menu'

export const HeaderMobile = ({ route, filters }) => {

  const { meta = {} } = route
  const itemPage = filters?.id// @todo replace with <Helmet/> style
  const gridPage = !!meta?.category
  const enableStickyHeader = route?.id === 'home'
  const catUrl = getPathname().split('/').splice(0, 2).join('/')
  const categoryLabel =   'furniture' === filters.category
  ? 'furniture'
  : `${filters.size || filters.category} beds`
  /**
   * 
   */
  let children
  if (itemPage) {
    children = <>
      <Link href={catUrl} className="logotype">
        <Button
          icon="arrow"
          className={styles.backBtn}
          ariaLabel="back to list"
        />
        {categoryLabel}
      </Link>
      <ResultCount />
    </>

  } else if (gridPage) {
    children = <>
      <Link href={catUrl} className={cx(styles.addPadding, 'logotype')}>
        {categoryLabel}
      </Link>
      <BurgerButton />
    </>
  } else {
    children = <>
     <Link href="/" className={cx(styles.addPadding, 'logotype')}>
        BEDSTEADS
      </Link>
      <BurgerButton />
    </>
  }

  setUnsetBodyClass(styles.fullHeight, enableStickyHeader)
  return (
    <>
      <NavMask />
      <HeaderSticky
        enable={enableStickyHeader}
        triggerY={80}
        className={cx(styles.header)}
      >
        {children}
      </HeaderSticky>
    </>
  )
}