import { cx } from '@raiz/browser'
import { BedsteadsImage, Intro } from '@components'
import { t1, t2, t3, t4 } from './text'


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
        <Intro className={cx()} list={['What makes an Item Antique?', 'Classifications', 'Names of Makers']}>
          Additional information
        </Intro>
      </BedsteadsImage>


      <div className="flex flex-text">
        <h1 className="flex__col--full">Additional information</h1>
        <div className="flex__col">{t1}{t2}{t3}{t4}</div>
        <div className="flex__col">

        <h2>Names of Makers</h2>
    <h4>R.W Winfield</h4>
    <p>
        R. W. Winfield & Co is a renowned British company, founded in 1829 known for its exceptional craftsmanship in the realm
        of furniture and beds.
        <br />
        With a legacy spanning several decades, R. W. Winfield & Co
        has earned a distinguished reputation for producing high-quality, handcrafted pieces that epitomize elegance and durability.
    </p>
    <p>
        Today, R. W. Winfield & Co continues to be a prominent name in the world of furniture, garnering recognition for its commitment to preserving
        traditional techniques while incorporating innovative design elements.
    </p>
    <p>With each piece, R. W.
        Winfield & Co carries forward a legacy of artistry, providing customers with timeless and remarkable furnishings that stand the test of time.
    </p>

    <h4>Mercier Frères</h4>
    <p>
        Mercier Frères is a distinguished company renowned for its exquisite craftsmanship in the realm of luxury
        goods and accessories. Established in France by André Mercier in 1828, Mercier Frères has a long-standing heritage which exemplifies a
        commitment to artistry and refinement.
    </p>
    <p>
        The allure of Mercier Frères antique beds lies not only in their visual appeal but also in their exceptional quality and durability.
        These beds have withstood the test of time.
    </p>
    <p>Owning a Mercier Frères antique bed is to possess a cherished piece of history, a luxurious sanctuary that transcends time.</p>



    <h4>James Schoolbred</h4>
    <p>
        James (or Jas) Shoolbred was a prominent British furniture manufacturer and retailer known for its exquisite craftsmanship and high-quality furnishings.
    </p>
    <p>
        Founded in the mid-19th century, the company quickly gained recognition for its exceptional designs and attention to detail.
        Although the original Jas Shoolbred company ceased operations in the mid-20th century, their name and designs continue to be revered by
        collectors and enthusiasts of antique and vintage furniture.
    </p>
    <p>
        Jas Shoolbred pieces are sought after for their timeless beauty, superior craftsmanship, and historical significance,
        making them highly coveted additions to any discerning collector's home.
    </p>


    <h4>Maison Krieger</h4>
    <p>
        Maison Krieger, a renowned French furniture manufacturer and retailer, flourished during the 19th and early 20th
        centuries. Established by Antoine Krieger in Paris during the mid-19th century
    </p>
    <p>
        A distinguishing feature of Maison Krieger was their ability to seamlessly blend different design styles.
        The company adeptly merged elements from neoclassical, Empire, and Art Nouveau periods, resulting in unique
        and harmonious furniture that appealed to a diverse range of tastes.<br />
        This fusion of styles contributed to Maison Krieger's reputation for innovative and visionary design.
    </p>

        </div>
      </div>
    </>
  )
}
