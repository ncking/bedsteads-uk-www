import { cx } from '@raiz/browser'
import { loadChunk, Overlay } from '@raiz/nuggins'
import { Button } from '@components'
import * as styles from './style.scss'

export const ContactButton = ({ item, ...rest }) => {
  const handleClick = async () => {
    const ContactForm = await loadChunk('form')
    ContactForm
    && Overlay.show(<ContactForm item={item} />, {
      className: styles.overlay,
      close: 'esc',
    })
  }

  return (
    <Button
      {...rest}
      icon="contact"
      viewbox="0 -960 960 960"
      className={cx(styles.btn)}
      onClick={handleClick}
      hoverStyle={false}
    />
  )
}
