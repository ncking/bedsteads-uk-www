import { sendEmails } from '@server'
import { saveEnquiry } from '@server/repo/enquiry'
import { findOnePublic, getCanonical } from '@server/repo/stock'

export const createEnquiry = async (data) => {
  const { id, enquiry, email } = data
  const stock = await findOnePublic(id)
  let success = 0
  if (stock) {
    await saveEnquiry({ enquiry, email, id: stock.id, title: stock.title, url: getCanonical(stock) })
    sendEmails()
    success = 1
  }
  return { success }
}
