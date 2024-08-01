import { con } from '@server/dbase'
const ENTITY ='enquiry'

export const saveEnquiry = async (data) => {
  data.ceated = new Date()
  return await con[ENTITY].insertOne(data)
}

export const findUnsent = async () =>  con[ENTITY].find({ sent_at: null })
export const markSent = async (doc) =>  con[ENTITY].updateOne({ _id: doc._id }, { $set: { sent_at: new Date() } }, { w: 1, j: true })
