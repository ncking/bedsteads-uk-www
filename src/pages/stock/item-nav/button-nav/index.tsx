import { setScroll, KEY_LEFT, KEY_RIGHT } from '@raiz/browser'
import { useHasScrolled, KeyboardLayer } from '@raiz/react'
import { ResultCount, Button } from '@components'
import { next, prev, itemAnalyics } from '@lib'
import * as styles from './count.scss'

const args = {
  icon: 'arrow',
}

export const ButtonNav = ({ categoryLabel }) => {
  const handleKeyUp = ({ keyCode }) => {
    if (keyCode === KEY_LEFT) {
      prev()
      itemAnalyics('prev key')
    }
    else if (keyCode === KEY_RIGHT) {
      next()
      itemAnalyics('next key')
    }
  }

  return (
    <KeyboardLayer id="thumbNav" onUp={handleKeyUp}>
      <div className={styles.paginator}>
        <ResultCount className={styles.resultCount} />

        <Button
          onClick={() => (prev(), itemAnalyics('prev button'))}
          ariaLabel={`previous ${categoryLabel}`}
          className={styles.left}
          {...args}
        />
        <Button
          onClick={() => (next(), itemAnalyics('next button'))}
          ariaLabel={`next ${categoryLabel}`}
          {...args}
        />
        <Button
          disabled={!useHasScrolled({ triggerY: 200 })}
          onClick={() => (
            setScroll(0, 'smooth'), itemAnalyics('scroll top')
          )}
          ariaLabel="to top"
          className={styles.top}
          {...args}
        />
      </div>
    </KeyboardLayer>
  )
}