import React, { FC } from 'react'
import { cx } from '@raiz/browser'
import { Link } from '@raiz/nuggins'
import { Icon } from '../icon'
import * as style from './style.scss'

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLElement> | undefined
  icon?: string
  href?: string
  url?: string
  label?: string
  ariaLabel?: string
  iconClass?: string
  disabled?: boolean | undefined
  className?: string
  children?: React.ReactNode
  rotate?: number
  viewbox?: string
  hoverStyle?: boolean
}
export const Button: FC<ButtonProps> = ({
  onClick,
  icon,
  href,
  url = href,
  label,
  ariaLabel = label,
  iconClass = '',
  disabled = undefined,
  className = '',
  children,
  viewbox,
  hoverStyle = true,
}) => {
  const iconFC = icon
    ? (
      <span className={style.iconWrap}>
        <Icon id={icon} className={iconClass} viewbox={viewbox} />
      </span>
      )
    : null

  const attr = {
    disabled,
    className: cx(style.buttonIcon, className, hoverStyle && style.hover),
  }

  if (url) {
    return (
      <Link href={url} {...attr} ariaLabel={ariaLabel}>
        {iconFC}
        {children}
      </Link>
    )
  }
  return (
    <button
      onClick={onClick}
      {...attr}
      aria-label={ariaLabel}
      // will trigger an HTML validator warning ... its not nessary .. role="button"
    >
      {iconFC}
      {children}
    </button>
  )
}
