import { raizFetch } from '@raiz/browser'
export const fetchApi = (url, props = {}) => raizFetch(`/api${url}`, props)
