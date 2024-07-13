import { Link } from '@raiz/nuggins'
import { getSiteLink } from '@lib'

export const EmailLink = props => <Link {...getSiteLink('email')} {...props} />
export const TelLink = props => <Link {...getSiteLink('tel')} {...props} />
