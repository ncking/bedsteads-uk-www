import { createSimpleCache } from '@raiz/core'
import { connect } from '@server/dbase'
import { STOCK_COLLECTION } from './constants'
import { transformData } from './transform-data'

export * from './utils'

const cache = createSimpleCache()
const projection = {
  '_id': 0,

  'created': 0,
  'modified': 0,
  'visible': 0,
  'created_dt': 0,
  'modified_dt': 0,
  // deleted: 1, //  WE NEED THIS ... ITS OUR 'SOLD' flag
  'images.b': 0,
  'images.w': 0,
  'images.h': 0,
  'images.alt': 0,
  'stats.immutable': 0,
  'stats.type': 0,
  'price.description': 0,
}

const stockCache = async (filters, cb) => {
  const k = JSON.stringify(filters)
  const fn = async () => {
    const conn = await connect(STOCK_COLLECTION)
    return await cb(conn.find(filters))
  }
  const { data } = await cache.getUpdate(k, fn, 60 * 5)
  return data
}

const getResults = async ({ filters = {}, sort = { id: -1 } }) => {
  return await stockCache(filters, result => result.sort(sort).project(projection).sort(sort).toArray())
}

/**
 * EXPORTS
 */
export const findOnePublic = async (id) => {
  const results = await stockCache({ id: +id }, result => result.project(projection).toArray())
  if (!results) {
    return null
  }
  return results?.length ? transformData(results[0]) : null
}

export const findActive = async () => {
  const filters = {
    deleted: { $ne: 1 },
    visible: 1,
    images: { $exists: true, $ne: [] },
  }
  const items = await getResults({ filters, sort: { id: -1 } })
  const newItems = items.map(item => transformData(item, { gridDetails: true }))
  return newItems
}

export const findAll = async () => {
  const conn = await connect(STOCK_COLLECTION)
  const data = await conn.find({}).sort({ id: -1 }).toArray()// return the promise from .find  { id: 1, images: [{ first: "images" }] }
  return data
}

export const findFavourites = async (idsArray = []) => {
  const conn = await connect(STOCK_COLLECTION)
  const favs = await conn.find({ id: { $in: idsArray } }).project(projection).toArray()// return the promise from .find  { id: 1, images: [{ first: "images" }] }
  return favs.map(fav => transformData(fav))
}
