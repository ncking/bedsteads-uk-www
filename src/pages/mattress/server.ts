import { organizationJsonLd, createAbsoluteUrl, createOgUrl } from '@server'

import { bases } from './utils/bases'
import { kelcolTiles } from './utils/kelcol'

const sizes = '2\'6"/75cm, 3\'0"/90cm, 4\'0"/120cm, 4\'6"/135cm, 5\'0"/150cm, 5\'6"/165cm, 6\'0"/180cm'.split(',',)
const content = [...kelcolTiles, ...bases].map((tile) => {
  const { alt, details, title, prices, name, make, slug, noImage } = tile

  let rowsHtml = ''
  prices.map((str, i) => {
    rowsHtml += `<tr><td>${sizes[i]}</td><td>${str}</td></tr>`
  })
  rowsHtml += `<tr><td>Manufacturer</td><td>${make}</td></tr>`
  const img = noImage
    ? '<div></div>'
    : `<img alt="${alt}" ratio="130" src="/image/mattress/${slug}/${name},t_mattress.jpg" />`
  return `
    <div class="tile">
        ${img}
        <div class="mattress-stats">
            <h2>${title}</h2>
            <table>${rowsHtml}</table>
            ${details}
        </div>
    </div>`
})




export default async ({ response, request }) => {
  const title = 'Mattresses - British Made mattress renowned worldwide for quality and comfort, and handmade bed bases'
  const description = 'Large range of antique beds, French beds, iron Beds & antique furniture. 100s of antique beds on show at our Somerset showroom, South West of Bristol'
  response
    .setRobots('index,follow')
    .setData({ content: content.join('') })
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
