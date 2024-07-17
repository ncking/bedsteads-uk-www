import { useEffect, useState } from 'react'
import { cx } from '@raiz/browser'
import { navigate } from '@raiz/nuggins'
import { RESPONSE_SLICE_DATA } from '@raiz/nuggins/common'
import { Tile, FavouriteBtn, StatsRow, MainBlock } from '@components'
import { getFavourites } from '@lib'
import { favStore } from '@store'
import * as styles from './style.scss'

export default () => {
  const [loadedItems, setLoadedItems] = useState(null)
  const favs = favStore.useStore(s => s.favs)

  useEffect(() => {
    const ids = Array.from(favs).map(item => item[0])
    getFavourites(ids).then((res) => {
      const loadedItems = {}
      const { favourites = [] } = res[RESPONSE_SLICE_DATA] || {}
      favourites.map(item => (loadedItems[item.id] = item))
      setLoadedItems(loadedItems)
    })
  }, [favs])

  if (loadedItems === null) return

  /**
     * So filter our list against
     * the serverlist ... server list MAY have items removed: duplicates, ... error ...
     * So we filter against the returned array
     *
     */
  const favsList = favs.map((rec) => {
    const [id] = rec
    if (!id) {
      return
    }
    const item = loadedItems[id]
    if (!item) {
      return
    }
    const { slug, title, info, stats, category } = item || {}
    const catSlug = category.split('_').shift()
    const url = `/${catSlug}/${slug}_${id}` /// iterate over the favs
    const allowedStats = ['reference', 'price', 'size']

    if (!item) {
      return (
        <li key={id}>
          <div className={styles.imgWrap}></div>
          <div className={styles.details}>
            <h2>
              #
              {id}
              {' '}
              DELETED
            </h2>
            <FavouriteBtn
              id={id}
              className={styles.fav}
              onClick={e => removeFadeOut(id, e)}
            />
          </div>
        </li>
      )
    }
    return (
      <li key={id} onClick={() => navigate(url)}>
        <div className={styles.imgWrap}>
          <Tile {...item} url={url} imageOnly={true} />
        </div>

        <div className={styles.details}>
          <h2>{title}</h2>
          <FavouriteBtn
            id={id}
            className={styles.fav}
            onClick={(e) => {
              e.stopPropagation()
              removeFadeOut(id, e)
            }}
          />

          <table>
            <tbody>
              {(info || stats || [])?.map(([label, value]) => {
                if (!allowedStats.includes(label)) {
                  return null
                }
                return (
                  <StatsRow
                    key={label}
                    label={label}
                    value={value}
                    item={item}
                  />
                )
              })}
            </tbody>
          </table>
        </div>
      </li>
    )
  })

  return (
    <>
      <MainBlock title="Favourite items">
        <p>
          Don't lose your favourites!.
          <br />
          Favourites are only saved to your device, until you clear
          your cache.
          <br />
          {favsList?.length ? '' : <h2>Nothing here... yet</h2>}
        </p>

      </MainBlock>
      {favsList?.length
        ? (
          <ul className={styles.favList}>{favsList.reverse()}</ul>
        )
        : (
          ''
        )}
    </>
  )
}

function removeFadeOut(id, e) {
  const li = e.target.closest('li')
  li.classList.add(styles.out)
  setTimeout(() => favStore.remove(id), 800)
}
