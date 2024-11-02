import * as styles from './stats.scss'


const skelteton =[
  ['a', 'a'],
  ['a', 'a'],
  ['a', 'a'],
  ['a', 'a'],
  ['a', 'a'],
  ['a', 'a'],
  ['a', 'a'],
  ['a', 'a'],
  ['a', 'da'],
]

export const Stats = ({ rows }) => {

  
  return (
    <div className={styles.stats}>
      <table>
        <tbody>
          {(rows|| skelteton).map(([label, value],i) => (
            <tr key={i}>
              <td>{label}</td>
              <td>{value}</td>
            </tr>))}
        </tbody>
      </table>
    </div>
  )
}