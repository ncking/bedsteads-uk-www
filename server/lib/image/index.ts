import { log } from '@raiz/core'
// import { addQueue } from '@raiz/nuggins/modules/queue'
import { findOnePublic } from '@server/repo/stock'
import sharp from 'sharp'
import { makeMultipleSrc, createCompositeImage } from './create-composite-image'

const stockMatcher = new RegExp('/image/stock/(?<dec>[0-9]+)/(?<id>[0-9]+)/(?<file>[0-9]+),t_(?<token>(thumb-p|thumb|main-c|main|tile-p|tile-l|tile|gallery)+)(,s_)?(?<size>([0-9])+)?', 'i')

function getHeight(w, ratio = 0.66) {
  return Math.ceil(w * ratio)
}
// @TODO move to sidecar
export const widths = [
  520,
  1060,
  1600,
  2000,
]

const mainSizes = [
  { width: widths[0], height: 365 }, // needed for furniture
  { width: widths[1], height: getHeight(1060) },
  { width: widths[2], height: getHeight(1600) },
  { width: widths[3], height: getHeight(2000) },
]

const f_Ratio = 1.5
const f_tile_portrait_width = 400 // the breakpoint for single portrait
const f_tile_width = widths[0] // 520px

export const templates = async (args, httpError) => {

  const { template, size, pathname, srcFile, srcDir } = args

  function addImage(options, webp = { quality: 70, format: 'webp' }) {
    const { width, height, src = srcFile } = options
    const outfile = [
      { quality: 70, width, height, format: 'jpg' },
      webp ? { width, height, ...webp } : undefined
    ]
    addQueue('', {
      src,
      outfile
    })
  }


  switch (template) {
    case 'gallery':
      return addImage({ width: widths[size] })

    case 'mattress':
      return addImage({ width: 504, height: 655 })

    case 'thumb-p':
      return addImage({ width: 46, height: 65 }, null)

    case 'thumb':
      return addImage({ width: 100, height: 65 }, null)

    case 'tile-p':
      return addImage({
        width: f_tile_portrait_width,
        height: Math.floor(f_tile_portrait_width * f_Ratio),
      })

    case 'tile-l':
      return addImage({
        width: f_tile_width,
        height: Math.floor(f_Ratio * (f_tile_width / 2)),
      })

    case 'viewport':
      return addImage(mainSizes[size])
  }


  /**
   * For the abovewe just check the src, for the below 
   * we need the record
   */

  let item
  const { id } = stockMatcher.exec(pathname)?.groups || {} /// we will be a valid id ... as we have source files
  if (id) {
    item = await findOnePublic(id)
  }
  if (!item) {
    return httpError(404)
  }
  const { images, category } = item

  switch (template) {
    case 'main':
      const isFurniture = category === 'furniture'
      if (0 === size && !isFurniture) { // we need to make furniture a differnt tag ... or run behind cookie
        return addImage({ width: widths[0], height: 365 })
      }
      return addImage(mainSizes[size])

    case 'main-c': // will be
      if (images?.length < 2) {
        return httpError(404)
      }
      { // eslint Unexpected lexical declaration in case block  no-case-declarations
        const config = makeMultipleSrc({ images, srcDir })
        const compositeImg = await createCompositeImage(config)
        addImage({ ...mainSizes[size], src: [] })
      }
      return
  }
  return httpError(404)
}
