import { raizFetch } from '@raiz/browser'
const fetchApi = (url, props = {}) => raizFetch(`/api${url}`, props)

export const createEnquiry = data => fetchApi('/enquiry/create', { data })
export const getFavourites = ids => fetchApi('/favourites/find', { data: { ids } })
