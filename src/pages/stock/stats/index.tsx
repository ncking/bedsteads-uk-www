//@ts-nocheck
import { SkeletonText } from '@raiz/react'
import * as styles from './stats.scss'


const skelteton = [
  [8, 12],
  [12, 14], [16, 12], [8, 12], [18, 12], [8, 12], [8, 12], [8, 12], 
]

export const Stats = ({ rows }) => {
  let trs = []

  if (rows.length) {
    trs = rows.map(([label, value], i) => {
      return (
        <tr key={i}>
          <td>{label}</td>
          <td>{value}</td>
        </tr>)

    })

  } else {
    trs = skelteton.map(([a, b], i) => {
      return (
        <tr key={`${i}-s`}>
          <td><SkeletonText ch={a} /></td>
          <td><SkeletonText ch={b} /></td>
        </tr>)

    })
  }

  return (
    <div className={styles.stats}>
      <table>
        <tbody>
          {trs}
        </tbody>
      </table>
    </div>
  )
}