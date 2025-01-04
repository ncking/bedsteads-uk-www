import {
    organizationJsonLd,
    createAbsoluteUrl,
    createOgUrl,
    createTwitterImg,
} from '@server'
import { bases } from './tiles/bases'
import { kelcolTiles } from './tiles/kelcol'

const tiles = [...kelcolTiles, ...bases]
const sizes =
    '2\'6"/75cm, 3\'0"/90cm, 4\'0"/120cm, 4\'6"/135cm, 5\'0"/150cm, 5\'6"/165cm, 6\'0"/180cm'.split(
        ',',
    )

export default async ({ response, request }) => {
    const title =
        'Mattresses - British Made mattress renowned for quality and comfort'
    const description =
        'Large range of antique beds, French beds, iron Beds & antique furniture. 100s of antique beds on show at our Somerset showroom, South West of Bristol'
    response
        .setRobots('index,follow')
        .setData({ tiles, sizes })
        .setJsonLd(organizationJsonLd)
        .setTitle(title)
        .setDescription(description)
        .setTwitterCard({
            title,
            description,
            image: createTwitterImg('mattress'),
        })
        .setOg({
            type: 'article',
            title,
            description,
            url: createAbsoluteUrl(request.pathname),
            site_name: 'Bedsteads',
            image: createOgUrl('mattress'),
        }) // min 200 x 200 px
}
