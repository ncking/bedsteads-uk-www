import { cx } from '@raiz/browser'
import { Container, Row } from '@raiz/react'
import { BedsteadsImage } from '@components'
import * as styles from './style.scss'
import {t1, t2, t3, t4, t5, t6} from './text'


export default () => {
  return (
    <>
      {/* <SaleMain ></SaleMain> */}

      <BedsteadsImage
        alt="Reflection of Bedsteads delivery van, in bed knob"
        lazy="false"
        tag="div"
        className={styles.top}
        responsive="1"
        src="/image/page/spanners,t_viewport.jpg"
      >
        <div className={cx(styles.title, 'logotype')}>
          {t1}
          {t2}
          {t3}
        </div>
      </BedsteadsImage>

      <div className="flex flex-text">

        <div className="flex__col">
        {t4}
        </div>
        <div className="flex__col">
        {t5}
        {t6}
        </div>


        <div className="flex__col">
          <BedsteadsImage
            alt="Reflection of Bedsteads delivery van, in bed knob"
            lazy="false"
            tag="div"
            className={styles.top}
            responsive="1"
            src="/image/page/spanners,t_viewport.jpg"
          />
        </div>
      </div>
    </>
  )
}
