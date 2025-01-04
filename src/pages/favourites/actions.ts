import { findFavourites as _findFavourites } from '@server/repo/stock'

export const findFavourites = async ({ ids }) => {
    const favourites = await _findFavourites(ids || [])
    return { favourites }
}
