import { useEffect, useState, MouseEvent, ReactNode } from 'react'
import { cx } from '@raiz/browser'
import { ClientOnly } from '@raiz/react'
import { Button } from '@components'
import { favStore } from '@store'
import * as style from './style.scss'

let lastTotal = 0
const on = 'favouriteOn'
const off = 'favouriteOff'

export const FavouriteBtnTotal = (props) => {
  const total = favStore.useStore(() => favStore.getTotal())

  useEffect(() => {
    lastTotal = total
  }, [total])

  return (
    <ClientOnly>
      <div
        key={total}
        className={cx(
          style.numberFavs,
          lastTotal !== total && style.pulse,
        )}
      >
        <Button
          className={style.favourite}
          icon={on}
          {...props}
          label="Favourite items"
        />
        {total ? <span className={style.total}>{total}</span> : null}
      </div>
    </ClientOnly>
  )
}

interface Props {
  id: number
  onClick?: (e: MouseEvent) => void
  render?: ({ label }: { label: string }) => ReactNode
  className?: string
}
export const FavouriteBtn = (props: Props) => {
  const [, trigger] = useState({})
  const { id, className, onClick, render = () => null } = props
  const isFave = favStore.isFavourite(id)

  const handleClick = () => {
    favStore.toggleId(id)
    trigger({})
  }

  const label = (isFave ? 'remove' : 'add') + ' favourites'
  return (
    <ClientOnly>
      <Button
        {...props}
        className={cx(style.favourite, className)}
        icon={isFave ? on : off}
        onClick={onClick || handleClick}
        label={label}
        hoverStyle={false}
        tag="button"
        aria-label={`${isFave ? 'remove' : 'add'} from favourites`}
      >
        {render({ label })}
      </Button>
    </ClientOnly>
  )
}
