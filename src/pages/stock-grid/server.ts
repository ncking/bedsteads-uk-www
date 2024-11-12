import {
  organizationJsonLd,
  createAbsoluteUrl,
  createOgUrl,
  createTwitterImg,
} from '@server'

export default async ({ response, route, request }) => {
  const filters = { ...route.meta, ...route.params }
  const { category, size } = filters
  const { pathname } = request

  /**
     * A category grid/tiles page
     *
     */

  const tag = size || category

  const defaultDesc
        = 'Large range of antique beds, French beds, iron Beds &amp; antique furniture. 100s of antique beds on show at our Somerset showroom, South West of Bristol'
  const titles = {
    antique: [
      'Antique beds | Antique French beds | Iron Beds | Wood Beds',
      defaultDesc,
    ],
    reproduction: [
      'Reproduction beds | Edwardian style beds | Victorian style beds | Replica beds',
      'Reproduction beds in just about any size you want. Faithful copies of original English and French Victorian and Edwardian designs, in sizes that are difficult to find in original antique beds.',
    ],
    furniture: [
      'Antique Furniture | French Armoire | Victorain chest | French chairs',
      'Bedsteads has a large selection of antique furniture; Antique French armoires, Antique french, furniture, antique wardrobes, chairs.',
    ],
    superking: [
      'Antique Superking beds | Antique Large beds | Custom Beds | Wood Beds',
      'Bedsteads has a selection of superking beds & larger antique beds',
    ],
    kingsize: [
      'Antique Kingsize beds | Iron Beds | Antique Beds',
      defaultDesc,
    ],
    double: [
      'Antique Double beds | Antique Three-quater Beds | Iron Beds | French Beds',
      defaultDesc,
    ],
    single: [
      'Antique Single beds | Antique Single pairs | Pairs of Beds',
      'Classic Vintage Single beds & pairs of single beds',
    ],
  }
  if (!titles[tag]) return response.notFound()

  const [title, description] = titles[tag]
  response
    .setRobots('index,follow')
    .setTitle(title)
    .setDescription(description)
    .setJsonLd(organizationJsonLd)
    .setTwitterCard({
      title,
      description,
      image: createTwitterImg(tag),
    })
    .setOg({
      type: 'article',
      title,
      description,
      url: createAbsoluteUrl(pathname),
      site_name: 'Bedsteads',
      image: createOgUrl(tag),
    })
}
