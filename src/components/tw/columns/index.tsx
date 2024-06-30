//@ts-nocheck
import { cx } from '@raiz/browser'
import * as styles from './styles.scss'
import './grid.global.scss'

/**
https://css-tricks.com/almanac/properties/g/grid-template-columns/#:~:text=The%20fit%2Dcontent()%20function,never%20shrinks%20beyond%20a%20minimum.

https://stackoverflow.com/questions/52417889/setting-minimum-and-maximum-number-of-columns-using-css-grid


WE want 
1. A column layout
2. Columns must be able to cope with gaps
3. columns if dont span the full row, keep a max width
4. columns wrap in response to the containers width, not the @media width
5. We can re-order

We have 3 options
1. CSS Columns (meant for text, but we can fudge)
2. Flexbox
3. Css Grid

Css Grid meets all our requirements!!!,
its not perfect

How it works?

grid-template-columns: repeat(auto-fill, minmax( (rowWidth/columncount)+'px', 1fr)) ;



So we set the *max columns for the set & mark if the number of cols
dosent  

**/

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
                page && styles.page
            )}
            {...rest}
        >
            {children}
        </div>
    )
}

export const Column = ({ className = '', children }) => (
    // SPAN only works with a responsive size ... as the NUMBER OF COLUMNS CHANGE!!!
    <div className={cx(styles.column,  className)}>{children}</div>
)




export const TextBlock = (props) => <div className={cx(styles.textBlock)} {...props}></div>



export const H1 = ({children}) =>   <Column className={cx('col-span-full', styles.h1)}><TextBlock><h1>{children}</h1></TextBlock></Column>