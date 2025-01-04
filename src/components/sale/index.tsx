import { SaleText } from './text'
import * as styles from './style.scss'

const saleEnabled = true

export const SaleMain = () =>
  saleEnabled
    ? (
        <div className={styles.main}>
          <SaleText />
        </div>
      )
    : null
export const isSaleItem = item => item?.isSale

export const SalePrice = ({ item }) => {
  const { priceFmt, priceWasFmt } = item
  return (
    <tr className={styles.priceTr}>
      <td>SALE PRICE</td>
      <td>
        <span className={styles.oldPrice}>{priceWasFmt}</span>
        <span>{priceFmt}</span>
      </td>
    </tr>
  )
}

export const SaleStockBanner = ({ item }) => {
  if (saleEnabled && isSaleItem(item)) {
    return (
      <div className={styles.stockBanner}>
        <SaleText />
      </div>
    )
  }
  return null
}
