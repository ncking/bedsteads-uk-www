export const chunks = {
  form: 'modules/form',
}

export const routes = [
  {
    url: '/',
    page: 'home',
    id: 'home',
    meta: { title: 'home', label: 'Home page' },
  },
  {
    url: '/favourites',
    page: 'favourites',
    id: 'favourites',
    meta: { title: 'contact', label: 'Contact Bedsteads' },
  },
  {
    url: '/contact',
    page: 'contact',
    id: 'contact',
    meta: { title: 'contact', label: 'Contact Bedsteads' },
  },
  {
    url: '/privacy',
    page: 'privacy',
    id: 'privacy',
    meta: { title: 'privacy', label: 'Privacy Policy' },
  },
  {
    url: '/mattresses',
    page: 'mattress',
    id: 'mattresses',
    meta: { title: 'mattresses & bases', label: 'mattresses & bases' },
  },
  {
    url: '/antique',
    page: 'stock',
    id: 'antique',
    meta: {
      title: 'antique beds',
      label: 'antique beds',
      category: 'antique',
    },
  },
  {
    url: '/superking',
    page: 'stock',
    id: 'superking',
    meta: {
      title: 'superking',
      label: 'superking beds',
      category: 'antique',
      size: 'superking',
    },
  },
  {
    url: '/kingsize',
    page: 'stock',
    id: 'kingsize',
    meta: {
      title: 'kingsize',
      label: 'kingsize beds',
      category: 'antique',
      size: 'kingsize',
    },
  },
  {
    url: '/double',
    page: 'stock',
    id: 'double',
    meta: {
      title: 'double',
      label: 'double beds',
      category: 'antique',
      size: 'double',
    },
  },
  {
    url: '/single',
    page: 'stock',
    id: 'single',
    meta: {
      title: 'single',
      label: 'single beds',
      category: 'antique',
      size: 'single',
    },
  },
  {
    url: '/furniture',
    page: 'stock',
    id: 'furniture',
    meta: {
      title: 'antique furniture',
      label: 'furniture',
      category: 'furniture',
    },
  },
  {
    url: '/reproduction',
    page: 'stock',
    id: 'reproduction',
    meta: {
      title: 'reproduction beds',
      label: 'reproduction beds',
      category: 'reproduction',
    },
  },
  {
    url: '/(?<category>(reproduction|furniture|antique))/(?<slug>[^/]+)_(?<id>[0-9]+)',
    page: 'stock',
    id: 'item',
  },
  {
    url: '/(?<size>[^/]+)/(?<slug>[^/]+)_(?<id>[0-9]+)',
    page: 'stock',
    id: 'item',
  },
]
