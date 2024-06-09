import { __DEV__, env } from '@raiz/cli'
import { log } from '@raiz/core'
import { findUnsent, markSent } from '@server/repo/enquiry'
import nodemailer from 'nodemailer'
import { emailTemplate } from './email-template'

const host = env.stringRequired('EMAIL_HOST')
const port = env.intRequired('EMAIL_HOST_PORT')
const user = env.stringRequired('EMAIL_USER')
const pass = env.stringRequired('EMAIL_USER_PASSWORD')
const toEmail = env.stringRequired('EMAIL_SEND_ENQUIRY')

export const sendEmails = async () => {
  const data = await findUnsent()
  const arr = await data.toArray()
  log.info(`${arr.length} emails to send`)

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
  const { email, enquiry } = props
  const html = emailTemplate(props)
  const rec = {
    from: `"Website enquiry 🌐" <${user}>`,
    to: toEmail,
    subject: 'Website enquiry',
    text: enquiry,
    replyTo: email,
    html,
  }
  if (__DEV__) {
    return log.info('DEVELOPMENT: skipping email')
  }

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
