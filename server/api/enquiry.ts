import { log } from '@raiz/core'
import { sendEmails } from '@server/lib'
import { saveEnquiry } from '@server/repo/enquiry'

export const enquiry = async ({ body }) => {
  try {
    await saveEnquiry(body)
    sendEmails()
    return { success: 1 }
  }
  catch (e) {
    log.error(e)
  }
}

enquiry.config = {
  url: '/enquiry',
  withBody: true,
  expires: 0,
}
