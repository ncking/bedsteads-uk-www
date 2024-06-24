import { cx } from '@raiz/browser'
import { Columns, Container, Row } from '@raiz/react'
import { BedsteadsImage, Column } from '@components'
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
        src="/image/page/spanners,t_viewport.jpg"
      >
        <div className={cx(styles.title, 'logotype')}>
          {t1}
          {t2}
          {t3}
        </div>
      </BedsteadsImage>

      <Row>
        <Columns className="cols-1 md:cols-2 xl:cols-3">

          <Column text={true} indent={true}>
            {t4}
          </Column>

          <Column text={true}>
            {t5}
            {t6}
          </Column>

          <Column>
            <BedsteadsImage
              alt="Reflection of Bedsteads delivery van, in bed knob"
              lazy="false"
              tag="div"
              className={styles.top}
              responsive="1"
              src="/image/page/spanners,t_viewport.jpg"
            />
          </Column>
          </Columns>

      </Row>
    </>
  )
}
