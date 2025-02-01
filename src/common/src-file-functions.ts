/**
 *
 *
 *
 * item page
 *
 * 1. , main_{size}.jpg
 * 2. , main_{size}_c.jpg    composizite
 * 3. , gallery_{size}.jpg
 *
 * grid
 *
 * 1. main_0.jpg
 * 2. main_p.jpg
 */

const getTaggedImagePath = (id, src, tag) => {
  const url = `${createSockImagePath(id)}/${src}`.replace(
    '.jpg',
    `,t_${tag}.jpg`,
  )
  return url
}

export function createSockImagePath(id) {
  return `/image/stock/${Math.floor(id / 100)}/${id}`
}

/**
 * If its a landscape portrait we use the tag s_0
 * else we use the tile src
 */
export const stockImageTileSrc = ({ id, src, r, isFurniture }) => {
  let tag = 'main,s_0'
  if (isFurniture) {
    tag = r > 100 ? 'tile-p' : 'tile-l'
  }
  return getTaggedImagePath(id, src, tag)
}

/**
 * If its a landscape portrait we use the tag s_0
 * else we use the tile src
 */
export const stockGallerySrc = ({ id, src }) =>
  getTaggedImagePath(id, src, 'gallery')

export const getMainImageSrc = ({ id, src, r = 0 }) =>
  getTaggedImagePath(id, src, r > 100 ? 'main-c' : 'main')

export const getThumbSrc = ({ id, src, r }) =>
  getTaggedImagePath(id, src, r > 90 ? 'thumb-p' : 'thumb')
