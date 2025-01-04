import { SaleText } from './text'
import * as styles from './style.scss'
import {SALE_ENABLED, SALE_PERCENT} from '@common'

export const SaleMain = () =>
  SALE_ENABLED ? (
        <div className={styles.saleMain}>
            <SaleText />
        </div>
    ) : null

export const isSaleItem = (item) => item?.isSale

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

/**
 *
 */
export const SaleStockBanner = ({ item }) => {
    if (SALE_ENABLED && isSaleItem(item)) {
        return (
            <div className={styles.saleStockBanner}>
                <SaleText />
            </div>
        )
    }
    return null
}
