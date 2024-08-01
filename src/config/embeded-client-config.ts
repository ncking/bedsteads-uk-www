import { getGlobalStore } from '@raiz/nuggins'
/* eslint-disable  @typescript-eslint/no-explicit-any */
export default () => getGlobalStore().config as Record< string, any>
