import { log } from '@raiz/core'
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

export const templates = async ({ template, size, pathname, srcFile, outFile, srcDir }, httpError) => {
  let webP = true
  let quality = 70

  try {
    function render(args) {
      const img = sharp(srcFile)
      img.resize(args)
      img.jpeg({ quality }).toFile(outFile)
      if (webP) {
        img.clone().webp().toFile(`${outFile}.webp`)
      }
    }

    if (template === 'mattress') {
      return render({ width: 504, height: 655 })
    }

    if (template === 'viewport') {
      return render(mainSizes[size])
    }

    let item
    const { id } = stockMatcher.exec(pathname)?.groups || {} /// we will be a valid id ... as we have source files
    if (id) {
      item = await findOnePublic(id)
    }
    if (!item) {
      return httpError(404)
    }
    const { images, category } = item
    const isFurniture = category === 'furniture'

    /**
         * @SECURITY
         * We test for source ... if its not there we dont get this far
         * 1. source is sanitized
         * 2. plugin only runs if authed
         */

    switch (template) {
      case 'main':
        if (0 === size && !isFurniture) { // we need to make furniture a differnt tag ... or run behind cookie
          return render({ width: widths[0], height: 365 })
        }
        return render(mainSizes[size])

      case 'tile-p':
        return render({
          width: f_tile_portrait_width,
          height: Math.floor(f_tile_portrait_width * f_Ratio),
        })

      case 'tile-l':
        return render({
          width: f_tile_width,
          height: Math.floor(f_Ratio * (f_tile_width / 2)),
        })

      case 'gallery':
        return render({ width: widths[size] })

      case 'thumb-p':
        webP = false
        return render({ width: 46, height: 65 })

      case 'thumb':
        webP = false
        return render({ width: 100, height: 65 })

      case 'main-c':
        if (images.length < 2) {
          return httpError(404)
        }
        { // eslint Unexpected lexical declaration in case block  no-case-declarations
          const config = makeMultipleSrc({ images, srcDir })
          const compositeImg = await createCompositeImage(config)
          compositeImg.resize(mainSizes[size])
          compositeImg.jpeg({ quality }).toFile(outFile)
          compositeImg.clone().webp({ quality: 80 }).toFile(`${outFile}.webp`)
        }
        return
    }
  }
  catch (e) {
    log.error('IMAGE: render', e)
  }

  return httpError(404)
}
