import { ga4 } from '@raiz/browser'
const enabled = false

export const itemAnalyics = action => enabled && ga4.event('nav', { action })

export const analyticsNav = action => enabled && ga4.event('nav', { action })

export const analyticsException = (...args) => enabled && ga4.exception(...args)

export const analyticsFav = args => enabled && ga4.event('favourite', args)
