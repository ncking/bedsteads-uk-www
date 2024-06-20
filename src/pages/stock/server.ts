import { parse } from 'node:url'
import { log } from '@raiz/core'
import { organizationJsonLd, createAbsoluteUrl, createOgUrl, createSockImagePath } from '@server'

import {
  findOnePublic,
  getCanonical,
  createItemLinkForFilter,
} from '@server/repo/stock'
import { createJsonLd } from './create-jsonld'

export default async ({ response, route, request }) => {
  const filters = { ...route.meta, ...route.params }
  const { id, category, size } = filters
  const { pathname } = request

  // response.sleep(1000)
  if (id) {
    const model = await findOnePublic(id)

    if (!model) {
      return response.notFound()
    }

    /**
             * Check we are on the correct url for this item/filter
             * ... as in reality we only use the param:id ..
             *
             * We only get to this page if we are using 8CORRECT filters so KISS just use them
             * 1. make the url for this item, for this filter ...
             * 2. if this exists compare to the current ... & redirect if no-match
             */
    const { title, description: fullDesc, images } = model
    const canonical = getCanonical(model)
    const testUrl = createItemLinkForFilter(model, filters)

    if (pathname !== testUrl) {
      const url = parse(testUrl || canonical).pathname // make sure there is no host ... this mucks things up with DEV (we need to sort out DEV knowing what the DOMAIN IS)
      // make sure the can
      log.warn(`REDIRECT: from: ${pathname} , to: ${url}`)
      return response.redirect({ url })
    }

    model.canonical = canonical
    const itemJsonLd = createJsonLd(model)
    const [sentanceOne, sentanceTwo] = fullDesc.split('.')
    const description
            = sentanceOne.length < 50
              ? `${String(sentanceOne).trim()}. ${String(sentanceTwo).trim()}`
              : sentanceOne
    const sockImagePath = createSockImagePath(id)
    const mainImageUrl = createAbsoluteUrl(
            `${sockImagePath}/${images[0].src}`.replace(
              '.jpg',
              ',t_main,s_1.jpg',
            ),
    )

    response
      .setRobots('index,follow,max-snippet:150,max-image-preview:large')
      .setData({ item: model })
      .setTitle(title)
      .setDescription(description)
      .setCanonical(canonical)
      .setJsonLd(itemJsonLd)
      .setOg({
        type: 'article',
        title,
        description,
        url: canonical,
        site_name: 'Bedsteads',
        image: mainImageUrl,
      }) // min 200 x 200 px
  }
  else {
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
    if (!titles[tag]) {
      response.notFound()
    }
    else {
      const [title, description] = titles[tag]
      response
        .setRobots('index,follow')
        .setTitle(title)
        .setDescription(description)
        .setJsonLd(organizationJsonLd)
        .setOg({
          type: 'article',
          title,
          description,
          url: createAbsoluteUrl(pathname),
          site_name: 'Bedsteads',
          image: createOgUrl(tag),
        }) // min 200 x 200 px
    }
  }
}
