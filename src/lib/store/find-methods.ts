import { trim, log, isInt } from '@raiz/browser'
import { navigate, getPathname } from '@raiz/nuggins'
import { store, NOT_FOUND } from './store'

export const findItems = (currentItem) => {
  return [getPrevItem(), currentItem, getNextItem()] as [
        object,
        object,
        object,
  ]
}

export const getResultSet = () => store?.resultSet

export const getFilteredStock = () => store.idx

export const prev = () => navigateById(getPrevItem().id)

export const next = () => navigateById(getNextItem().id)

export const getPrevItem = () => {
  const { currentIdx, maxPos } = getResultSet()
  const pos
        = NOT_FOUND === currentIdx || !currentIdx ? maxPos : currentIdx - 1
  return store.idx[pos]
}

export const getNextItem = () => {
  const { currentIdx, maxPos } = getResultSet()
  const pos
        = NOT_FOUND === currentIdx || currentIdx >= maxPos ? 0 : currentIdx + 1
  return store.idx[pos]
}

export const findItem = (id) => {
  if (!id) {
    return
  }
  if (store?.idMap[id]) {
    return store.idMap[id]
  }
}

let currentItem
export const setCurrentItem = (id) => {
  currentItem = findItem(id) || null
  return currentItem
}

export const getCurrentItem = () => {
  return currentItem
}

/**
 *
 * add the page item to store ... but its not added to next / prev index
 * If this is an old/sold/de;eted item it will be added, if its a document request for a live item ... it will replace/update
 */
export const addItemToStore = (item) => {
  const { id } = item
  store.idMap[id] = item
}

export const navigateById = (id: number) => {
  if (!isInt(id)) {
    return log.error('id: int expected', id)
  }
  const currentUrl = trim(getPathname(), '/')
  const parts = currentUrl.split('/')
  const { slug } = findItem(id) /// so we have had instances of missing slugs ... pad with anything to get this working
  const url = `${parts[0]}/${slug || Date.now()}_${id}`
  if (url === currentUrl) {
    return
  }
  navigate(`/${url}`)
}
