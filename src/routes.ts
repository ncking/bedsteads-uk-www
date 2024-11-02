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
    },
    {
        url: '/faq',
        page: 'faq',
        id: 'faq',
    },

    {
        url: '/sustainability',
        page: 'sustainability',
        id: 'sustainability',
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
        page: 'stock-grid',
        id: 'antique',
        meta: { title: 'antique beds', label: 'antique beds' },
        params: { category: 'antique' },
    },
    {
        url: '/superking',
        page: 'stock-grid',
        id: 'superking',
        meta: { title: 'superking', label: 'superking beds' },
        params: { category: 'antique', size: 'superking' },
    },
    {
        url: '/kingsize',
        page: 'stock-grid',
        id: 'kingsize',
        meta: { title: 'kingsize', label: 'kingsize beds' },
        params: { category: 'antique', size: 'kingsize' },
    },
    {
        url: '/double',
        page: 'stock-grid',
        id: 'double',
        meta: { title: 'double', label: 'double beds' },
        params: { category: 'antique', size: 'double' },
    },
    {
        url: '/single',
        page: 'stock-grid',
        id: 'single',
        meta: { title: 'single', label: 'single beds' },
        params: { category: 'antique', size: 'single' },
    },
    {
        url: '/furniture',
        page: 'stock-grid',
        id: 'furniture',
        meta: { title: 'antique furniture', label: 'furniture' },
        params: { category: 'furniture' },
    },
    {
        url: '/reproduction',
        page: 'stock-grid',
        id: 'reproduction',
        meta: { title: 'reproduction beds', label: 'reproduction beds' },
        params: { category: 'reproduction' },
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
