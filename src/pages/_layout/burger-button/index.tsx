import { Button } from '@components'
import { analyticsNav } from '@lib'
import { burgerToggle } from '../menu'
import * as styles from './style.scss'

const BurgerButton = () => {
  return (
    <Button
      onClick={() => {
        analyticsNav('burger toggle')
        burgerToggle()
      }}
      className={styles.burgerButton}
      ariaLabel="menu button"
    >
      <div className={styles.hamburger}>
        <span>toggle menu</span>
      </div>
    </Button>
  )
}

export default BurgerButton
