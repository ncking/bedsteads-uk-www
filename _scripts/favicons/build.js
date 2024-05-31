// https://github.com/itgalaxy/favicons
import fs from 'node:fs'
import pngQuantBinaryPath from 'pngquant-bin'
import shelljs from 'shelljs'
import favicons from 'favicons'
import * as config from '#config'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import packageInfo from '../../package.json'  with { type: "json" };
/**
 * 
 */
const {
    appName,
    appShortName,
    appDescription,
    developerName,
    developerURL,
    lang,
    background,
    theme_color
} = config
const {version } = packageInfo

/**
 * Project dirs
 */
const __dirname = dirname(fileURLToPath(import.meta.url));
const targetDir = '/favicon'
const source = __dirname + '/logo.svg'
/**
 * maskable icon
 */
const maskableIcon = 'maskable-icon.png'
const maskableIconSource = __dirname + '/' + maskableIcon 
/*

*/
const targetPath = `public/${targetDir}`
await fs.mkdirSync(targetPath, { recursive: true });
/**
 *
 */

const configuration = {
    /**
     * from config
     */
    lang: lang || 'en-UK',
    appName,
    appShortName,
    appDescription,
    developerName,
    developerURL,
    background,
    theme_color,
    /**
     * 
     */
    dir: 'auto', // Primary text direction for name, short_name, and description
    path: targetDir, // Path for overriding default icons path. `string`
    appleStatusBarStyle: 'black-translucent', // Style for Apple status bar: "black-translucent", "default", "black". `string`
    display: 'standalone', // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
    orientation: 'any', // Default orientation: "any", "natural", "portrait" or "landscape". `string`
    scope: '/', // set of URLs that the browser considers within your app
    start_url: '/', // Start URL when launching the application from a device. `string`
    version, // Your application's version string. `string`
    logging: true, // Print logs to console? `boolean`
    pixel_art: false, // Keeps pixels "sharp" when scaling up, for pixel art.  Only supported in offline mode.
    loadManifestWithCredentials: false, // Browsers don't send cookies when fetching a manifest, enable this to fix that. `boolean`
    manifestMaskable: false, //https://web.dev/articles/maskable-icon
    icons: {
        // Platform Options:
        // - offset - offset in percentage
        // - background:
        //   * false - use default
        //   * true - force use default, e.g. set background for Android icons
        //   * color - set background for the specified icons
        //   * mask - apply mask in order to create circle icon (applied by default for firefox). `boolean`
        //   * overlayGlow - apply glow effect after mask has been applied (applied by default for firefox). `boolean`
        //   * overlayShadow - apply drop shadow after mask has been applied .`boolean`
        //
        android: true, // Create Android homescreen icon. `boolean` or `{ offset, background }` or an array of sources
        appleIcon: true, // Create Apple touch icons. `boolean` or `{ offset, background }` or an array of sources
        appleStartup: true, // Create Apple startup images. `boolean` or `{ offset, background }` or an array of sources
        favicons: true, // Create regular favicons. `boolean` or `{ offset, background }` or an array of sources
        windows: true, // Create Windows 8 tile icons. `boolean` or `{ offset, background }` or an array of sources
        yandex: true, // Create Yandex browser icon. `boolean` or `{ offset, background }` or an array of sources
    },
}


const { images, files, html } = await favicons(source, configuration)

// Array of { name: string, contents: <buffer> }
images.map(({ name, contents }) => {
    fs.writeFileSync(`${targetPath}/${name}`, contents)
})
// Array of { name: string, contents: <string> }
files.map(({ name, contents }) => {


    /**
     * @NK Add in our maskable icon ... favicons dont make one as of Mar 2024???
     * 
     */
    if (name === 'manifest.webmanifest') {
        contents = JSON.parse(contents)
        contents.icons.push({
            "src": `${targetDir}/${maskableIcon}`,
            "sizes": "300x300",
            "type": "image/png",
            "purpose": "maskable"
        })

        contents = JSON.stringify(contents)
        fs.copyFileSync(maskableIconSource, `${targetPath}/${maskableIcon}`)

    }
    fs.writeFileSync(`${targetPath}/${name}`, contents)
})
// html
fs.writeFileSync(
    `${targetPath}/meta.html`,
    html.join('\n').split('">').join('"/>')
)

/*
* What Google says ...
https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/automating-image-optimization
 
.JPEGs through MozJPEG (q=80 or lower is fine for web content) and consider Progressive JPEG support, 
.PNGs through pngquant and 
.SVGs through SVGO. 
 
Explicitly strip out metadata (--strip for pngquant) to avoid bloat. I
 
  Array of { name: string, contents: <string> }

*/
const options = '--speed 1 -f --ext .png --strip --quality=60-80'
for (const { name } of images) {
    let inputPngPath = targetPath + '/' + name
    shelljs.exec(pngQuantBinaryPath + ' ' + options + ' ' + inputPngPath) //pngquant.exe --speed 1 --strip --quality=60-80 ./RES/13/?? -o ./RES2/13/?
}

shelljs.exec(`svgo ${source} -o ${targetPath}/icon.svg`)


/**
 * put a copy in the root, for those that ignore
 */

fs.copyFileSync(`${targetPath}/favicon.ico`, `public/favicon.ico`)