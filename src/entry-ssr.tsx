import { initSSR } from '@raiz/nuggins'
import { Layout } from './pages/_layout'
export const render = await initSSR(Layout)
