import { initSSR } from '@raiz/nuggins'
import { Layout } from './layouts/main'
export const render = await initSSR(Layout)
