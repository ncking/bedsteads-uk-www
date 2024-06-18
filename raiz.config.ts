import * as serverConfig from '@server/config'
import { templates } from '@server/lib/image'
import * as clientConfig from "./src/config/client.js"
//
import storePlugin from "@raiz/nuggins/modules/store"
import vitePlugin from "@raiz/nuggins/modules/vite"
import healthPlugin from "@raiz/nuggins/modules/healthcheck"
import consolePlugin from "@raiz/nuggins/modules/console"
import swPlugin from "@raiz/nuggins/modules/service-worker"
import ssrPlugin from "@raiz/nuggins/modules/ssr"
import redirectPlugin from "@raiz/nuggins/modules/redirect"
import svgPlugin from "@raiz/nuggins/modules/svg"
import apiPlugin from "@raiz/nuggins/modules/api"
import staticFilesPlugin from "@raiz/nuggins/modules/static"



export default ({ log }) => {
    return {
        app: {
            expires: 60 * 5,
        },
        modules: [// order is respected for middleware & plugins ... DEV middleware/plugins dropped in PROD, module.deps = [mudule, module2] for dependences
            vitePlugin({ config: viteOverides, ssr: false }),
            storePlugin({ data: { config: clientConfig } }),
            healthPlugin(),
            consolePlugin(),
            swPlugin(),
            ssrPlugin(),
            svgPlugin({ inline: svgs }),
            redirectPlugin({
                '/doubles': '/double',
                '/singles': '/single'
            }),
            staticFilesPlugin({
                images: {
                    publicDir: './public',
                    assetDir: './assets',
                    test: ({ ext, pathname }) => ('.jpg .jpeg'.includes(ext) && pathname.startsWith('/image/')),
                    templates
                },
                setHeaders(res, path, fileInfo) {
                    const ext = path.split('.').pop()
                    const header = serverConfig?.cacheControlExtensionMap[ext]
                    if (header) {
                        return res.setHeader('Cache-Control', header)
                    }
                    log.info(`SERVE_STATIC: no cache control for ext, ${ext}`)
                }
            }),
            apiPlugin({
                dir: './server/api',
                prefix: '/api',
                type: 'rest',
                debug: true,
                expires: 0
            })
        ]
    }
}




