import { parse } from 'node:url'
import { log } from '@raiz/core'
import { createAbsoluteUrl, createSockImagePath } from '@server'

import {
    findOnePublic,
    getCanonical,
    createItemLinkForFilter,
} from '@server/repo/stock'
import { createJsonLd } from './create-jsonld'

export default async ({ response, route, request }) => {
    const filters = { ...route.meta, ...route.params }
    const { id } = filters
    const { pathname } = request

    // response.sleep(1000)

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
    const description =
        sentanceOne.length < 50
            ? `${String(sentanceOne).trim()}. ${String(sentanceTwo).trim()}`
            : sentanceOne
    const sockImagePath = createSockImagePath(id)
    const mainImageUrl = createAbsoluteUrl(
        `${sockImagePath}/${images[0].src}`.replace('.jpg', ',t_main,s_1.jpg'),
    )
    const twitterCardImg = createAbsoluteUrl(
        `${sockImagePath}/${images[0].src}`.replace('.jpg', ',t_twitter.jpg'),
    )

    return response
        .setRobots('index,follow,max-snippet:150,max-image-preview:large')
        .setData({ item: model })
        .setTitle(title)
        .setDescription(description)
        .setCanonical(canonical)
        .setJsonLd(itemJsonLd)
        .setTwitterCard({
            title,
            description,
            image: twitterCardImg,
        })
        .setOg({
            type: 'article',
            title,
            description,
            url: canonical,
            site_name: 'Bedsteads',
            image: mainImageUrl,
        })
}
