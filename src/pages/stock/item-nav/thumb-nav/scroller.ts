import { dragger } from '@raiz/browser'
const bounceDeceleration = 0.04
const bounceAcceleration = 0.11
const dragOutOfBoundsMultiplier = (val) => {
  return 0.000005 * Math.pow(val, 2) + 0.0001 * val + 0.55
}

interface Props {
  el: HTMLElement
  updateCallback: CallableFunction
  initialX: number
  boundX: [number, number]
  friction?: number
}

export const scroller = ({
  el,
  boundX,
  updateCallback,
  friction = 0.92,
  initialX = 0,
}: Props) => {
  let _targetX = initialX
  let _decVelX
  let _dragLocked = false
  let _decelerating = false
  const af = requestAnimationFrame
  const _draggerDestroy = dragger({ el, onMove, onUp })
  let [boundXmin, boundXmax] = boundX

  function onMove({ delta }) {
    if (!_dragLocked) {
      af(() => {
        _targetX += delta

        // the bounce
        const [adjustByXtoPutInbounds] = checkBounds()
        if (adjustByXtoPutInbounds !== 0) {
          _targetX
                        += delta
                          * dragOutOfBoundsMultiplier(adjustByXtoPutInbounds)
        }
        updateCallback(_targetX)
        _dragLocked = false
      })
    }

    _dragLocked = true
  }

  function onUp({ decVelocity }) {
    _decVelX = decVelocity
    const [, isInBounds] = checkBounds()
    if (Math.abs(_decVelX) > 1 || !isInBounds) {
      _decelerating = true
      af(stepDecelAnim)
    }
  }

  function checkBounds(): [number, boolean] {
    let xDiff = 0
    if (boundXmin !== undefined && _targetX < boundXmin) {
      xDiff = boundXmin - _targetX
    }
    else if (boundXmax !== undefined && _targetX > boundXmax) {
      xDiff = boundXmax - _targetX
    }
    return [xDiff, xDiff === 0]
  }

  /**
     * Animates values slowing down
     */
  function stepDecelAnim() {
    if (!_decelerating) {
      return
    }
    _decVelX *= friction // nigel we can adjust our decVelx to our snap points ... ie use inital calc to get _decVelX .. tehn get closest snap & recalc ....
    _targetX += _decVelX

    if (!Math.round(_targetX)) {
      _targetX = 0
      updateCallback(_targetX)
      _decelerating = false
    }
    const [outOfBoundsX, isInBounds] = checkBounds()
    if (Math.abs(_decVelX) > 1 || !isInBounds) {
      // so if NOT in bounds or the decVelocity is les than 1 ... stop animating
      const reboundAdjust = 2.5
      /// ////////////// BOUNCE, we just flip the decVelx to the other direction
      if (outOfBoundsX !== 0) {
        if (outOfBoundsX * _decVelX <= 0) {
          _decVelX += outOfBoundsX * bounceDeceleration
        }
        else {
          const adjust
                        = outOfBoundsX > 0 ? reboundAdjust : -reboundAdjust
          _decVelX = (outOfBoundsX + adjust) * bounceAcceleration
        }
      }
      updateCallback(_targetX)
      af(stepDecelAnim)
    }
    else {
      _decelerating = false
    }
  }

  updateCallback(_targetX)

  /**
     * In edge cases where you may need to
     * reinstanciate Impetus on the same sourceEl
     * this will remove the previous event listeners
     */
  return {
    destroy() {
      _draggerDestroy()
    },
    setBoundX(bounds) {
      ;[boundXmin, boundXmax] = bounds
    },
    move(x = 0) {
      _decVelX = x
      _decelerating = true
      af(stepDecelAnim)
    },
  }
}