const svgs = {
    favouriteOn: `<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />`,
    favouriteOff: `<path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />`,
    facebook: `<path d="M19 6h5v-6h-5c-3.86 0-7 3.14-7 7v3h-4v6h4v16h6v-16h5l1-6h-6v-3c0-0.542 0.458-1 1-1z" />`,
    close: `<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>`,
    arrow: `<path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />`,
    contact: `<path d="m500.001-114.618-6.153-105.383H460q-133.538 0-226.768-93.231-93.231-93.23-93.231-226.768t93.231-226.768q93.23-93.231 226.768-93.231 66.769 0 124.807 24.962 58.038 24.961 101.654 68.576 43.615 43.616 68.576 101.654Q779.999-606.769 779.999-540q0 68.076-21.231 130.73-21.231 62.653-58.346 117.23-37.115 54.576-88.499 99.692-51.384 45.115-111.922 77.73ZM560-226q71-60 115.5-140.5T720-540q0-109-75.5-184.5T460-800q-109 0-184.5 75.5T200-540q0 109 75.5 184.5T460-280h100v54Zm-99.846-103.078q14.692 0 24.961-10.269 10.269-10.269 10.269-24.961 0-14.692-10.269-24.961-10.269-10.269-24.961-10.269-14.692 0-24.961 10.269-10.269 10.269-10.269 24.961 0 14.692 10.269 24.961 10.269 10.269 24.961 10.269Zm-23.23-121.999h47.691q.769-27.308 7.731-40.462 6.961-13.154 37.808-44 17.615-17.615 28.653-37.076 11.039-19.462 11.039-43.077 0-47.154-32.192-72.269-32.193-25.115-76.885-25.115-40.538 0-68.422 22.384-27.885 22.385-39.885 53.923l44.461 17.384q6.538-17.385 21.308-32.923 14.769-15.538 42.538-15.538 30.462 0 45.308 16.73 14.847 16.731 14.847 36.655 0 18.538-10.193 32.23-10.192 13.693-25.346 28.847-31.923 27.692-40.192 46.538-8.269 18.846-8.269 55.769ZM460-513Z"/>`,
    instagram: `
    <path
      d="M16 2.881c4.275 0 4.781 0.019 6.462 0.094 1.563 0.069 2.406 0.331 2.969 0.55 0.744 0.288 1.281 0.638 1.837 1.194 0.563 0.563 0.906 1.094 1.2 1.838 0.219 0.563 0.481 1.412 0.55 2.969 0.075 1.688 0.094 2.194 0.094 6.463s-0.019 4.781-0.094 6.463c-0.069 1.563-0.331 2.406-0.55 2.969-0.288 0.744-0.637 1.281-1.194 1.837-0.563 0.563-1.094 0.906-1.837 1.2-0.563 0.219-1.413 0.481-2.969 0.55-1.688 0.075-2.194 0.094-6.463 0.094s-4.781-0.019-6.463-0.094c-1.563-0.069-2.406-0.331-2.969-0.55-0.744-0.288-1.281-0.637-1.838-1.194-0.563-0.563-0.906-1.094-1.2-1.837-0.219-0.563-0.481-1.413-0.55-2.969-0.075-1.688-0.094-2.194-0.094-6.463s0.019-4.781 0.094-6.463c0.069-1.563 0.331-2.406 0.55-2.969 0.288-0.744 0.638-1.281 1.194-1.838 0.563-0.563 1.094-0.906 1.838-1.2 0.563-0.219 1.412-0.481 2.969-0.55 1.681-0.075 2.188-0.094 6.463-0.094zM16 0c-4.344 0-4.887 0.019-6.594 0.094-1.7 0.075-2.869 0.35-3.881 0.744-1.056 0.412-1.95 0.956-2.837 1.85-0.894 0.888-1.438 1.781-1.85 2.831-0.394 1.019-0.669 2.181-0.744 3.881-0.075 1.713-0.094 2.256-0.094 6.6s0.019 4.887 0.094 6.594c0.075 1.7 0.35 2.869 0.744 3.881 0.413 1.056 0.956 1.95 1.85 2.837 0.887 0.887 1.781 1.438 2.831 1.844 1.019 0.394 2.181 0.669 3.881 0.744 1.706 0.075 2.25 0.094 6.594 0.094s4.888-0.019 6.594-0.094c1.7-0.075 2.869-0.35 3.881-0.744 1.050-0.406 1.944-0.956 2.831-1.844s1.438-1.781 1.844-2.831c0.394-1.019 0.669-2.181 0.744-3.881 0.075-1.706 0.094-2.25 0.094-6.594s-0.019-4.887-0.094-6.594c-0.075-1.7-0.35-2.869-0.744-3.881-0.394-1.063-0.938-1.956-1.831-2.844-0.887-0.887-1.781-1.438-2.831-1.844-1.019-0.394-2.181-0.669-3.881-0.744-1.712-0.081-2.256-0.1-6.6-0.1v0z">
    </path>
    <path
      d="M16 7.781c-4.537 0-8.219 3.681-8.219 8.219s3.681 8.219 8.219 8.219 8.219-3.681 8.219-8.219c0-4.537-3.681-8.219-8.219-8.219zM16 21.331c-2.944 0-5.331-2.387-5.331-5.331s2.387-5.331 5.331-5.331c2.944 0 5.331 2.387 5.331 5.331s-2.387 5.331-5.331 5.331z">
    </path>
    <path
      d="M26.462 7.456c0 1.060-0.859 1.919-1.919 1.919s-1.919-0.859-1.919-1.919c0-1.060 0.859-1.919 1.919-1.919s1.919 0.859 1.919 1.919z">
    </path>`,

}


const viteOverides = {
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `;@use 'sass:math';@import "/scss/config/index.scss";`,
            },
        }
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.includes('react-simple-form')) return 'form'
                    if (id.includes('gmap')) return 'contact'
                    if (id.includes('panel-stack')) return 'stock'
                    if (id.includes('drag')) return 'stock'
                    if (id.includes('swipe-stack')) return 'stock'
                    if (id.includes('item-nav')) return 'stock'
                    if (id.includes('preact')) return 'preact'
                    if (id.includes('node_modules')) return 'vendor'
                },
            },
        },
    },
}