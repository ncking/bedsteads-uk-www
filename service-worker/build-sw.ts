import { basename } from 'node:path'
import { injectManifest } from 'workbox-build'
import { build } from 'vite'


process.env.NODE_ENV === "production"

const publicPath = '/dist';
const outDir = `./public`
const options = { //https://developer.chrome.com/docs/workbox/modules/workbox-build#type-InjectManifestOptions
    swDest: `${outDir}/service-worker.js`,
    swSrc: './service-worker/service-worker',
    injectionPoint: 'STRING_TO_REPLACE_NOT_A_VAR',
    globDirectory: './public/dist'
}
const swName = basename(options.swDest)
const config = {
    publicDir: false,
    configFile: false,
    define: {
        'process.env.NODE_ENV': JSON.stringify('production')
    },
    build: {
        target: 'esnext',
        emptyOutDir: false,
        manifest: false,
        sourcemap: false,
        minify: true,
        outDir,
        lib: {
            entry: options.swSrc,
            name: 'sw',
            formats: ['iife']
        },
        rollupOptions: {
            output: {
                entryFileNames: swName
            },
        },
    },
};

await build(config);

const manifestTransforms = [(transformedManifest, transformParam) => {
    const manifest = transformedManifest.map(entry => {
        entry.revision = null // not having this property trigger an error, NULL is OK
        delete entry.size
        entry.url = `${publicPath}/${entry.url}`
        return entry
    })
    return { manifest }
}]

await injectManifest({ ...options, swSrc: options.swDest, manifestTransforms }) // https://developer.chrome.com/docs/workbox/modules/workbox-build#type-WebpackInjectManifestOptions


