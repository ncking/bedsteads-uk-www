import { backgroundColour, author } from '@server/config'
import { findActive } from '@server/repo/stock'

export default async ({ response, tagRenderer, plugins, isDev }) => {
  let headTags = ''
  const store = plugins.getPlugin('store')
  store.data.stock = await findActive()
  store.setPageData(response.toJson())
  const company = store.data.config.company

  if (!isDev) {
    tagRenderer.enableNonce()

    const googleDomains = '*.gstatic.com *.google.com *.googleapis.com *.google-analytics.com *.googletagmanager.com'
    const rules = [
      'base-uri \'self\'',
      `default-src 'self' ${googleDomains}`,
      `script-src 'nonce-${tagRenderer.getNonce()}' 'self' 'strict-dynamic' 'unsafe-inline' ${googleDomains}`, // @NK need the 'self' for unsupported browsers ... "waek" rules are cancelled if browser supports stricter directives
      `font-src 'self' 'unsafe-inline'  ${googleDomains}`,
      `img-src 'self' data: ${googleDomains}`, //  Must have inline images (generated runtime) for Gmaps ...
      `style-src 'self' 'unsafe-inline' ${googleDomains}`, // add in nonced tags for unsafe-inline
    ]
    response.addHttpHeader('Content-Security-Policy', rules.join(';'))
      .addHttpHeader('feature-policy', `accelerometer 'none'; camera 'none'; geolocation 'none'; gyroscope 'none'; magnetometer 'none'; microphone 'none'; payment 'none'; usb 'none'`)
      .addHttpHeader('referrer-policy', 'strict-origin-when-cross-origin')
      .addHttpHeader('strict-transport-security', 'max-age=63072000; includeSubDomains; preload') // https://tylermade.net/2017/05/01/nginx-security-hardening/
      .addHttpHeader('x-frame-options', 'SAMEORIGIN')
      .addHttpHeader('x-content-type-options', 'nosniff')
      .addHttpHeader('x-xss-protection', '1; mode=block')

    headTags = tagRenderer.renderHeadTagsForRoute({
      dnsPrefetch: ['https://www.googletagmanager.com'],
      inlineSystemCss: true,
      inlineRouteCss: true,
    })
  }

  /**
   *
   */

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
  <meta name="if:Enable Endless Scrolling" content="1">
  <meta name="format-detection" content="telephone=yes">
  <meta name="HandheldFriendly" content="true">
  <meta name="if:Enable Endless Scrolling" content="1">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0">
  <meta content="${author}" name="author">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
  
  <link rel="shortcut icon" href="/favicon/favicon.ico">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
  <link rel="icon" type="image/svg+xml" href="/favicon/icon.svg">
  <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon-180x180.png">
  <link rel="manifest" href="/favicon/manifest.webmanifest">
  <link rel="yandex-tableau-widget" href="/favicon/yandex-browser-manifest.json">

  <meta name="application-name" content="${company}">
  <meta name="apple-mobile-web-app-title" content="${company}">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

  <meta name="theme-color" content="${backgroundColour}">
  <meta name="msapplication-TileColor" content="${backgroundColour}">
  
  <meta name="msapplication-config" content="/favicon/browserconfig.xml">
  <meta name="ahrefs-site-verification" content="5d9efbbdc27cee8e5bdd3abb86d08046b5b568cfa94469740efcfa940949f129">
  ${response.renderMetaTags({ og: true })}
  ${headTags}
</head>
<body data-scrollbars>

<div id="app"><!--ssr-outlet--></div>
${tagRenderer.scriptTag({ data: plugins.toScript() })}
${tagRenderer.addJsonLDTag(response.getJSONLD())}
${tagRenderer.renderScriptTagsForRoute({ type: 'module' })}
</body>
</html>`
}
