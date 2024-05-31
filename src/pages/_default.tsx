import { Link } from '@raiz/nuggins'
import { Html, Image } from '@raiz/react'
import { BedsteadsImage, Button } from '@components'

const defaultMap = {
  a: Link,
  img: Image,
  img2: BedsteadsImage,
  button: Button,
}

export default ({ componentMap = {}, content, ...rest }) => (
  <Html {...rest} componentMap={{ ...defaultMap, ...componentMap }}>
    {content}
  </Html>
)
