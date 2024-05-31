import { Link } from '@raiz/nuggins'
import { Gmap, Html } from '@raiz/react'
import { Button } from '@components'
import config from '@config'
import mapJson from './gmap.json'
import mapStyle from './style/grey.json'
import './page.contact.global.scss'

export default ({ content }) => {
  mapJson.mapOptions.styles = mapStyle
  mapJson.id = 'location-map'
  mapJson.className = 'viewport'
  mapJson.markers[0].title = config().company // runtime config not buildtime
  const componentMap = {
    a: Link,
    gmap: props => <Gmap {...mapJson} {...props} />,
    button: Button,
  }
  return <Html componentMap={componentMap}>{content}</Html>
}
