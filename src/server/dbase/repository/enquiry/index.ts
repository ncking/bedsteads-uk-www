import { db } from '@server/dbase'
const ENTITY = 'enquiry'

export const saveEnquiry = async (data) => {
  data.ceated = new Date()
  return await db[ENTITY].insertOne(data)
}

export const findUnsent = async () => db[ENTITY].find({ sent_at: null })
export const markSent = async doc => db[ENTITY].updateOne({ _id: doc._id }, { $set: { sent_at: new Date() } }, { w: 1, j: true })
