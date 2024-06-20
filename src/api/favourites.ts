import { findFavourites } from '@server/repo/stock'

export const find = async ({ body }) => {
  const { ids } = body
  const favourites = await findFavourites(ids || [])
  return { favourites }
}
