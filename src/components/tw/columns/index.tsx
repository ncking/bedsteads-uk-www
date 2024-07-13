import { cx } from '@raiz/browser'
import * as styles from './styles.scss'
import './grid.global.scss'

export const Columns = ({
  className = '',
  page = false,
  children,
  columns = '',
  ...rest
}) => {
  return (
    <div
      className={cx(
        'cols',
        styles.columns,
        className,
        columns && `cols-${columns}`,
        page && styles.page,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

export const Column = ({ className = '', children }) => (
  // SPAN only works with a responsive size ... as the NUMBER OF COLUMNS CHANGE!!!
  <div className={cx(styles.column, className)}>{children}</div>
)

export const TextBlock = ({ className, ...rest }) => <div className={cx(styles.textBlock, className)} {...rest}></div>

export const H1 = ({ children, className }) => children ? <Column className={cx('col-span-full', styles.h1, className)}><TextBlock><h1>{children}</h1></TextBlock></Column> : null

export const MainBlock = ({ title = null, children, className = '', classNames = [] }) => {
  return (
    <Columns className={cx('cols-1 md:cols-2', className, styles.mainBlock)}>

      <H1 className={classNames[0]}>{title}</H1>
      <TextBlock className={[classNames[1]]}>
        {children[0]}
      </TextBlock>
      <TextBlock className={[classNames[2]]}>
        {children[1]}
      </TextBlock>
    </Columns>
  )
}
