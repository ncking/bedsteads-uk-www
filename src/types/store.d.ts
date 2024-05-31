export interface Route {
  component: CallableFunction
  params: object
  isGrid: boolean
  name: string
}
export interface RouteRegex extends Route {
  regex: RegExp
}

export type RouteMap = {
  [P in string]: Route
}

export type StockInfo = [string, string]

export type StockInfoArray = StockInfo[]

export interface Image {
  src: string
  r: number
}

export interface StockItem {
  id: number
  images: Image[]
  category: string
  title: string
  slug: string
  url: string
  description: string
  info: StockInfoArray
  status: string
  size?: string
  isFurniture?: boolean
  onBeforeClick?: CallableFunction
}

export type StockArray = StockItem[]
