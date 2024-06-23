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
        src="/image/page/spanners,t_viewport.jpg"
      >
        <div className={cx(styles.title, 'logotype')}>Bedsteads</div>
      </BedsteadsImage>

      <div className="flex flex-text">
        <h1 className="flex__col--full">Welcome to Bedsteads</h1>
        <div className="flex__col">
       
      

        2nd Section: ‘Terms of service, Sustainability & Returns’

Terms of Service and Sustainability:

We take great pride in restoring and refurbishing our beds and bedroom furniture and would be happy to own any and all of our beautiful pieces. Our sympathetic restoration honours the items past life, whilst also ensuring they are sturdy, functional and fit for purpose for their new life with you.

There may be small signs of pre-loved life which adds to the charm of purchasing items of age. 

Please be aware that all of our beds come apart, into a head board, a foot board and siderails. Bundle of slats or bed bases (which arrive folded for ease of transport and access) are separate, we ensure these are a good fit for your bed prior to sending out.  As our beds come in these sections, this allows for more manoeuvrability into your desired room e.g. headboards can be turned upside down and knobs can be removed to help get them up tighter stairwells. 

We photograph, describe and measure accurately. Please feel free to ask for further photographs if needed. Please ensure you check dimensions, and check for access into your house or room. 

We are incredibly proud of our work here at Bedsteads, our small team are sure that your items will exceed your expectations.

Why are Antiques a sustainable choice?

Buying and restoring antique furniture is an active practice of exercising sustainability. Recent studies have shown that antique items have a carbon footprint many times lower than contemporary pieces of furniture. In our experience, Antique items are made with, and restored using much higher quality materials and craftsmanship which are less commonly used in modern furniture, and when looked after, could last many lifetimes. Antiques can be refinished, resold and loved again many times over, meaning they are a conscientious choice for the environmentally friendly minded. 

Mark and Nikki have cultivated an approach to restoration where we are able to do virtually all restoration work ourselves in-house, meaning we keep our carbon footprint low by not having to transport our precious beds any further than from our work and show rooms, to your home. We use very local businesses for any work such as upholstery and powder coating as a way to support our local communities and keep our carbon footprint lower.

With our hand painted finishes, we use paint companies which are VOC free, committed to sustainability and use natural pigments to help keep impact as low as possible. 



Returns:

At Bedsteads, we have every confidence that you will be delighted with your items. However, where necessary, we offer a full refund policy. If you wish to return an item, please contact us via email or telephone within 48 hours of delivery, and we will discuss options of how to proceed.

We would expect to see the item returned to us in the same good condition as when it left us, within 14 days of purchase, using one of our trusted couriers to ensure the items safety – please note we are unable to refund courier costs for customers. 




        </div>

        <div className="flex__col">
          
        </div>
      </div>
    </>
  )
}
