export interface Route {
  component: CallableFunction
  params: object
  isGrid: boolean
  name: string
}

export type StockInfo = [string, string]

export type StockInfoArray = StockInfo[]

export interface Image {
  src: string
  r: number
}

export interface Stock {
  id: number
  images: Image[]
  category: string
  title: string
  slug: string
  url: string
  description: string
  info: StockInfoArray
  status: string
  // price number, fmt string
  price: number
  priceFmt: string
  priceWasFmt?: string
  //
  size?: string
  isRepo?: 1 | undefined
  isFurniture?: 1 | undefined
  isSale?: boolean
  onBeforeClick?: CallableFunction
  canonical?: string
}
