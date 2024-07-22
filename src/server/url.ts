import { log } from '@raiz/core'
import { domain } from '@server/config'

export function createAbsoluteUrl(src) {
  if (src.includes('https')) {
    log.error(`domain already in URL: ${src}`)
    return src
  }
  return `${domain}${src}`
}

export function createOgUrl(img) {
  return createAbsoluteUrl(`/img/og/bedsteads-uk${img ? `-${img}` : ''}.jpg`)
}

/**
 * Foe the stock, we gen form main image ... &
 * the main pages are pre generated
 *
 * should fit 1.91:1 or 800px X 418px
 *
 */
export function createTwitterImg(img) {
  return createAbsoluteUrl(`/img/twitter/${img}.jpg`)
}
