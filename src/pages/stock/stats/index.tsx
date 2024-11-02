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
      rows.push(
        <StatsRow
          key={label}
          label={label}
          value={value}
          item={item}
        />,
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
