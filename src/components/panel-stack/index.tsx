import { useState, useEffect } from 'react'
import { chainTimeouts } from '@raiz/browser'
import { useIsMounted } from '@raiz/react'
import './style.scss'

/**
 * It works fine by *always having the trans panels in place ....
 * But trying to minimize the <div> nesting for SEO, & all this nesting makes
 * positioning some elms harder ...
 *
 * Also **only rendering the 'active' card ... means we dont need to worry about
 * delaying the render of the other layers ...
 */
let lastActive: boolean | string = 'init'
export const PanelStack = ({ active = false, children }) => {
    const [, setStep] = useState(active ? 'on' : 'off')
    const isMounted = useIsMounted()

    useEffect(() => {
        if (lastActive !== 'init') {
            /**
             * SO we need to replace CSS with transition styles ...
             * 1. set the inline style pos & cause reflow...
             * 2. then add the class opening/closing
             * 3. add the final class open/closed
             */
            if (active) {
                // const clss = ['init', 'opening', 'on']
            } else {
                const clss = ['closing-init', 'closing', 'off']
                chainTimeouts(
                    [100, 500, 500],
                    (i) => isMounted() && setStep(clss[i]),
                )
            }
        }
        lastActive = active
    }, [active, isMounted])

    return children[active ? 1 : 0]
}
