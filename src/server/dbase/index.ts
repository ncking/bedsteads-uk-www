import { connect } from '@raiz/nuggins/dbase/mongo'
import mongodb from 'mongodb'
export const db = await connect(mongodb)
