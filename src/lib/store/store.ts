import { getGlobalStore } from '@raiz/nuggins'
// import { getGlobalStore } from '@raiz/nuggins/plugins/store/client.js'
import { StockItem } from '@types'
export const NOT_FOUND = 'k'
export const store = {}

/**
 *
 *
 */
export const filterStock = (filters = {}) => {
  const {
    category: filterCategory = '',
    size: filterSize = '',
    id: currentId,
  } = filters
  const globalData = getGlobalStore().stock

  const idMap = {}
  const idx = []
  const stockArray: [StockItem] = globalData || []
  const currentIdInt = currentId ? +currentId : NOT_FOUND
  /**
     *
     */
  let currentIdx = NOT_FOUND
  stockArray.map((item) => {
    const { size, category, id } = item
    //
    const valid = filterSize
      ? size === filterSize
      : category
        ? category === filterCategory
        : true
    if (valid) {
      idx.push(item)
      idMap[id] = item

      if (currentIdInt === id) {
        currentIdx = idx.length - 1
      }
    }
  })
  /*
     */
  store.resultSet = {
    total: idx.length,
    maxPos: idx.length - 1,
    currentIdx,
    key: `${filterCategory}:${filterSize}`,
  }
  store.idx = idx
  store.idMap = idMap
}
