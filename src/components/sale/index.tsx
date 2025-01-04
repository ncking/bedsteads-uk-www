import { SaleText } from './text'
import * as styles from './style.scss'
import { SALE_ENABLED } from '@common'

export const SaleMain = () =>
  SALE_ENABLED ? (
    <div className={styles.saleMain}>
      <SaleText />
    </div>
  ) : null

export const isSaleItem = (item) => SALE_ENABLED && item?.isSale

export const SalePriceStats = ( item ) => {
  if (isSaleItem(item)) {
    const { priceFmt, priceWasFmt } = item
    return (
      <tr className={styles.salePriceStats} key="salePrice">
        <td>SALE PRICE</td>
        <td>
          <span className={styles.oldPrice}>{priceWasFmt}</span>
          <span>{priceFmt}</span>
        </td>
      </tr>
    )
  }
}

/**
 *
 */
export const SaleStockBanner = ({ item }) => {
  if (isSaleItem(item)) {
    return (
      <div className={styles.saleStockBanner}>
        <SaleText />
      </div>
    )
  }
  return null
}
