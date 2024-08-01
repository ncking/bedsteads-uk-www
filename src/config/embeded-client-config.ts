import { getGlobalStore } from '@raiz/nuggins'
export default () => getGlobalStore().config as Record<
  string, any

>
