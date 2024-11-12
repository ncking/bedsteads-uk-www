import { cx } from '@raiz/browser'
import { BedsteadsImage, MainBlock, Intro } from '@components'
const a1 = `what-makes-an-antique`
const links = [
  { hash: a1, label: 'What is an Antique?' },
  { hash: '', label: 'Classifications' },
  { hash: '', label: 'Names of Makers' },
]

export default () => {
  return (
    <>
      <BedsteadsImage
        alt="rows of old  imperial spanners"
        lazy="false"
        tag="div"
        className="viewport"
        responsive="1"
        src="/image/page/spanners,t_viewport.jpg"
        setSizeMin={1}
      >
        <Intro className={cx()} links={links}>
          Additional information
        </Intro>
      </BedsteadsImage>

      <MainBlock>
        <>
          <h2 id={a1}>What makes an Item Antique?</h2>
          <p>
            An antique is an item that is 100 years old or more.
            They are often items which are cherished due to their
            aesthetic or historical qualities.
          </p>
          <h2>
            What is the difference between Antique, Vintage and
            Retro?
          </h2>
          <p>
            Antique items are 100 years sold or more, vintage items
            are generally considered to be between 20 and 100 years
            old, and retro items tend to be around 20 years old or
            less.
            <br />
            Generally, with each of these classifications, the items
            tend to be collectible or sought after and aesthetically
            reflect the styles of their times.
          </p>

          <h2>Classifications</h2>
          <p>
            Across our website you will notice us using words such
            as ‘Victorian’, Classic, Louis etc. below is a list of
            definitions to help demystify what we antique sellers
            mean:
          </p>

          <h4>What does ‘Victorian’ mean?</h4>
          <p>
            This generally refers to beds constructed within the
            Victorian era of 1820 – 1914, around Queen Victoria’s
            reign.
            <br />
            Styles during this period straddle the movements of the
            time, a delightful mixture of Aestheticism which
            encourages beauty for beauty’s sake, and the industrial
            revolution which demanded practicality and
            functionality.
          </p>
          <h4> Art Nouveaux</h4>
          <p>
            Originating in Europe, Art Nouveau furniture showcases
            sinuous and sculptural forms, characterized by curving
            lines, graceful arches, and sensuous ornamentation
            {/* (Taken from Nickle Bed) */}
          </p>

          <h4>What is a ‘Louis’ item of Furniture?</h4>
          <p>
            Distinguishing between Louis XV, Louis XVI, and Louis
            XIV antique furniture requires an understanding of the
            distinct characteristics and styles associated with each
            period. Here are some key features to look for:
          </p>
          <h4> Louis XIV (mid-17th century to early 18th century)</h4>
          <p>
            Emphasis on grandeur and opulence. Heavy and robust
            furniture designs. Elaborate ornamentation, including
            intricate carving and gilding. Baroque style with bold
            and exaggerated curves. Rich materials such as walnut,
            oak, and mahogany. Symmetry and balance in overall form.
          </p>

          <h4>Louis XV (early to mid-18th century)</h4>
          <p>
            Transition towards a more delicate and sensual style.
            Curvaceous forms, characterized by sinuous lines and
            flowing contours. Ornamentation featuring rocaille
            (shell-like) motifs, floral designs, and asymmetry.
          </p>
          <p>
            Lighter construction compared to Louis XIV furniture.
            Materials like rosewood, satinwood, and tulipwood
            commonly used. Cabriole legs with intricate scrollwork
            and often adorned with ormolu (gilded bronze) mounts.
          </p>

          <h4>Louis XVI (late 18th century)</h4>
          <p>
            Neoclassical influence, reflecting a return to classical
            Greek and Roman aesthetics.
            <br />
            Clean lines and geometric shapes. Symmetry and
            proportion in design. More restrained ornamentation,
            with motifs such as laurel wreaths, urns, and fluting.
            Lighter colours and pastel hues used in upholstery and
            finishes.
            <br />
            Mahogany, walnut, and fruitwoods frequently utilized.
            Straight, tapered legs, often with fluted details
          </p>
        </>

        <>
          <h2>Names of Makers</h2>
          <h4>R.W Winfield</h4>
          <p>
            R. W. Winfield & Co is a renowned British company,
            founded in 1829 known for its exceptional craftsmanship
            in the realm of furniture and beds.
            <br />
            With a legacy spanning several decades, R. W. Winfield &
            Co has earned a distinguished reputation for producing
            high-quality, handcrafted pieces that epitomize elegance
            and durability.
          </p>
          <p>
            Today, R. W. Winfield & Co continues to be a prominent
            name in the world of furniture, garnering recognition
            for its commitment to preserving traditional techniques
            while incorporating innovative design elements.
          </p>
          <p>
            With each piece, R. W. Winfield & Co carries forward a
            legacy of artistry, providing customers with timeless
            and remarkable furnishings that stand the test of time.
          </p>

          <h4>Mercier Frères</h4>
          <p>
            Mercier Frères is a distinguished company renowned for
            its exquisite craftsmanship in the realm of luxury goods
            and accessories. Established in France by André Mercier
            in 1828, Mercier Frères has a long-standing heritage
            which exemplifies a commitment to artistry and
            refinement.
          </p>
          <p>
            The allure of Mercier Frères antique beds lies not only
            in their visual appeal but also in their exceptional
            quality and durability. These beds have withstood the
            test of time.
          </p>
          <p>
            Owning a Mercier Frères antique bed is to possess a
            cherished piece of history, a luxurious sanctuary that
            transcends time.
          </p>

          <h4>James Schoolbred</h4>
          <p>
            James (or Jas) Shoolbred was a prominent British
            furniture manufacturer and retailer known for its
            exquisite craftsmanship and high-quality furnishings.
          </p>
          <p>
            Founded in the mid-19th century, the company quickly
            gained recognition for its exceptional designs and
            attention to detail. Although the original Jas Shoolbred
            company ceased operations in the mid-20th century, their
            name and designs continue to be revered by collectors
            and enthusiasts of antique and vintage furniture.
          </p>
          <p>
            Jas Shoolbred pieces are sought after for their timeless
            beauty, superior craftsmanship, and historical
            significance, making them highly coveted additions to
            any discerning collector's home.
          </p>

          <h4>Maison Krieger</h4>
          <p>
            Maison Krieger, a renowned French furniture manufacturer
            and retailer, flourished during the 19th and early 20th
            centuries. Established by Antoine Krieger in Paris
            during the mid-19th century
          </p>
          <p>
            A distinguishing feature of Maison Krieger was their
            ability to seamlessly blend different design styles. The
            company adeptly merged elements from neoclassical,
            Empire, and Art Nouveau periods, resulting in unique and
            harmonious furniture that appealed to a diverse range of
            tastes.
            <br />
            This fusion of styles contributed to Maison Krieger's
            reputation for innovative and visionary design.
          </p>
        </>
      </MainBlock>
    </>
  )
}
