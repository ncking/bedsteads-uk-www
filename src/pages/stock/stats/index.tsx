import * as styles from './stats.scss'


export const Stats = ({ rows }) => {
  return (
    <div className={styles.stats}>
      <table>
        <tbody>
          {rows?.map(([label, value]) => (
            <tr key={label}>
              <td>{label}</td>
              <td>{value}</td>
            </tr>))}
        </tbody>
      </table>
    </div>
  )
}