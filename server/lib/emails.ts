import { __DEV__, env } from '@raiz/cli'
import { log } from '@raiz/core'
import { findUnsent, markSent } from '@server/repo/enquiry'
import nodemailer from 'nodemailer'
import { emailTemplate } from './email'

const host = env.stringRequired('EMAIL_HOST')
const port = env.intRequired('EMAIL_HOST_PORT')
const user = env.stringRequired('EMAIL_USER')
const pass = env.stringRequired('EMAIL_USER_PASSWORD')

export const sendEmails = async () => {
  const data = await findUnsent()
  const arr = await data.toArray()
  log.info(`${arr.length} emails to send`)
  if (__DEV__) {
    return log.info('DEVELOPMENT: skipping email')
  }
  await Promise.all(
    arr.map(async (doc) => {
      try {
        await sendEmail(doc)
        await markSent(doc)
      }
      catch (e) {
        log.error('sending email failed', e)
        return null
      }
    }),
  )
}

const sendEmail = async (props) => {

  const { email, id, enquiry, url, title } = props
  const domain = `https://www.bedsteads-uk.co.uk`
  const html = emailTemplate(props)

  const transporter = nodemailer.createTransport({
    host,
    port,
    auth: {
      user,
      pass,
    },
  })
  await transporter.sendMail(rec)
}
