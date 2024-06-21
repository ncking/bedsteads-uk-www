import * as styles from './stats.scss'

export const StatsRow = ({ item, value, label }) => {
  const { priceWasFmt } = item
  if (!value || !label) {
    return ''
  }
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
  return (
    <tr key={label}>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  )
}
