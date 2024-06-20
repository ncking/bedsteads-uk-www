import { company } from '@server/config'
import { organizationJsonLd, createAbsoluteUrl, createOgUrl } from '@server'

export default async ({ request, response }) => {
  const title = `Favourite items from  ${company}`
  const description = 'Don\'t lose your faves!. Save them to your device'

  response
    .setRobots('index,follow')
    .setData({})
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
