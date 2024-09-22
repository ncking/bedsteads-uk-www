let open = false
const menu = (newState) => {
  open = !!newState
  open
    ? document.body.setAttribute('data-nav', '')
    : document.body.removeAttribute('data-nav')
}

export const burgerClose = () => menu(false)
export const burgerToggle = () => menu(!open)
