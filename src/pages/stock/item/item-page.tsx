import React from 'react'
import { arrayValues } from '@raiz/browser'
import { BedsteadsImage, SlideUp, SaleStockBanner } from '@components'
import { getMainImageSrc, getGalleryId, stockGallerySrc } from '@lib'
import * as I from '@types'
import Stats from './stats'
import * as styles from './item.scss'
import * as statusStyles from './status.scss'

interface Props {
  item: I.StockItem
  activePanel?: boolean
}
/**
 * So its **alkways in the store, either from Document request or
 * from the embeded store
 */
export const ItemPage: React.FC<Props> = ({ item = {}, activePanel }) => {
  const {
    id,
    images = [],
    title = '',
    description,
    status,
    info,
  } = item as I.StockItem
  const [mainImage, ...otherImages] = images
  // @ nk this is the cause of all my empty images problems
  if (!arrayValues(images)) {
    return null
  }

  const src = getMainImageSrc({
    id,
    ...mainImage,
  })

  /**
     * all stats are no prepared SERVER side
     * Makes it simple, extensable 7 meanswe can remove some props for teh stock list
     */
  return (
    <>
      <BedsteadsImage
        alt={title}
        responsive={false}
        key={src}
        src={src}
        ratio={66}
        id={activePanel && getGalleryId(0)}
        className={styles.mainImage}
      >
      </BedsteadsImage>
      <SlideUp start={arrayValues(info)}>
        {status
          ? (
            <div className={statusStyles.status}>{status}</div>
            )
          : (
            <SaleStockBanner item={item} />
            )}

        <div className={`${styles.item} flex flex-text`}>
          <Stats item={item} />
          <h1 className="flex__col--full">{title}</h1>
          <div className={`${styles.copy} flex__col`}>
            {description}
          </div>
        </div>

        <div className={styles.gallery} data-testid="gallery">
          {(activePanel ? otherImages : []).map(({ src, r }, i) => {
            // a hack so that only the active panel has full height ... now that they are stacked the tallest will set the height!! if we dont do this
            return (
              <BedsteadsImage
                responsive={true}
                timeout={200}
                key={src}
                id={activePanel && getGalleryId(i + 1)}
                src={stockGallerySrc({ id, src })}
                alt={`${title} - photo angle #${i + 1}`}
                style={{
                  paddingTop: `${r}%`,
                }}
              />
            )
          })}
        </div>
      </SlideUp>
    </>
  )
}
