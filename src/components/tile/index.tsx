import { cx } from '@raiz/browser'
import { Link } from '@raiz/nuggins'
import { ImageLoadLazy } from '@raiz/react'
import { stockImageTileSrc } from '@lib'

export const Tile = (props) => {
  const {
    id,
    title,
    category,
    images: [img],
    imageOnly,
    className,
    classPortrait = '',
    url,
  } = props

  let ratio = 66
  let isFurniturePortrait = false
  const isFurniture = category === 'furniture'
  if (isFurniture) {
    if (img.r > 100) {
      ratio = 150
      isFurniturePortrait = true
    }
    else {
      ratio = 75
    }
  }
  const src = stockImageTileSrc({
    id,
    ...img,
    isFurniture,
  })

  const imgC = (
    <ImageLoadLazy
      tag="div"
      src={src}
      responsive={false}
      alt={`picture of ${title}`}
      ratio={ratio}
      timeout={200}
    />
  )

  if (imageOnly) {
    return (
      <div className={cx(isFurniturePortrait && classPortrait)}>
        {imgC}
      </div>
    )
  }

  return (
    <Link
      className={cx(className, isFurniturePortrait && classPortrait)}
      href={url}
      label={title}
    >
      {imgC}
    </Link>
  )
}
