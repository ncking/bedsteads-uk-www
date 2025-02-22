import { SALE_PERCENT, SALE_ENABLED } from '@sale/common'
import type { Stock } from '@types'

function priceFormat(n) {
  if (n) {
    return `£${Number(n).toLocaleString()}`
  }
  return 'P.O.A'
}

function reduceByPercentage(value: number, percentage: number = 0) {
  return value * (1 - percentage / 100)
}

export function transformData(item, gridFormat: boolean): Stock {
  if (!item) {
    return null
  }
  const {
    id,
    title = '',
    description = '',
    made = null,
    slug,
    size = '',
    price: priceObj,
    category: cat,
    images,
    reproduction_price,
    stats: renamedToInfo = [],
    deleted: isDeleted = null,
    reserved: isReserved = null,
  } = item

  /**
     *
     */
  const category = cat.split('_').shift()
  const isRepro = category === 'reproduction'
  const isFurniture = category === 'furniture'
  const ref = `#${id}`

  images?.map((image) => {
    image.r = Math.floor(image.r)
  })

  let isSold = false
  let status = ''
  if (isDeleted) {
    status = 'sold'
    isSold = true
  }
  else if (isReserved) {
    status = 'reserved'
  }

  /**
     *
     */
  const info = []
  const newItem = {
    id,
    slug,
    category,
    title: String(title).trim(),
  } as Stock

  if (isRepro) {
    // its an object ... should be an array ...reproduction_price
    newItem.isRepo = 1
    info.push(['reference', ref])
    info.push(['width', '-'])

    Object.keys(reproduction_price || {}).map((k) => {
      // otherwise it throws a 502
      info.push([k.replace('-', "'"), priceFormat(reproduction_price[k])])
    })
  }
  else {
    if (isSold) {
      info.push(['Price', 'SOLD'])
    }
    else {
      /**
             * Fix the price from dbase & setup sale price
             *
             *  item{
             *      price
             *      priceFmt
             *      priceWasFmt
             *      isSale: boolean /// to show the sale banners
             *      info {
             *          price: priceFmt
             *      }
             */

      const [oldPrice, currentPrice] = String(
        priceObj?.price || '',
      ).split(',')

      if (oldPrice && currentPrice) {
        // if we have a new /old price just use this
        newItem.price = currentPrice
        // we dont need the old price unformatted
        newItem.priceWasFmt = priceFormat(oldPrice)
      }
      else if (SALE_ENABLED) {
        /**
                 * Adjust for sale
                 */
        newItem.price = Math.floor(
          reduceByPercentage(oldPrice, SALE_PERCENT),
        ) // SALE% off
        newItem.priceWasFmt = oldPrice && priceFormat(oldPrice)
      }
      else {
        newItem.price = Math.floor(oldPrice) // SALE% off
      }
      newItem.priceFmt = priceFormat(newItem.price)
      /**
             * Sale
             */
      newItem.isSale = SALE_ENABLED ? 1 : 0
      /**
             * Add the current price to the info Obj
             */
      info.push(['price', priceFormat(newItem.price)])
    }

    info.push(['reference', ref])
    if (made) {
      info.push(['manufactured', made])
    }
    if (isFurniture) {
      newItem.isFurniture = 1
    }
    else {
      const s = size.split('_')[0] // only beds have size
      info.push(['size', s])
      newItem.size = s
    }
    Array.from(renamedToInfo || []).map(
      ({ value, label }: { value: string, label: string }) => {
        if (value) {
          info.push([label, value])
        }
      },
    )
  }

  /**
     *
     */
  if (gridFormat) {
    newItem.images = [images[0]]
  }
  else {
    if (status) newItem.status = status
    newItem.info = info
    newItem.description = description.trim()
    newItem.images = images
  }
  return newItem
}
