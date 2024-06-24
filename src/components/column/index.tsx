//@ts-nocheck
import { cx } from '@raiz/browser'
import * as styles from './styles.scss'

export const Column = ({ text, indent, className, ...rest }) => (
    <div className={cx(styles.column, text && styles.text, indent && styles.indent,className)} {...rest}></div>
)
