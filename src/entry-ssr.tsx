import { initSSR } from '@raiz/nuggins/ssr'
import { Layout } from './layouts/main'
export const render = await initSSR(Layout)
