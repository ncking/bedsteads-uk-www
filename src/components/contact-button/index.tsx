import { cx } from '@raiz/browser'
import { loadChunk, Overlay } from '@raiz/nuggins'
import { Button } from '@components'
import { stockStore } from '@store'
import * as styles from './style.scss'

export const ContactButton = ({ children, id }) => {
  const handleClick = async () => {
    const exprts = await loadChunk('form')
    const ContactForm = exprts.default
    if (ContactForm) {
      Overlay.show(<ContactForm item={stockStore.getItemById(id)} />, {
        className: styles.overlay,
        close: 'esc',
      })
    }
  }

  return (
    <Button
      children={children}
      icon="contact"
      viewbox="0 -960 960 960"
      className={cx(styles.btn)}
      onClick={handleClick}
      hoverStyle={false}
    />
  )
}
