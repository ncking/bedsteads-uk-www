import { useEffect, useState, useRef } from 'react'
import {
  addWindowResize,
  getOffsetAbsolute,
  cx,
  setScroll,
} from '@raiz/browser'
import { Image, useIsMounted } from '@raiz/react'
import { getThumbSrc, getGalleryId, itemAnalyics } from '@lib'
import { scroller } from './scroller'
import * as styles from './thumbs.scss'

const thumbClicked = (i) => {
  const { top } = getOffsetAbsolute(`#${getGalleryId(i)}`)
  const headerOffset = document.querySelector('header')?.clientHeight || 0
  setScroll(top - headerOffset, 'smooth')
  itemAnalyics('thumb select')
}

export const ThumbNav = ({ images = [], id }) => {
  const elRef = useRef<HTMLInputElement>(null)
  const [sliderStyle, setStyle] = useState({})
  const isMounted = useIsMounted()

  useEffect(() => {
    let _scroller

    const rezizeFn = () => {
      const wrapEl = elRef.current as HTMLElement

      const wrapWidth = (wrapEl.parentNode as HTMLElement).offsetWidth
      const thumbsWidth = wrapEl.offsetWidth
      if (_scroller) _scroller?.destroy()

      _scroller = scroller({
        el: wrapEl,
        updateCallback: x =>
          isMounted()
          && setStyle({
            transform: `translate3d(${-1 * x}px, 0px, 0px)`,
          }),
        initialX: -100,
        boundX: [0, Math.ceil(thumbsWidth - wrapWidth)],
      })
      _scroller.move(0)
    }

    const unbindResize = addWindowResize(rezizeFn, { leading: true })
    return () => {
      if (_scroller) _scroller?.destroy()
      _scroller = null
      unbindResize()
    }
  }, [isMounted])

  return (
    <div className={styles.itemThumbs}>
      <div className={styles.slider} ref={elRef}>
        <div
          className={styles.thumbs}
          style={sliderStyle}
          data-testid="thumbs"
        >
          {images.map(({ src, r }, i) => {
            const isPortrait = r > 90
            return (
              <Image
                src={getThumbSrc({
                  id,
                  src,
                  r,
                })}
                alt={`thumbnail - photo angle #${i}`}
                ratio="fill"
                tag="button"
                key={src}
                type="button"
                className={cx(
                  styles.thumb,
                  isPortrait ? styles.portraitThumb : null,
                )}
                aria-label={`Go to photo ${i + 1}`}
                onClick={() => thumbClicked(i)}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
