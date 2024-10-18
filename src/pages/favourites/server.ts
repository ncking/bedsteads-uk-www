import { organizationJsonLd, createAbsoluteUrl, createOgUrl, createTwitterImg } from '@server'
import { company } from '@server/config'

export default async ({ request, response }) => {
  const title = `Favourite items from  ${company}`
  const description = 'Don\'t lose your faves!. Save them to your device'

  response
    .setRobots('index,follow')
    .setJsonLd(organizationJsonLd)
    .setTitle(title)
    .setDescription(description)
    .setTwitterCard({
      title,
      description,
      image: createTwitterImg('bedsteads'),
    })
    .setOg({
      type: 'article',
      title,
      description,
      url: createAbsoluteUrl(request.pathname),
      site_name: 'Bedsteads',
      image: createOgUrl('contact'),
    }) // min 200 x 200 px
}
