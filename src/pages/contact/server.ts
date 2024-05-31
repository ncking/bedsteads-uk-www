import {
  company,
  email,
  streetAddress,
  postcode,
  tel,
  openingHours,
  facebookLink,
  instagramLink,
} from '@server/config'
import { organizationJsonLd, createAbsoluteUrl, createOgUrl } from '@server/lib'

const content = `
    <div data-jsx="gmap" class="viewport"></div>
    <div class="contact-details">
        <h1>Contact</h1>
        <p>
            Located just to the SW of Bristol<br> we are easily reached via the M5 motorway.
        </p>
        <hr />
        <p>
            ${streetAddress}<br />
            ${postcode}
        </p>
        <p>
            ${openingHours.join('<br />')}<br/>
            Saturday by arrangement - please do contact us to arrange a visit on a Saturday. 
        </p>
        <hr />
        <p>
            <a href="tel:${tel}">t: ${tel}</a>
            <br />
            <a href="mailto:${email}">e: ${email}</a>
        </p>
        <p>
            <a href="${facebookLink}" data-jsx="button" icon="facebook" label="facebook page"   viewbox = '0 0 32 32'></a>
            <a href="${instagramLink}" data-jsx="button" icon="instagram" label="instagram page"   viewbox = '0 0 32 32'></a>
        </p>
    </div>`

export default async ({ request, response }) => {
  const title = `Contact ${company} | Location | Hours of business | Sales and Services, Contact us`
  const description = `tel: ${tel} email: ${email}. Located just to the SW of Bristol we are easily reached via the M5 motorway. address: ${streetAddress} ${postcode}`

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
      image: createOgUrl('contact'),
    }) // min 200 x 200 px
}
