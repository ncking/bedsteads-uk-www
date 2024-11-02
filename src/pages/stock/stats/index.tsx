import { StatsRow, SalePrice, isSaleItem } from '@components'
import * as styles from './stats.scss'


const Stats = ({ item }) => {
  const { info = [] } = item

  let rows = []
  if (info?.length) {
    const newStats = [...info]
    if (isSaleItem(item)) {
      rows.push(<SalePrice item={item} key="salePrice" />)
      newStats.shift()
    }
    newStats.map(([label, value]) => {

      const { priceWasFmt } = item
      if ('price' === label && priceWasFmt) {
        value = (
          <>
            <span className={styles.was}>
              {`${priceWasFmt}  `}
            </span>
            {value}
          </>
        )
      }
      rows.push(
        <tr key={label}>
          <td>{label}</td>
          <td>{value}</td>
        </tr>
      )
    })
  }

  return (
    <>
      <div className={styles.stats}>
        <table>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </>
  )
}

export default Stats


