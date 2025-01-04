import { Link, getPathname } from '@raiz/nuggins'
import { Button, FavouriteBtnTotal } from '@components'
import config from '@config'
import { getSiteLink } from '@lib'
import * as logoStyles from './logo.scss'
import * as stylesMenu from './menu.scss'
import * as styles from './sidebar.scss'

const abLinks = 'faq,sustainability,contact'

const NavLink = ({ id, noLi = false, ...rest }) => {
    const props = getSiteLink(id)
    const { url } = props
    const link = <Link {...props} {...rest} />
    if (noLi) {
        return link
    }
    return (
        <li
            className={
                getPathname().startsWith(url) ? stylesMenu.active : undefined
            }
        >
            {link}
        </li>
    )
}

export const Sidebar = () => {
    const { company } = config()
    return (
        <nav className={styles.sidebar} aria-label="Primary">
            <div className={stylesMenu.menu} aria-hidden="false">
                <div className={logoStyles.logo}>
                    <h2>
                        <Link className="logotype" href="/">
                            {company} <i>since </i>
                            <i>1992</i>
                        </Link>
                    </h2>
                </div>

                <ul>
                    {'antique,superking,kingsize,double,single'
                        .split(',')
                        .map((id) => (
                            <NavLink id={id} key={id} />
                        ))}
                </ul>

                <ul>
                    {'reproduction,furniture,mattresses'
                        .split(',')
                        .map((id) => (
                            <NavLink id={id} key={id} />
                        ))}
                </ul>

                <ul>
                    {abLinks.split(',').map((id) => (
                        <NavLink id={id} key={id} />
                    ))}
                </ul>

                <ul className={stylesMenu.contact}>
                    <NavLink id="tel"></NavLink>
                    <NavLink id="email"></NavLink>

                    <li className={stylesMenu.contactSocial}>
                        <FavouriteBtnTotal
                            href={getSiteLink('favourites').url}
                        />
                        <Button
                            label="Read more on our Facebook page"
                            href={getSiteLink('facebook').url}
                            icon="facebook"
                            viewbox="0 0 32 32"
                        />
                        <Button
                            label="See more iphotos, on our Instagram page"
                            href={getSiteLink('instagram').url}
                            icon="instagram"
                            viewbox="0 0 32 32"
                        />
                    </li>
                </ul>

                <footer className={stylesMenu.privacy}>
                    {`©${new Date().getFullYear()} ${company} . `}
                    <NavLink id="privacy" noLi={true} />
                </footer>
            </div>
        </nav>
    )
}
