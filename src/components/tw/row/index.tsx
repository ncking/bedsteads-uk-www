import { cx } from '@raiz/browser'
import * as styles from './styles.scss'

export const Row = ({ className, type, ...rest }) => (
    <div
        className={cx(
            styles.row,
            'column' === type && styles.felxColumn,
            className,
        )}
        {...rest}
    ></div>
)
