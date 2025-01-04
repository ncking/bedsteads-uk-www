let open = false
const menu = (newState) => {
    open = !!newState
    if (open) {
        document.body.setAttribute('data-nav', '')
    } else {
        document.body.removeAttribute('data-nav')
    }
}

export const burgerClose = () => menu(false)
export const burgerToggle = () => menu(!open)
