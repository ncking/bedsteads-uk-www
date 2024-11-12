import { ImageSetLazy } from '@raiz/react'
import config from '@config'

export const BedsteadsImage = ({ src, ...rest }) => (
  <ImageSetLazy
    setSizes={config().screenBreaks as number[]}
    src={src}
    {...rest}
  />
)
