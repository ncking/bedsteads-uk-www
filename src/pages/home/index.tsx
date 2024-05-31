import { cx } from '@raiz/browser'
import { BedsteadsImage } from '@components'
import * as styles from './style.scss'

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
        src="/image/index/cover,t_viewport.jpg"
      >
        <div className={cx(styles.title, 'logotype')}>Bedsteads</div>
      </BedsteadsImage>

      <div className="flex flex-text">
        <h1 className="flex__col--full">Welcome to Bedsteads</h1>
        <div className="flex__col">
          <p>
            For a huge range of Antique Beds and furniture come and
            see Mark &amp; Nikki Ashton at their showroom housed in
            Chelvey Court Barn a picturesque medieval stone barn in
            Somerset.
          </p>
          <p>
            Mark and Nikki and their team of skilled craftsmen have
            been sourcing restoring and recreating antique beds and
            bedroom furniture for 25 years conserving beautiful
            pieces of history and making heirlooms for the future.
          </p>
          <p>
            Their unique pieces have been sourced from all over the
            UK, France, Spain, and Portugal so there is a vast array
            from simple all iron to opulent brass &amp; iron,
            beautiful fruitwood beds and bedroom suits and
            upholstered beds in all sizes.
          </p>
        </div>

        <div className="flex__col">
          <p>
            If you can't find the ideal bed then we can usually make
            it in our workshops from your sketches or ideas. Their
            new showroom has a broader selection of beds and antique
            furniture including Georgian and Victorian chests,
            Antique Table &amp; chair sets in painted and original
            finishes along with other bedroom furniture.
          </p>
          <p>
            They have also expanded their restoration, conservation,
            and repair services along with bespoke furniture making;
            so if you need a piece restoring, copying, designing or
            making in iron, brass or wood they will be happy to
            advise &amp; quote.
          </p>
          <p>
            Unlike other antique bed dealers, Bedsteads offer a
            unique bed in house widening and restoration service for
            both wood and metal bedsteads, nationwide collection and
            delivery can be arranged.
          </p>
        </div>
      </div>
    </>
  )
}
