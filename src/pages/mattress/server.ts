import { organizationJsonLd, createAbsoluteUrl, createOgUrl } from '@server'
import { email } from '@server/config'
import { bases } from './utils/bases'
import { KELCOL_LINK } from './utils/constants'
import { kelcolTiles } from './utils/kelcol'

const sizes
    = '2\'6"/75cm, 3\'0"/90cm, 4\'0"/120cm, 4\'6"/135cm, 5\'0"/150cm, 5\'6"/165cm, 6\'0"/180cm'.split(
      ',',
    )
let tilesHusaByeHtml = ''

;[...kelcolTiles, ...bases].map((tile) => {
  const { alt, details, title, prices, name, make, slug, noImage } = tile

  let rowsHtml = ''
  prices.map((str, i) => {
    rowsHtml += `<tr><td>${sizes[i]}</td><td>${str}</td></tr>`
  })
  rowsHtml += `<tr><td>Manufacturer</td><td>${make}</td></tr>`
  const img = noImage
    ? '<div></div>'
    : `<img alt="${alt}" ratio="130" src="/image/mattress/${slug}/${name},t_mattress.jpg" />`
  tilesHusaByeHtml += `
    <div class="tile">
        ${img}
        <div class="mattress-stats">
            <h2>${title}</h2>
            <table>${rowsHtml}</table>
            ${details}
        </div>
    </div>`
})

const content = `
<div class="mattress-grid">
  ${tilesHusaByeHtml}
</div>

<div class="copy">
<div class="flex flex-text">
     <h1 class="flex__col--full">Mattresses & Bases</h1>
    <div class="flex__col">
        <p>
        Mattresses can be bought with our beds or separately, with direct
        to customer delivery from the manufacturer.
        Our Sleepwell mattresses are hand made in England by ${KELCOL_LINK}, in Yorkshire
        </p>
        <p>
        Mattresses are available in all comfort choices. Please
        see individual specifications for full details.
        </p>
        <p>
        If you are looking for a spring count not listed, or a comfort
        feel not mentioned, please enquire as ${KELCOL_LINK} make a wider
        range than we stock.
        </p>
        <h2>Bases</h2>
        <p>
        Correct support is critical for a comfortable night's sleep.
        That's why Bedsteads bases are designed to span the side rails
        of the frame - be they metal or wood.
        </p>
        <p>
        We also offer a choice of bases, as they
        perform differently in conjunction with the mattress type.
        </p>
        <p>
        All our bases are fully upholstered in cream damask or black
        and white stripped ticking. They are upholstered to match the
        mattress fabric when bought in conjunction with a mattress.
        </p>
        <p>
        We can supply bases for your antique bed in
        any unusual size or shape. Please email
        <a href="mailto:${email}"> ${email}</a>  for a quote.
        </p>
    </div>

    <div class="flex__col">
        <h2>Firm edge bases</h2>
        <p>
        Firm edge bases are manufactured with traditional cone spring and
        webbing construction to give a spring top with firm edges.
        </p>
        <p>
        They are available in any depth, 2" (5cm) & 4" (10cm) being the most popular.
        </p>
        <h2>Platform bases</h2>
        <p>
        Platform bases are supplied with pegboard breather tops for
        strength and hygiene. They are available in any depth, 2" (5cm)
        & 4" (10cm) being the most popular.
        </p>
        <h2>Slatted bases</h2>
        <p>
        Pine slats Free of Charge when bought with one of our beds. Slats
        for customers own bed POA choice of timbers possible.
        </p>
    </div>
</div>
</div>`

export default async ({ response, request }) => {
  const title
        = 'Mattresses - British Made mattress renowned worldwide for quality and comfort, and handmade bed bases'
  const description = 'Large range of antique beds, French beds, iron Beds & antique furniture. 100s of antique beds on show at our Somerset showroom, South West of Bristol'
  response
    .setRobots('index,follow')
    .setData({ content })
    .setJsonLd(organizationJsonLd)
    .setTitle(title)
    .setDescription(description)
    .setOg({
      type: 'article',
      title,
      description,
      url: createAbsoluteUrl(request.pathname),
      site_name: 'Bedsteads',
      image: createOgUrl('mattress'),
    }) // min 200 x 200 px
}
