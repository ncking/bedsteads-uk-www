import { SALE_PERCENT } from '@common'
import * as styles from './style.scss'

export const SaleText = () => (
  <div className={styles.wrap}>
    <div className={styles.title}>New Year Sale</div>
    <div className={styles.strap}>
      <span>
        {SALE_PERCENT}
        %
      </span>
      {' '}
      off Antique Items
    </div>
  </div>
)
