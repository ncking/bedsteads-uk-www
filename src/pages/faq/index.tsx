import { cx } from '@raiz/browser'
import { BedsteadsImage } from '@components'
import * as styles from './style.scss'
import { t1, t2, t3, t4, t5, t6 } from './text'


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
        src="/image/page/shavings,t_viewport.jpg"
      >
        <div className={cx(styles.title, 'logotype')}>

        </div>
      </BedsteadsImage>


      <div className="flex flex-text">
        <h1 className="flex__col--full">Terms of service, Sustainability & Returns</h1>
        <div className="flex__col">{t1}{t2}{t3}{t4}</div>
        <div className="flex__col">{t5}{t6}</div>
      </div>
    </>
  )
}
