import { isEqualShallow, localStorageSimple } from '@raiz/browser'
import { createStore } from '@raiz/react-simple-store'
import { analyticsFav, findItem } from '@lib'

const storage = localStorageSimple('BEDSTEADS_FAVS')
const KEY = 'favourites'
const favourites = new Map(storage.get(KEY) || [])
const isFavourite = (id: number) => favourites.has(+id)
const state = { favs: [...favourites] }

const actions = (set) => {
  function update() {
    const favs = [...favourites]
    storage.set(KEY, favs)
    set({ favs })
  }

  function remove(id: number) {
    favourites.delete(+id)
    update()
  }

  function getTotal() {
    return favourites.size
  }

  function toggleId(id) {
    id = +id
    if (isFavourite(id)) {
      return remove(id)
    }
    else {
      const item = findItem(id)
      if (item) {
        favourites.set(id, { created: Date.now() })
        analyticsFav({ id, total: getTotal() })
      }
    }
    update()
  }

  return {
    toggleId,
    isFavourite,
    remove,
    getTotal,
  }
}

export const favStore = createStore({ actions, state })
favStore.useStoreShallow = selector =>
  favStore.useStore(selector, isEqualShallow)
