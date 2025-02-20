import { BedsteadsImage, Column, MainBlock } from '@components'
// @SALE import {  SaleStockBanner } from '@sale'
import { getMainImageSrc, getGalleryId, stockGallerySrc } from '@lib'
import { Stats } from '../stats'
import * as styles from './item.scss'
import * as statusStyles from './status.scss'

/**
 * So its **alkways in the store, either from Document request or
 * from the embeded store
 */

export const ItemPage = (props) => {
  const { activePanel, item } = props
  const { id, images = [], title = '', description, status } = item || {}
  const [mainImage, ...otherImages] = images

  const src = getMainImageSrc({
    id,
    ...mainImage,
  })

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
        {status
          ? (
              <div className={statusStyles.status} data-testid="status">{status}</div>
            )
          : null}

      </BedsteadsImage>
      {/* <SaleStockBanner item={item} ></SaleStockBanner> */}
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
