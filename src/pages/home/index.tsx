import { cx } from '@raiz/browser'
import { BedsteadsImage, Intro, MainBlock } from '@components'
import * as styles from './style.scss'

export default () => {
    return (
        <>
            <BedsteadsImage
                alt="Reflection of Bedsteads delivery van, in bed knob"
                lazy="false"
                tag="div"
                className="viewport"
                responsive={true}
                src="/image/index/cover,t_viewport.jpg"
                setSizeMin={1}
            >
                <Intro className={cx('logotype', styles.intro)}>
                    Bedsteads
                </Intro>
            </BedsteadsImage>

            <MainBlock title="Welcome to Bedsteads">
                <>
                    <p>
                        For a wide selection of antique beds and furniture,
                        visit Bedsteads at their showroom located in Chelvey
                        Court Barn, a picturesque medieval stone barn on the
                        outskirts of Bristol. <br />
                        The Ashton family has been running the business for over
                        30 years. Founded by Mark and Nikki Ashton, it is now
                        managed by their son Bill, who has worked alongside his
                        parents since leaving school, and his wife Rose. <br />
                        Mark and Nikki continue to provide support to the
                        business.
                    </p>
                    <p>
                        The team of skilled craftsmen at Bedsteads has been
                        sourcing, restoring, and recreating antique beds and
                        bedroom furniture for over three decades, preserving
                        beautiful pieces of history and creating heirlooms for
                        the future.
                    </p>
                    <p>
                        Our unique pieces have been sourced from all over the
                        UK, France, Spain, Portugal, Ireland and beyond, so
                        there is a vast array from simple all iron to opulent
                        brass & iron, beautiful fruitwood beds, bedroom suits
                        and upholstered beds in all sizes.
                    </p>
                    <p>
                        Our showroom has a broader selection of beds and antique
                        furniture including chests, Antique Tables, chairs and
                        armoires in painted and original finishes along with
                        other types and styles of bedroom furniture.
                    </p>
                    <p>
                        National and International collection and delivery can
                        be arranged, please do contact us for delivery
                        quotation.
                    </p>
                </>

                <>
                    <h2> Our fabulous team and skills</h2>
                    <p>
                        As a family business, we have a small and incredibly
                        talented team of craftspeople with a wide range of
                        expertise and over 30 years’ experience. We are truly
                        lucky to have such a creative, passionate, enthusiastic
                        and capable team. If you can’t find something you are
                        looking for, we are more than happy to work with our
                        customers and create something bespoke using your
                        sketches and ideas.
                    </p>
                    <p>
                        We have established high quality restoration,
                        conservation and repair services along with bespoke
                        furniture making; so, if you need a piece restoring,
                        copying, designing or making in iron, brass or wood we
                        will be happy to advise & quote.
                    </p>
                    <p>
                        We are also able to seamlessly lengthen any type of bed,
                        and widen metal bed frames, our restoration process is
                        sympathetic and respectful to honour and respect the
                        past life of the item.
                    </p>
                </>
            </MainBlock>
        </>
    )
}
