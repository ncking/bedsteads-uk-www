import { __DEV__, env } from '@raiz/cli'
import { log } from '@raiz/core'
import { findUnsent, markSent } from '@server/repo/enquiry'
import nodemailer from 'nodemailer'
import xss from 'sanitize-html'

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

const sendEmail = async (doc) => {
  const { item } = doc
  const email = xss(doc.email)
  const link = xss(`https://www.bedsteads-uk.co.uk${item.url}`)
  const id = xss(item.id)
  const title = xss(item.title)
  const enquiry = xss(doc.enquiry)

  const html = `
    <h3><a href="${link}" target="_blank">REF: #${id}</a></h3>
    <h4>Web enquiry from: ${email}</h4>

    <br/>
    <br/>
    <div style="font-style: italic;background-color:#edeedd;padding:20px">
    ${enquiry}
    </div>
    <br/>
    <br/>
    link: <a href="${link}" target="_blank">${link}</a><br/>
    reply: <a href="mailto:${email}?subject=${title}">reply</a>
    `
  const rec = {
    from: '"Website enquiry 🌐" <website@bedsteads-uk.co.uk>', // sender address
    to: env.stringRequired('EMAIL_SEND_ENQUIRY'), // list of receivers  , enquiries@bedsteads-uk.co.uk
    subject: 'Website enquiry',
    text: enquiry,
    replyTo: email,
    html,
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
