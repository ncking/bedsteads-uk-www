import mongodb from 'mongodb'
import { connect } from '@raiz/nuggins/dbase/mongo'
export const con = await connect(mongodb)
