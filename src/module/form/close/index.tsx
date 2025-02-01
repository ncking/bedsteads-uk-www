import { Overlay } from '@raiz/nuggins'
import { Button } from '@components'
import * as style from './close.scss'
export const CloseBtn = () => (
  <Button
    className={style.btn}
    onClick={() => Overlay.close()}
    icon="close"
  >
  </Button>
)
