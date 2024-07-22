import { env } from '@raiz/cli'
import { log } from '@raiz/core'
import { MongoClient, Db, Collection } from 'mongodb'

const ENV_SERVER_DBASE_URL = env.stringRequired('SERVER_DBASE_URL')
const ENV_DATABASE = env.stringRequired('DATABASE')
const ENV_DBASE_TABLE = env.stringRequired('DATABASE_TABLE')

let conn

export const connect = async (collection = ENV_DBASE_TABLE): Promise<Collection> => {
  if (!conn) {
    const connectionConfig = {
      serverSelectionTimeoutMS: 2000, // this is for the initial connection
      connectTimeoutMS: 2000, // this is for ongoing connectsions
      // useUnifiedTopology: true,
      maxPoolSize: 5,
    }
    const connectionString = `mongodb://${ENV_SERVER_DBASE_URL}`
    conn = await MongoClient.connect(connectionString, connectionConfig).catch((err) => {
      log.fatal(err)
    })
    if (!conn) {
      log.fatal('No database')
    }
  }
  const db: Db = conn?.db(ENV_DATABASE)
  return db.collection(collection)
}
