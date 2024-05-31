import { Link } from '@raiz/nuggins'
import { getSiteLink } from '@lib'

export const EmailLink = () => <Link {...getSiteLink('email')} />
export const TelLink = () => <Link {...getSiteLink('tel')} />
