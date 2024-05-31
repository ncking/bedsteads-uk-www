import { cx } from '@raiz/browser'
import * as styles from './style.scss'

export const SlideUp = ({ children, start }) => {
  return (
    <div
      className={cx(styles.slideUp, start && styles.active)}
      onTransitionEnd={e => e.stopPropagation()}
    >
      {children}
    </div>
  )
}
