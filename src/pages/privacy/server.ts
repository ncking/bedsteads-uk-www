import {
  organizationJsonLd,
  createAbsoluteUrl,
  createOgUrl,
  createTwitterImg,
} from '@server'

export default async ({ response, request }) => {
  const description = 'Your information is securely stored. Under data protection law, you have rights'
  const metaTitle = 'Bedsteads Privacy Policy - How we store your personal information'
  const title = 'Bedsteads Privacy Policy'

  response
    .setRobots('index,follow')
    .setJsonLd(organizationJsonLd)
    .setTitle(metaTitle)
  // .setData({ content })
    .setDescription(description)
    .setTwitterCard({
      title,
      description,
      image: createTwitterImg('beds'),
    }) // min 200 x 200 px
    .setOg({
      type: 'website',
      url: createAbsoluteUrl(request.pathname),
      site_name: 'Bedsteads',
      title,
      description,
      image: createOgUrl(''),
    }) // min 200 x 200 px
}
