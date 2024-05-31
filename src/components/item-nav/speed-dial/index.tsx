import { cx } from '@raiz/browser'
import { ContactButton, FavouriteBtn } from '@components'
import * as styles from './style.scss'

export const SpeedDial = ({ item }) => {
  const { id } = item
  return (
    <div className={cx(styles.speedDial)}>
      <ContactButton item={item}>
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
