import { cx } from '@raiz/browser'
import { ContactButton, FavouriteBtn } from '@components'
import styles from './style.scss'

export const SpeedDial = ({ id }) => {
    return (
        <div className={cx(styles.speedDial)}>
            <ContactButton id={id}>
                <div className={styles.text}>contact us</div>
            </ContactButton>
            <FavouriteBtn
                id={id}
                render={({ label }) => (
                    <div className={styles.text}>{label}</div>
                )}
            />
        </div>
    )
}
