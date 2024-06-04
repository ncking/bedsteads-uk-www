import { sendEmails } from '@server/lib'
import { saveEnquiry } from '@server/repo/enquiry'

export const create = async ({ body }) => {
  await saveEnquiry(body)
  sendEmails()
  return { success: 1 }
}
