import { isInt, cx } from '@raiz/browser'
import { stockStore } from '@store/stock'
import * as style from './style.scss'

export const ResultCount = ({ className = '' }) => {
    const { idx, resultSet } = stockStore.useStore((s) => s)
    const { total } = resultSet

    if (!isInt(idx)) {
        return null
    }
    const num = `  ${idx + 1}`.split('').splice(-3, 3)
    return (
        <div className={cx(style.resultCount, className)}>
            <ul className={style.odometer}>
                <li>{num[0]}</li>
                <li>{num[1]}</li>
                <li>{num[2]}</li>
            </ul>
            <span className={style.total}>/{total}</span>
        </div>
    )
}
