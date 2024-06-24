//@ts-nocheck
import { cx } from '@raiz/browser'
import * as styles from './styles.scss'


export const Intro = ({ className, list, children }) => (
    <div className={cx(styles.intro, className)}>
        <div className={styles.title}>{children}</div>
        <ul className={styles.list}>
            <li>Item Antique?</li>
            <li>What makes an Item Antique?</li>
            <li>Item Antique?</li>
        </ul>
    </div>
)




