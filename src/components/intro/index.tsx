import { cx } from '@raiz/browser'
import { BedsteadsImage, Columns, Column, TextBlock, H1 } from '@components'
import * as styles from './styles.scss'

export const Intro = ({ className, links = [], children }) => {
  const _links = links.map(({ hash, label }) => {
    return <li key={label}><a href={`#${hash}`}>{label}</a></li>
  })

  return (
    <div className={cx(styles.intro, className)}>


          <div className={styles.title}>{children}</div>
          {_links.length ? <ul className={styles.list}>{_links}</ul> : null}
  </div>)
}
