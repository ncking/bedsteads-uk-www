import * as styles from './style.scss'

const ErrorPage = (props) => {
  // !!NOT from current request as we my have code triggered errors

  const { response } = props
  const { status } = response || {} // @NK we need the Object fallback ... sometimes this is NULL??
  let copy = ''
  let message = ''

  if (200 !== status) {
    // its a Response Error
    if (404 === status) {
      message = '404: Page not Found'
    }
    else {
      message = '500: Server error'
    }
  }
  else {
    message = 'Page not available'
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

export default ErrorPage
