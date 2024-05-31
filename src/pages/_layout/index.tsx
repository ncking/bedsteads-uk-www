import { useEffect } from 'react'
import { ErrorBoundary, Overlay, OverlayMain } from '@raiz/nuggins'
import { filterStock } from '@lib'
import { HeaderMobile } from './header-mobile'
import { burgerClose } from './header-mobile'
import { Sidebar } from './sidebar'
import ErrorPage from '../error'
import * as style from './styles.scss'

export const Layout = (props) => {
  const { response, request, route } = props

  useEffect(() => {
    burgerClose()
    scrollTo({ top: 0 })
  }, [request]) // @NK this is perfect nigel ... dont change this
  /**
     * Errors can come from 3 points
     * 1. route not found
     * 2. A thrown error ... bad js code
     * 3. A 4xx/5xx from the ajax or embedded response
     */

  const filters = { ...route.meta, ...route.params }
  filterStock(filters)
  const handlePageError = () => <ErrorPage {...props} />
  return (
    <>
      <HeaderMobile {...filters} />
      <Sidebar />
      <OverlayMain className={style.main}>
        <ErrorBoundary onError={handlePageError}>
          {response.status === 200
            ? (
              <props.component
                {...props}
                filters={filters}
                {...response?.getPageData()}
              >
              </props.component>
              )
            : (
              <ErrorPage {...props} />
              )}
        </ErrorBoundary>
      </OverlayMain>
      <Overlay className={style.overlay} hasTrans={false}></Overlay>
    </>
  )
}
