import { createAbsoluteUrl, createSockImagePath } from '@server'
import * as serverConfig from '@server/config'
const { company } = serverConfig

export const createJsonLd = (props) => {
    const {
        id,
        canonical,
        category,
        title,
        description,
        made,
        sold,
        info,
        images,
        price,
    } = props
    const sockImagePath = createSockImagePath(id)
    const jsonLdImgaes = images.map(({ src }, i) => {
        return createAbsoluteUrl(
            `${sockImagePath}/${src}`.replace(
                '.jpg',
                `,t_${i ? 'gallery' : 'main'},s_3.jpg`,
            ),
        )
    })

    const jsonLD = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        sku: `${id}`,
        url: canonical,
        name: title,
        description: description,
        category: category,
        productionDate: made,
        image: jsonLdImgaes,
        offers: {
            '@type': 'Offer',
            priceCurrency: 'GBP',
            // "priceValidUntil" : "2024-08-01",
            price: price,
            // optional "priceValidUntil": $model -> getPriceValidTo(), //"2018-11-05"
            itemCondition: 'https://schema.org/UsedCondition',
            availability: `https://schema.org/${sold ? 'SoldOut' : 'InStock'}`,
            seller: {
                '@type': 'Organization',
                name: company,
            },
            url: canonical,
        },
    }

    const additionalProperty = []

    ;(info || []).map(([label = '', value]) => {
        if (!value) {
            return
        }
        value = value.replace('cm', '')
        label = label.toLowerCase()

        switch (label) {
            case 'width':
            case 'total width':
            case 'overall width':
                jsonLD['width'] = {
                    '@context': 'https://schema.org',
                    '@type': 'QuantitativeValue',
                    value: value,
                    unitCode: 'CMT',
                }
                break

            case 'height':
            case 'total height':
            case 'head height':
            case 'overall height':
                jsonLD['height'] = {
                    '@context': 'https://schema.org',
                    '@type': 'QuantitativeValue',
                    value: value,
                    unitCode: 'CMT',
                }
                break

            case 'depth':
            case 'length':
            case 'total length':
            case 'overall length':
            case 'overall depth':
                jsonLD['depth'] = {
                    '@context': 'https://schema.org',
                    '@type': 'QuantitativeValue',
                    value: value,
                    unitCode: 'CMT',
                }
                break

            /**
             * Already added & code non standard, so skip
             */
            case 'reference':
            case 'size':
            case 'manufactured':
            case 'price':
                break

            /**
             *
             * http://wiki.goodrelations-vocabulary.org/Documentation/UN/CEFACT_Common_Codes
             * refrence: sku
             * size : double
             * manufactured : year
             */

            default:
                additionalProperty.push({
                    '@context': 'https://schema.org',
                    '@type': 'PropertyValue',
                    propertyID: label,
                    value: value,
                    unitCode: 'CMT',
                })
        }
    })

    if (additionalProperty.length) {
        jsonLD['additionalProperty'] = additionalProperty
    }

    return jsonLD
}
