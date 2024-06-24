import { cx } from '@raiz/browser'
import { BedsteadsImage, Intro } from '@components'
import { t1, t2, t3, t4, t5, t6 } from './text'


export default () => {
  return (
    <>
      {/* <SaleMain ></SaleMain> */}

      <BedsteadsImage
        alt="Reflection of Bedsteads delivery van, in bed knob"
        lazy="false"
        tag="div"
        className="viewport"
        responsive="1"
        src="/image/page/spanners,t_viewport.jpg"
      >
        <Intro className={cx()}  list={['What makes an Item Antique?', 'Classifications', 'Names of Makers']}>
        Additional information
        </Intro>
      </BedsteadsImage>


      <div className="flex flex-text">
        <h1 className="flex__col--full">Additional information</h1>
        <div className="flex__col">{t1}{t2}{t3}{t4}</div>
        <div className="flex__col">{t5}{t6}</div>
      </div>
    </>
  )
}
