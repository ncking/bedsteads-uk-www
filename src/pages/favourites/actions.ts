import { findFavourites } from '@server/repo/stock'

export const getFavourites = async ({ ids }) => {
  const favourites = await findFavourites(ids || [])
  return { favourites }
}
