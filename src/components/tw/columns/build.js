import { writeFileSync } from 'node:fs'

const snippet = `

/**
 *  ORDER
 */

.order-1 {
    order: 1
}
.order-2 {
    order: 2
}
.order-3 {
    order: 3
}


/**
 * OFFSET
 */

.col-start-1 {
    grid-column-start: 1
}
.col-start-2 {
    grid-column-start: 2
}
.col-start-3 {
    grid-column-start: 3
}
.col-start-4 {
    grid-column-start: 4
}
.col-start-6 {
    grid-column-start: 6
}


/**
 * SPAN
 * 
 */



.col-span-1 {
    grid-column: span 1 / span 1;
}
.col-span-2 {
    grid-column: span 2 / span 2;
}
.col-span-3 {
    grid-column: span 3 / span 3;
}
.col-span-4 {
    grid-column: span 4 / span 4;
}
.col-span-5 {
    grid-column: span 5 / span 5;
}
.col-span-6 {
    grid-column: span 6 / span 6;
}
.col-span-7 {
    grid-column: span 7 / span 7;
}
.col-span-8 {
    grid-column: span 8 / span 8;
}
.col-span-9 {
    grid-column: span 9 / span 9;
}
.col-span-10 {
    grid-column: span 10 / span 10;
}
.col-span-11 {
    grid-column: span 11 / span 11;
}

.col-span-12 {
    grid-column: span 12 / span 12;
}



/**
 * The number of columns in this grid,
 * if the columns dont have any span sets ... this works naturally
 * 
 * If you need colum positioning, dont use this but add classes to specific columns
 */
.cols-1 {
    --columns: 1;
}
.cols-2 {
    --columns: 2;
}
.cols-3 {
    --columns: 3;
}
.cols-4 {
    --columns: 4;
}
.cols-6 {
    --columns: 6;
}
.cols-12 {
    --columns: 12;
}
`

const sizes = ['sm', 'md', 'lg', 'xl', 'xxl']
/*
2xl ... is NOT avlid class name https://www.w3.org/TR/CSS21/syndata.html#:~:text=In%20CSS%2C%20identifiers%20(including%20element,hyphen%20followed%20by%20a%20digit.

&& here
https://github.com/sass/sass/issues/2956

Just bail & use xxl , or if were got many more xl2,xl3
*/

const lines = [
  `

:root{
    --columns: 12;
    --columns-6: 6;
}


.cols {
    display: grid;
    grid-gap: var(--gap);
    position: relative; // @NK dont remove this
    // WE dont need this & messes up a added padding, without border-box width: 100%;
    box-sizing: border-box;
    grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
}

.cols-subgrid {
    display:grid;
    // ??? what are we trying to do here ??? grid-template-columns: subgrid;
}

.col-span-full {
    grid-column: 1/-1; //https://stackoverflow.com/questions/47319464/make-a-grid-column-span-the-entire-row
}


.hidden{
    display:none
}
`,
  snippet,
] /// for the base mobile sizes
sizes.map((size) => {
  const line = `@include min(${size}){
        ${snippet.replaceAll('.', `.${size}\\:`)}
    }`
  lines.push(line)
})

const str = lines.join('\n')
writeFileSync('./grid.global.scss', str)
