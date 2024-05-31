import { setUnsetBodyClass, cx } from '@raiz/browser'
import { Link, getPathname } from '@raiz/nuggins'
import { HeaderSticky } from '@raiz/react'

import { Button, ResultCount } from '@components'
import BurgerButton from '../burger-button'
import NavMask from '../nav-mask'
import * as styles from './style.scss'
export * from '../menu'

export const HeaderMobile = (props) => {
  const { id, category, size, name: routeName } = props
  let catLabel
        = 'furniture' === category
          ? 'antique furniture'
          : `${size || category} beds`

  let children
  const catUrl = getPathname().split('/').splice(0, 2).join('/')
  const catLink = (
    <Link href={catUrl} className={cx(styles.addPadding, 'logotype')}>
      {catLabel}
    </Link>
  )

  if (id) {
    children = (
      <>
        <Link href={catUrl} className="logotype">
          <Button
            icon="arrow"
            className={styles.backBtn}
            ariaLabel="back to list"
          />
          {catLabel}
        </Link>
        <ResultCount />
      </>
    )
  }
  else if (category) {
    children = catLink
  }
  else {
    children = (
      <Link href="/" className={cx(styles.addPadding, 'logotype')}>
        BEDSTEADS
      </Link>
    )
  }

  const enableStickyHeader = routeName === 'home'
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
      {!id && <BurgerButton />}
    </>
  )
}
