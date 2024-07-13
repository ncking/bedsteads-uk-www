import { organizationJsonLd, createAbsoluteUrl, createOgUrl } from '@server'
import {
  company,
  email,
  streetAddress,
  postcode,
  tel,
} from '@server/config'

export default async ({ request, response }) => {
  const title = `Contact ${company} | Location | Hours of business | Sales and Services, Contact us`
  const description = `tel: ${tel} email: ${email}. Located just to the SW of Bristol we are easily reached via the M5 motorway. address: ${streetAddress} ${postcode}`

  response
    .setRobots('index,follow')
    .setJsonLd(organizationJsonLd)
    .setTitle(title)
    .setDescription(description)
    .setOg({
      type: 'article',
      title,
      description,
      url: createAbsoluteUrl(request.pathname),
      site_name: 'Bedsteads',
      image: createOgUrl('contact'),
    }) // min 200 x 200 px
}
