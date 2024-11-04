import { registerRoute } from 'workbox-routing';
import {
    //NetworkFirst,
    StaleWhileRevalidate,
    CacheFirst,
} from 'workbox-strategies';

import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { validImagePlugin } from './valid-image-plugin'

precacheAndRoute(STRING_TO_REPLACE_NOT_A_VAR)
/**
 *
 */

registerRoute(
    /\.(?:png|gif|svg|ico|jpg)$/,
    new CacheFirst({ // cache first ... then look elsewhere
        cacheName: 'image-cache',
        plugins: [
            validImagePlugin({
                statuses: [0, 200], // ZERO is for Opaque respones ie xDOMAIN as we cant access anything about the response
                headers: {
                    'Content-Length': (v) => Number(v) > 200
                }
            }),

            new ExpirationPlugin({
                maxEntries: 300, //
                // Cache for a maximum of 180 days.
                maxAgeSeconds: 180 * 24 * 60 * 60,
            }),
        ],
    })
)
registerRoute(
    new RegExp('.*(?:googleapis|gstatic|titter|twimg).com.*$'),
    new StaleWhileRevalidate({
        cacheName: 'vendor-cache',
    })
)
registerRoute(
    new RegExp('.*.js'),
    new StaleWhileRevalidate({
        cacheName: 'js-cache',
    })
)
registerRoute(
    new RegExp('.*.css'),
    new StaleWhileRevalidate({
        cacheName: 'css-cache',
    })
)
registerRoute(
    new RegExp('.*.(woff|woff2|eot|ttf)'),
    new CacheFirst({
        cacheName: 'font-cache',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200], // ZERO is for Opaque respones ie xDOMAIN as we cant access anything about the response
            })
        ]
    })
)
