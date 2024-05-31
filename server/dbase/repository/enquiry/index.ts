import { log } from '@raiz/core'
import { connect } from '@server/dbase'

const ENQUIRY_COLLECTION = 'enquiry'

export const saveEnquiry = async (data) => {
  data.ceated = new Date()
  const conn = await connect(ENQUIRY_COLLECTION)
  return await conn.insertOne(data)
}

export const findUnsent = async () => {
  const conn = await connect(ENQUIRY_COLLECTION)
  return await conn.find({ sent_at: null })// .toArray()// not set or null
}

export const markSent = async (doc) => {
  try {
    const conn = await connect(ENQUIRY_COLLECTION)
    await conn.updateOne({ _id: doc._id }, { $set: { sent_at: new Date() } }, { w: 1, j: true })
  }
  catch (e) {
    log.error(e)
  }
}
