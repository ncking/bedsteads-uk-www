import { ImageSetLazy } from '@raiz/react'
import config from '@config'

export const BedsteadsImage = ({ src, ...rest }) => (
  <ImageSetLazy imageSizes={config().screenBreaks} src={src} {...rest} />
)
