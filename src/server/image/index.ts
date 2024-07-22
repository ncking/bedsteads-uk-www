import { log } from '@raiz/core'
import { image } from '@raiz/nuggins/server'
import { findOnePublic } from '@server/repo/stock'

function getHeight(w, ratio = 0.66) {
  return Math.ceil(w * ratio)
}

const f_Ratio = 1.5
const f_tile_portrait_width = 400 // the breakpoint for single portrait
const widths = [520, 1060, 1600, 2000]
const f_tile_width = widths[0] // 520px
const stockMatcher = new RegExp('/image/stock/(?<dec>[0-9]+)/(?<id>[0-9]+)/(?<file>[0-9]+),t_(?<token>(thumb-p|thumb|main-c|main|tile-p|tile-l|tile|gallery)+)(,s_)?(?<size>([0-9])+)?', 'i')
const mainSizes = [
  { width: widths[0], height: 365 }, // needed for furniture
  { width: widths[1], height: getHeight(1060) },
  { width: widths[2], height: getHeight(1600) },
  { width: widths[3], height: getHeight(2000) },
]

export const templates = async ({ template, size, pathname, srcFile, outFile, srcDir }, httpError) => {
  let webP = true
  let quality = 70

  try {
    async function render(args) {
      const img = await image(srcFile)
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

    if (template === 'col') {
      return render({ height: 600 })
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
          const img = await image(config)
          img.resize(mainSizes[size])
          img.jpeg({ quality }).toFile(outFile)
          img.clone().webp({ quality: 80 }).toFile(`${outFile}.webp`)
        }
        return
    }
  }
  catch (e) {
    log.error('IMAGE: render', e)
  }

  return httpError(404)
}

function makeMultipleSrc({ images, srcDir }) {
  const height = 1320
  const width = 2000
  const w1 = Math.floor(width / 2)
  return {
    width,
    height,
    background: '#000000',
    images: [
      { src: `${srcDir}/${images[0].src}`, width: w1, height, top: 0, left: 0 },
      { src: `${srcDir}/${images[1].src}`, width: width - w1, height, top: 0, left: w1 },
    ],
  }
}
