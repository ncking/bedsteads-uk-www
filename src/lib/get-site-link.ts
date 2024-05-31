import { log } from '@raiz/core'
import { routes } from '@raiz/nuggins'
import config from '@config'

let linkMap

export const getSiteLink = (id) => {
  if (!linkMap) {
    const { email, company, tel, facebookLink, instagramLink } = config()
    linkMap = {
      email: {
        url: `mailto:${email}`,
        title: email,
        label: `email ${company}`,
      },
      tel: { url: `tel:${tel}`, title: tel },
      facebook: { url: facebookLink },
      instagram: { url: instagramLink },
    }
    routes.map((route) => {
      const { url, id, meta = {} } = route
      const { title, label } = meta
      linkMap[id] = { url, title, label }
    })
  }

  if (!linkMap[id]) {
    log.error(`unknown route: ${id}`, routes)
    return '/'
  }
  return linkMap[id]
}
