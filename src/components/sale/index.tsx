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

export const SalePriceStats = (item) => {
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
 * So if its a Repo it wont have a status or isSale flag 
 */
export const SaleStockBanner = ({ item={} }) => {

  const { status } = item
  if (isSaleItem(item) || status) {
    return (
      <div className={styles.saleStockBanner}>
        <SaleText />
        {status ? <div className={styles.status}>{status}</div> : null}
      </div>
    )
  }
  return null
}
