import { cx } from '@raiz/browser'
import * as styles from './styles.scss'

export const Container = ({ className, ...rest }) => (
    <div className={cx(styles.container, className)} {...rest}></div>
)
