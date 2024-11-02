import { analyticsNav } from '@lib'
import { burgerClose } from '../menu'
import * as styles from './style.scss'

const NavMask = () => {
    return (
        <div
            className={styles.mask}
            onClick={() => (analyticsNav('overlay close'), burgerClose())}
        ></div>
    )
}

export default NavMask
