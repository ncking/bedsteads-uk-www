import {
  organizationJsonLd,
  createAbsoluteUrl,
  createOgUrl,
  createTwitterImg,
} from '@server'

export default async ({ response, request }) => {
  const description
        = 'Large range of antique beds, French beds, iron Beds & antique furniture. 100s of antique beds on show at our Somerset showroom, South West of Bristol'
  const metaTitle
        = 'Bedsteads is a well established, family run company that specialises in sourcing & restoring antique beds'

  const title
        = 'Huge range of Antique Beds, French beds, iron Beds & antique furniture'

  response
    .setRobots('index,follow')
    .setJsonLd(organizationJsonLd)
    .setTitle(metaTitle)
    .setDescription(description)
    .setTwitterCard({
      title,
      description,
      image: createTwitterImg('bedsteads'),
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
