import { Gmap } from '@raiz/react'
import { Button, EmailLink, TelLink } from '@components'
import config from '@config'
import _mapJson from './gmap.json'
import mapStyle from './style/grey.json'
import * as styles from './styles.scss'

export default (props) => {
    const {
        company,
        email,
        streetAddress,
        postcode,
        tel,
        openingHours,
        facebookLink,
        instagramLink,
    } = config()
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const mapJson = _mapJson as Record<string, any>
    mapJson.mapOptions.styles = mapStyle
    mapJson.id = 'location-map'
    mapJson.className = 'viewport'
    mapJson.markers[0].title = company // runtime config not buildtime

    return (
        <>
            <Gmap {...mapJson} {...props} className="viewport" />

            <div className={styles.contactDetails}>
                <h1>Contact</h1>
                <p>
                    Located just to the SW of Bristol
                    <br /> we are easily reached via the M5 motorway.
                </p>
                <hr />
                <p>
                    {streetAddress}
                    <br />
                    {postcode}
                </p>
                <p>
                    {openingHours?.join('<br />')}
                    <br />
                    Saturday by arrangement - please do contact us to arrange a
                    visit on a Saturday.
                </p>
                <hr />
                <p>
                    <TelLink>
                        t:
                        {tel}
                    </TelLink>
                    <br />
                    <EmailLink>
                        e:
                        {email}
                    </EmailLink>
                </p>
                <p>
                    <Button
                        href={facebookLink}
                        data-jsx="button"
                        icon="facebook"
                        label="facebook page"
                        viewbox="0 0 32 32"
                    ></Button>
                    <Button
                        href={instagramLink}
                        data-jsx="button"
                        icon="instagram"
                        label="instagram page"
                        viewbox="0 0 32 32"
                    ></Button>
                </p>
            </div>
        </>
    )
}
