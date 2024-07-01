import { cx } from '@raiz/browser'
import { BedsteadsImage, Intro, Columns, Column, EmailLink, H1, TextBlock, Html, MainBlock } from '@components'
import * as styles from './style.scss'
import { Link } from '@raiz/nuggins'
const KELCOL_LINK = <Link href="https://kelcol.co.uk">Kelcol</Link>


export default ({ content }) => {

    return (
        <>
            <div className={styles.grid}>
                <Html>{content}</Html>
            </div>

            <MainBlock title="Mattresses & Bases">
                <>
                    <p>
                        Mattresses can be bought with our beds or separately, with direct
                        to customer delivery from the manufacturer.
                        Our Sleepwell mattresses are hand made in England by ${KELCOL_LINK}, in Yorkshire
                    </p>
                    <p>
                        Mattresses are available in all comfort choices. Please
                        see individual specifications for full details.
                    </p>
                    <p>
                        If you are looking for a spring count not listed, or a comfort
                        feel not mentioned, please enquire as ${KELCOL_LINK} make a wider
                        range than we stock.
                    </p>
                    <h2>Bases</h2>
                    <p>
                        Correct support is critical for a comfortable night's sleep.
                        That's why Bedsteads bases are designed to span the side rails
                        of the frame - be they metal or wood.
                    </p>
                    <p>
                        We also offer a choice of bases, as they
                        perform differently in conjunction with the mattress type.
                    </p>
                    <p>
                        All our bases are fully upholstered in cream damask or black
                        and white stripped ticking. They are upholstered to match the
                        mattress fabric when bought in conjunction with a mattress.
                    </p>
                    <p>
                        We can supply bases for your antique bed in
                        any unusual size or shape. Please email
                        <EmailLink />  for a quote.
                    </p>
                </>

                <>
                    <h2>Firm edge bases</h2>
                    <p>
                        Firm edge bases are manufactured with traditional cone spring and
                        webbing construction to give a spring top with firm edges.
                    </p>
                    <p>
                        They are available in any depth, 2" (5cm) & 4" (10cm) being the most popular.
                    </p>
                    <h2>Platform bases</h2>
                    <p>
                        Platform bases are supplied with pegboard breather tops for
                        strength and hygiene. They are available in any depth, 2" (5cm)
                        & 4" (10cm) being the most popular.
                    </p>
                    <h2>Slatted bases</h2>
                    <p>
                        Pine slats Free of Charge when bought with one of our beds. Slats
                        for customers own bed POA choice of timbers possible.
                    </p>
                </>
            </MainBlock>
        </>)

}