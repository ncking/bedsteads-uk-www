import { Link } from '@raiz/nuggins'
import { Html as RzHtml, Image } from '@raiz/react'
import { BedsteadsImage, Button } from '@components'

const componentMap = {
  a: Link,
  img: Image,
  img2: BedsteadsImage,
  button: Button,
}

export const Html = props => <RzHtml {...props} componentMap={componentMap} />
