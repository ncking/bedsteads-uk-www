import { connect } from '@server/dbase'
import { transformData } from './transform-data'

export * from './utils'
export const STOCK_COLLECTION = 'stock'

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
  const results = await find({ id: +id })
  return results[0] || null
}

export const findActive = async () => find({
  deleted: { $ne: 1 },
  visible: 1,
  images: { $exists: true, $ne: [] },
})

export const findFavourites = async (idsArray = []) => find({ id: { $in: idsArray } })


async function find(filter: any, sort = { id: -1 }) {
  console.log('find **************', find)
  const conn = await connect(STOCK_COLLECTION)
  const docs = await conn.find(filter).sort(sort).project(projection).toArray()// return the promise from .find  { id: 1, images: [{ first: "images" }] }
  return docs.map(doc => transformData(doc))
}


// const k = JSON.stringify(filters)
// const fn = async () => {
//   const conn = await connect(STOCK_COLLECTION)
//   return await cb(conn.find(filters))
// }
// const { data } = await cache.getUpdate(k, fn, 60 * 5)
// return data
// const getResults = async ({ filters = {}, sort = { id: -1 } }) => {
//   return await stockCache(filters, result => result.sort(sort).project(projection).sort(sort).toArray())
// }