import * as styles from './style.scss'

/**
 * Error page can be thrown anywhere ...
 * We might not have the context
 *
 */
export default ({ context } = {}) => {
  const { response } = context || {}
  const { status } = response || {} // @NK we need the Object fallback ... sometimes this is NULL??
  let copy = ''
  let message = ''

  if (status && (200 !== status)) {
    if (404 === status) {
      message = '404: Page not Found'
    }
    else {
      message = '500: Server error'
    }
  }
  else {
    message = 'Browser error'
    copy = 'Something went wrong while displaying this webpage.'
  }

  return (
    <div className={styles.error}>
      <div className="columns copy">
        <div className={styles.message}>
          <h1>{message}</h1>
          <p>{copy}</p>
        </div>
      </div>
    </div>
  )
}
