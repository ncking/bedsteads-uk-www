import { createAbsoluteUrl } from '@server'

export const getCanonical = (model) => {
  const { category, slug, id } = model
  const filter = 'furniture reproduction'.includes(category)
    ? category
    : 'antique'
  return createAbsoluteUrl(makeItemPathname({ filter, id, slug }))
}

export const createItemLinkForFilter = (
  model,
  { size: filterSize, category: filterCategory },
) => {
  const { category: modelCategory, size: modelSize, id, slug } = model
  if (modelCategory === 'furniture') {
    if ('furniture' !== filterCategory) {
      return false
    }
  }
  else if (filterSize) {
    if (filterSize !== modelSize) {
      return false
    }
  }
  else {
    if (modelCategory !== filterCategory) {
      return false
    }
  }
  return makeItemPathname({ filter: filterCategory || filterSize, id, slug })
}

const makeItemPathname = ({ filter, slug, id }) => `/${filter}/${slug}_${id}`
