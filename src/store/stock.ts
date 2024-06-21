import { isEqualShallow } from '@raiz/browser'
import { getGlobalStore } from '@raiz/nuggins'
import { createStore } from '@raiz/react-simple-store'
import type { StockArray } from '@types'

const actions = (set) => {
  /**
   * Run @ creation only
   */
  const stockArray: StockArray = getGlobalStore()?.stock || []
  const idMap = {}
  stockArray.map(item => add(item))
  /**
  * If we have a response form ajax add it to store,
  * also add SOLD items from document request ...
  * This makes sure any further query on store is a HIT ... but dont add to filter "active" set
  */
  function add(item) {
    idMap[item.id] = item
  }
  function getItemById(id) { // used by favs ... might not bethe current item (favs select in tiles view)
    return (id && idMap[id]) || null
  }

  let maxPos = 0
  let idx = 0
  let item = null
  let filteredStock = []
  let resultSet
  /**
   *
   */
  return {
    add,
    getItemById,
    getItem() { // the current item ...!
      return item
    },

    getPrevItem() {
      const i = idx <= 0 ? maxPos : idx - 1
      return filteredStock[i]
    },

    getNextItem() {
      const i = idx >= maxPos ? 0 : idx + 1
      return filteredStock[i]
    },

    getSwipSet() {
      return [this.getPrevItem(), this.getItem(), this.getNextItem()]
    },

    /**
     * so mainly for SSR ..., we need  the data inlined/ Render phase;
     * but a few components are deep or above the store.init ie <Header/> ... so data is accessed in two ways
     * 1. sync ... store is set from filters/page props & then read/props in children
     * 2. using hookState for "distant" components
     */
    updateState() {
      set({ resultSet, idx })
    },

    initSync({ id, size, category }) { // id, category, size
      /**
       * -1 NOT '0'
       * if its not found (sold)  ...
       *   a) ++ yeild '0'
       *   b) -- yeilds -2 >> maxPos
       */
      idx = -1
      item = getItemById(id)
      filteredStock = []
      id = parseInt(id)
      /**
       *
       */
      stockArray.map((item) => {
        const valid = size ? (size === item.size) : (category ? category === item.category : true)

        if (valid) {
          filteredStock.push(item)
          if (item.id === id) {
            idx = filteredStock.length - 1
          }
        }
      })
      const total = filteredStock.length
      maxPos = Math.max(total - 1, 0)
      const categoryLabel = 'furniture' === category ? 'antique furniture' : `${size || category} beds`
      /**
       *
       */
      resultSet = {
        category,
        size,
        total,
        categoryLabel, // used as a key & label for button nav labels
      }
      return { resultSet, stock: filteredStock, item }
    },
  }
}

export const stockStore = createStore({
  actions, state: {
    id: 0, // changes per item
    idx: 0, // changes per item
    resultSet: {}, // changes per category
  },
})
stockStore.useStoreShallow = selector => stockStore.useStore(selector, isEqualShallow)
