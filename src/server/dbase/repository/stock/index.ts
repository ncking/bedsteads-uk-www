import { createSimpleCache } from '@raiz/core'
import { db } from '@server/dbase'
import { transformData } from './transform-data'
export * from './utils'

const ENTITY = 'stock'
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

export const findOnePublic = async (id) => {
  const results = await find({ id: +id }, false)
  return results[0] || null
}

export const findActive = async () => find({
  deleted: { $ne: 1 },
  visible: 1,
  images: { $exists: true, $ne: [] },
})

export const findFavourites = async (idsArray = []) => find({ id: { $in: idsArray } })

async function find(filter, gridFormat: boolean = true) {
  const k = JSON.stringify(filter)
  const fn = async () => {
    const docs = await db[ENTITY].find(filter).sort({ id: -1 as const }).project(projection).toArray()
    return docs.map(doc => transformData(doc, gridFormat))
  }
  const { data } = await cache.getUpdate(k, fn, 60 * 5)
  return data
}
