import { setUnsetBodyClass, cx } from '@raiz/browser'
import { Link, getPathname } from '@raiz/nuggins'
import { HeaderSticky } from '@raiz/react'
import { Button, ResultCount } from '@components'
import { stockStore } from '@store/stock'
import BurgerButton from '../burger-button'
import NavMask from '../nav-mask'
import * as styles from './style.scss'
export * from '../menu'

export const HeaderMobile = ({ route, itemPage, gridPage }) => {
  const resultSet = stockStore.useStore(s => s.resultSet)
  const { categoryLabel } = resultSet
  let children

 
  // const { params, id, meta = {} } = route
  // const itemPage =  // @todo replace with <Helmet/> style
  // const gridPage = !!meta?.category


  if ('item' === route?.id) {
    const catUrl = getPathname().split('/').splice(0, 2).join('/')
    const catLink = (
      <Link href={catUrl} className={cx(styles.addPadding, 'logotype')}>
        {categoryLabel}
      </Link>
    )
  
    children = (
      <>
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
    )
  }
  else if (route?.meta?.category) {
    children = (
      <Link href={route.url} className={cx(styles.addPadding, 'logotype')}>
        {route?.meta.label}
      </Link>
    )
  }
  else {
    children = (
      <Link href="/" className={cx(styles.addPadding, 'logotype')}>
        BEDSTEADS
      </Link>
    )
  }

  const enableStickyHeader = route?.id === 'home'
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
      {!itemPage && <BurgerButton />}
    </>
  )
}
