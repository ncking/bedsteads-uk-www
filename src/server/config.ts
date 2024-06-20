export * from 'src/config/client'
import { domain, company } from 'src/config/client'

/**
 * Favicons stuff
 */
export const background = '#26282D'
export const backgroundColour = background
export const theme_color = background
/** */
export const appName = company
export const appShortName = company
export const appDescription = 'Antique Beds and furniture'
export const lang = 'en-UK'
/** */
export const developer = 'Raiz, Bristol UK'
export const developerURL = 'https://raizmedia.co.uk'
export const author = developer
/**
 *
 */
export const url = domain
export const whatThreeWords = ''
export const twitterImage = `${domain}/favicon/android-chrome-256x256.png`
export const priceRange = '£150 - £20000'

export const GA = 'UA-672201-1'
export const gmapApiKey = 'UA-672201-1'
export const googleWebmasterVerification = 'S7aP7w4mEgJVKolP4FP1-8c1UOvlyzEQnZi87peQLkE'
export const version = '1.3.5'
export const sitemapUrl = `${domain}/sitemap/index.xml` // need for robots.txt & sitemap gen ....

/**
 * https://stackoverflow.com/questions/44772290/which-is-more-performant-array-includes-or-string-includes#:~:text=includes%20is%20much%20faster.
 */
const CACHE_FOREVER = 'max-age=31557600, immutable'
const CACHE_ONE_DAY = 'max-age=604800, stale-while-revalidate=86400'

export const cacheControlExtensionMap = {
  jpg: CACHE_FOREVER,
  webp: CACHE_FOREVER,
  png: CACHE_FOREVER,
  js: CACHE_FOREVER,
  css: CACHE_FOREVER,
  //
  svg: CACHE_ONE_DAY,
  ico: CACHE_ONE_DAY,
  txt: CACHE_ONE_DAY,
  webmanifest: CACHE_ONE_DAY,
}
