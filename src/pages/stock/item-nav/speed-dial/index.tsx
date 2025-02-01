import { cx } from '@raiz/browser'
import { ContactButton, FavouriteBtn } from '@components'
import * as styles from './style.scss'

export const SpeedDial = ({ id }) => {
  return (
    <div className={cx(styles.speedDial)}>
      <ContactButton id={id}>
        <span className={styles.text}>contact us</span>
      </ContactButton>
      <FavouriteBtn
        id={id}
        render={({ label }) => (
          <span className={styles.text}>{label}</span>
        )}
      />
    </div>
  )
}
