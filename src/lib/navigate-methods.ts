import { trim, log, isInt } from '@raiz/browser'
import { navigate, getPathname } from '@raiz/nuggins'
import { stockStore } from '@store'

export const prev = () => _navigate(stockStore.getPrevItem())
export const next = () => _navigate(stockStore.getNextItem())

const _navigate = (item) => {
  const { id, slug } = item
  if (!isInt(id)) {
    return log.error('id: int expected', id)
  }
  const currentUrl = trim(getPathname(), '/')
  const parts = currentUrl.split('/')
  const url = `${parts[0]}/${slug || Date.now()}_${id}`/// so we have had instances of missing slugs ... pad with anything to get this working
  navigate(`/${url}`)
}
