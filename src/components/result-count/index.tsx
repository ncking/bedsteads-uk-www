import { isInt, cx } from '@raiz/browser'
import { getResultSet } from '@lib'
import * as style from './style.scss'

export const ResultCount = ({ className = '' }) => {
  const { currentIdx, total } = getResultSet()
  if (!isInt(currentIdx)) {
    return null
  }
  const num = `  ${currentIdx + 1}`.split('').splice(-3, 3)
  return (
    <div className={cx(style.resultCount, className)}>
      <ul className={style.odometer}>
        <li>{num[0]}</li>
        <li>{num[1]}</li>
        <li>{num[2]}</li>
      </ul>
      <span className={style.total}>
        /
        {total}
      </span>
    </div>
  )
}
