import mongodb from 'mongodb'
import {connect} from '@raiz/nuggins/dbase/src/mongo'
export const con = await connect(mongodb, { collections: ['enquiry', 'stock'] })
