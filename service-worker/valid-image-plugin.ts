// import { assert } from 'workbox-core/_private/assert.js';
// import { WorkboxError } from 'workbox-core/_private/WorkboxError.js';
// import { getFriendlyURL } from 'workbox-core/_private/getFriendlyURL.js';
// import { logger } from 'workbox-core/_private/logger.js';
// import { WorkboxPlugin } from 'workbox-core/types.js';

/**
 * https://stackoverflow.com/questions/61348435/custom-plugins-in-google-workbox
 * Looks like you just need to return an object with method signatures
 */
export const validImagePlugin = (config) => {

    const { statuses, headers } = config


    return {

        cacheWillUpdate: async ({ response }) => {

            let cacheable = false;

            if (statuses) {
                cacheable = statuses?.includes(response.status);
            }

            if (cacheable && headers) {
                const headerNames = Object.keys(headers)
                for (var i = 0; i < headerNames.length; i++) {
                    const headerName = headerNames[i]
                    const value = response.headers.get(headerName);
                    const test = headers[headerName]
                    let isValid = false;
                    if (typeof test === 'function') {
                        isValid = test(value)
                    } else {
                        isValid = (test === value)
                    }
                    /**
                     * All must be valid
                     */
                    if (!isValid) {
                        cacheable = false
                        break;
                    }
                }

            }
            // Return `response`, a different `Response` object, or `null`.
            // let msg = `The request for ${response.url}`
            // if (cacheable) {
            //     console.info(msg, 'PASSED')
            // } else {
            //     console.warn(msg, 'FAILED')
            // }
            return cacheable ? response : null;
        },
        // cacheDidUpdate: async ({ cacheName, request, oldResponse, newResponse, event }) => {
        //     // No return expected
        //     // Note: `newResponse.bodyUsed` is `true` when this is called,
        //     // meaning the body has already been read. If you need access to
        //     // the body of the fresh response, use a technique like:
        //     // const freshResponse = await caches.match(request, {cacheName});
        // },
        // cacheKeyWillBeUsed: async ({ request, mode }) => {
        //     // `request` is the `Request` object that would otherwise be used as the cache key.
        //     // `mode` is either 'read' or 'write'.
        //     // Return either a string, or a `Request` whose `url` property will be used as the cache key.
        //     // Returning the original `request` will make this a no-op.
        //     return request;
        // },
        // cachedResponseWillBeUsed: async ({ cacheName, request, matchOptions, cachedResponse, event }) => {
        //     // Return `cachedResponse`, a different `Response` object, or null.
        //     return cachedResponse;
        // },
        // requestWillFetch: async ({ request }) => {
        //     // Return `request` or a different `Request` object.
        //     return request;
        // },
        // fetchDidFail: async ({ originalRequest, request, error, event }) => {
        //     // No return expected.
        //     // NOTE: `originalRequest` is the browser's request, `request` is the
        //     // request after being passed through plugins with
        //     // `requestWillFetch` callbacks, and `error` is the exception that caused
        //     // the underlying `fetch()` to fail.
        // },
        // fetchDidSucceed: async ({ request, response }) => {
        //     // Return `response` to use the network response as-is,
        //     // or alternatively create and return a new `Response` object.
        //     return response;
        // }
    }


}

