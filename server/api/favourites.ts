import { findFavourites } from '@server/repo/stock'

export const favourites = async ({ body }) => {
  const { ids } = body
  const favourites = await findFavourites(ids || [])
  return { favourites }
}

favourites.config = {
  url: '/favourites',
  withBody: true,
  expires: 0,
}
