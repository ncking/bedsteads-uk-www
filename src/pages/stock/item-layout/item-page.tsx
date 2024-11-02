import { arrayValues } from '@raiz/browser'
import { BedsteadsImage, SlideUp, SaleStockBanner, Column, MainBlock } from '@components'
import { getMainImageSrc, getGalleryId, stockGallerySrc } from '@lib'
import Stats from './stats'
import * as styles from './item.scss'
import * as statusStyles from './status.scss'

/**
 * So its **alkways in the store, either from Document request or
 * from the embeded store
 */
export const ItemPage = (props) => {
const { activePanel, item} = props


  if (!item) {
    return null
  }
  const {
    id,
    images = [],
    title = '',
    description,
    status,
    info,
  } = item
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
      >
      </BedsteadsImage>

      <MainBlock title={title} className={styles.reorder}>
        <Stats item={item} />
        <>{description}</>
      </MainBlock>

      <Column>
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
      </Column>
    </>
  )
}
