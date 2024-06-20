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

export function createTwitterImg(img) {
  return createAbsoluteUrl(`/img/twitter/${img}.jpg`)
}
