// vite.config.ts
import { resolve } from "node:path";
import { defineConfig } from "file:///D:/srv/bedsteads-uk.co.uk/www/node_modules/vite/dist/node/index.js";
import tsconfigPaths from "file:///D:/srv/bedsteads-uk.co.uk/www/node_modules/vite-tsconfig-paths/dist/index.mjs";
import react from "file:///D:/srv/bedsteads-uk.co.uk/www/node_modules/@vitejs/plugin-react/dist/index.mjs";
import vitePluginSettingCssModule from "file:///D:/srv/bedsteads-uk.co.uk/www/node_modules/vite-plugin-setting-css-module/lib/index.mjs";
import { manualChunksPlugin } from "file:///D:/srv/bedsteads-uk.co.uk/www/node_modules/vite-plugin-webpackchunkname/dist/vite-plugin-webpackchunkname.js";
import { visualizer } from "file:///D:/srv/bedsteads-uk.co.uk/www/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import replace from "file:///D:/srv/bedsteads-uk.co.uk/www/node_modules/@rollup/plugin-replace/dist/es/index.js";
import cleanup from "file:///D:/srv/bedsteads-uk.co.uk/www/node_modules/rollup-plugin-cleanup/dist/rollup-plugin-cleanup.js";
import { terser } from "file:///D:/srv/bedsteads-uk.co.uk/www/node_modules/rollup-plugin-terser/rollup-plugin-terser.mjs";

// src/routes.ts
var chunks = {
  form: "modules/form"
};
var routes = [
  {
    url: "/",
    page: "home",
    id: "home",
    meta: { title: "home", label: "Home page" }
  },
  {
    url: "/favourites",
    page: "favourites",
    id: "favourites",
    meta: { title: "contact", label: "Contact Bedsteads" }
  },
  {
    url: "/contact",
    page: "contact",
    id: "contact",
    meta: { title: "contact", label: "Contact Bedsteads" }
  },
  {
    url: "/privacy",
    page: "privacy",
    id: "privacy",
    meta: { title: "privacy", label: "Privacy Policy" }
  },
  {
    url: "/mattresses",
    page: "mattress",
    id: "mattresses",
    meta: { title: "mattresses & bases", label: "mattresses & bases" }
  },
  {
    url: "/antique",
    page: "stock",
    id: "antique",
    meta: {
      title: "antique beds",
      label: "antique beds",
      category: "antique"
    }
  },
  {
    url: "/superking",
    page: "stock",
    id: "superking",
    meta: {
      title: "superking",
      label: "superking beds",
      category: "antique",
      size: "superking"
    }
  },
  {
    url: "/kingsize",
    page: "stock",
    id: "kingsize",
    meta: {
      title: "kingsize",
      label: "kingsize beds",
      category: "antique",
      size: "kingsize"
    }
  },
  {
    url: "/double",
    page: "stock",
    id: "double",
    meta: {
      title: "double",
      label: "double beds",
      category: "antique",
      size: "double"
    }
  },
  {
    url: "/single",
    page: "stock",
    id: "single",
    meta: {
      title: "single",
      label: "single beds",
      category: "antique",
      size: "single"
    }
  },
  {
    url: "/furniture",
    page: "stock",
    id: "furniture",
    meta: {
      title: "antique furniture",
      label: "antique furniture",
      category: "furniture"
    }
  },
  {
    url: "/reproduction",
    page: "stock",
    id: "reproduction",
    meta: {
      title: "reproduction beds",
      label: "reproduction beds",
      category: "reproduction"
    }
  },
  {
    url: "/(?<category>(reproduction|furniture|antique))/(?<slug>[^/]+)_(?<id>[0-9]+)",
    page: "stock",
    id: "item"
  },
  {
    url: "/(?<size>[^/]+)/(?<slug>[^/]+)_(?<id>[0-9]+)",
    page: "stock",
    id: "item"
  }
];

// vite.config.ts
import * as serverConfig from "@server/config";
import { viteRaiz, viteRaizModules } from "file:///D:/srv/@raiz/js/packages/nuggins/modules/vite/plugin/index.ts";
var PATH_PREACT = `node_modules/preact`;
var PATH_ALIAS_PREACT = {
  "react": resolve(`${PATH_PREACT}/compat`),
  "react-dom/test-utils": resolve(`${PATH_PREACT}/test-utils`),
  "react-dom": resolve(`${PATH_PREACT}/compat`),
  "react-ssr-prepass": resolve(`node_modules/preact-ssr-prepass`)
};
var vite_config_default = defineConfig((props) => {
  const { command, mode, isSsrBuild, isPreview } = props;
  const __DEV__ = mode !== "production";
  const isBuild = command === "build";
  const minify = !isSsrBuild;
  return {
    publicDir: false,
    define: {
      __DEV__,
      __SSR__: isSsrBuild,
      "process.env.__DEV__": __DEV__,
      "process.env.SSR": false,
      "import.meta.env.SSR": false
    },
    server: { hmr: true },
    plugins: [
      tsconfigPaths(),
      react({
        include: ["**/*.tsx", "**/*.ts", "**/*.jsx", "**/*.js"]
      }),
      // ViteRestart({
      //   restart: [
      //     './bootstrap.js',
      //     './src/pages/**/server.ts',
      //   ]
      // }),
      vitePluginSettingCssModule(),
      manualChunksPlugin(),
      visualizer(),
      viteRaiz({
        routes,
        chunks,
        mode,
        isBuild,
        /// we need this for server manifest generation
        config: serverConfig
      }),
      cleanup()
    ],
    resolve: {
      alias: {
        ...isBuild || isSsrBuild ? PATH_ALIAS_PREACT : {}
      }
    },
    css: {
      modules: {
        generateScopedName: __DEV__ ? "[name]__[local]__[hash:base64:5]" : "[hash:base64:5]"
      },
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          additionalData: `;@use 'sass:math';@import "/scss/config/index.scss";`
        }
      }
    },
    ssr: {
      noExternal: ["@raiz/react-simple-store"]
    },
    build: {
      target: "esnext",
      // for SSR TLA https://github.com/vitejs/vite/issues/6985
      manifest: true,
      ssrManifest: true,
      cssMinify: "esbuild",
      cssCodeSplit: true,
      // If disabled, all CSS in the entire project will be extracted into a single CSS file.
      sourcemap: false,
      polyfillModulePreload: false,
      minify: minify ? "terser" : false,
      lib: {
        entry: isSsrBuild ? "./src/entry-ssr.tsx" : "./src/entry-client.tsx",
        name: "MyLib",
        formats: ["es"],
        fileName: (...rest) => {
          return `entry.[hash].js`;
        }
      },
      rollupOptions: {
        plugins: [
          replace({
            preventAssignment: true,
            "process.env.SSR": "",
            "process.env.NODE_ENV": JSON.stringify("production")
          }),
          // externalGlobals({ react: "works_but_not_what_we_want"}),// so it will prefix all React methods with the gloabl var so 'useEffect' =>>>> becomes myVar.useEffect
          minify ? terser({
            // https://terser.org/docs/options/
            format: {
              beautify: false,
              comments: false,
              ecma: 2015,
              indent_level: 0,
              safari10: true,
              ascii_only: true,
              semicolons: false
              //instead of a semicolon, leading to more readable output of minified code (size before gzip could be smaller; size after gzip insignificantly larger).
            },
            mangle: {
              keep_classnames: false,
              reserved: [],
              safari10: false,
              toplevel: true
            },
            compress: {
              ecma: 2015,
              comparisons: true,
              keep_fnames: false,
              module: true
            },
            ecma: 5
          }) : null,
          cleanup({ comments: "none", extensions: ["js", "ts"] })
          // must be last
        ],
        output: {
          format: "esm",
          sourcemapExcludeSources: true,
          inlineDynamicImports: false,
          assetFileNames: (file) => {
            return "[name].[hash].[ext]";
          },
          chunkFileNames: (file) => {
            return "[name].[hash].js";
          },
          manualChunks: (id) => {
            const module = viteRaizModules.findByVirtual(id);
            if (module) {
              return module.productionName;
            }
            if (isSsrBuild) {
              return;
            }
            if (id.includes("react-simple-form"))
              return "form";
            if (id.includes("gmap"))
              return "contact";
            if (id.includes("panel-stack"))
              return "stock";
            if (id.includes("drag"))
              return "stock";
            if (id.includes("swipe-stack"))
              return "stock";
            if (id.includes("item-nav"))
              return "stock";
            if (id.includes("preact"))
              return "preact";
            if (id.includes("node_modules"))
              return "vendor";
          }
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic3JjL3JvdXRlcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHNydlxcXFxiZWRzdGVhZHMtdWsuY28udWtcXFxcd3d3XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxzcnZcXFxcYmVkc3RlYWRzLXVrLmNvLnVrXFxcXHd3d1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovc3J2L2JlZHN0ZWFkcy11ay5jby51ay93d3cvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAnbm9kZTpwYXRoJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tICd2aXRlLXRzY29uZmlnLXBhdGhzJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcbmltcG9ydCB2aXRlUGx1Z2luU2V0dGluZ0Nzc01vZHVsZSBmcm9tICd2aXRlLXBsdWdpbi1zZXR0aW5nLWNzcy1tb2R1bGUnO1xuaW1wb3J0IHsgbWFudWFsQ2h1bmtzUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4td2VicGFja2NodW5rbmFtZSdcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tIFwicm9sbHVwLXBsdWdpbi12aXN1YWxpemVyXCI7XG5pbXBvcnQgcmVwbGFjZSBmcm9tICdAcm9sbHVwL3BsdWdpbi1yZXBsYWNlJztcbmltcG9ydCBjbGVhbnVwIGZyb20gJ3JvbGx1cC1wbHVnaW4tY2xlYW51cCc7XG5pbXBvcnQgeyB0ZXJzZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXRlcnNlcic7XG5pbXBvcnQgeyByb3V0ZXMsIGNodW5rcyB9IGZyb20gJy4vc3JjL3JvdXRlcydcbmltcG9ydCAqIGFzIHNlcnZlckNvbmZpZyBmcm9tICdAc2VydmVyL2NvbmZpZydcbi8vIGltcG9ydCBWaXRlUmVzdGFydCBmcm9tICd2aXRlLXBsdWdpbi1yZXN0YXJ0J1xuLyoqXG4gKiBcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS92aXRlanMvYXdlc29tZS12aXRlXG4gKiBcbiAqL1xuaW1wb3J0IHsgdml0ZVJhaXosIHZpdGVSYWl6TW9kdWxlcyB9IGZyb20gJ0ByYWl6L251Z2dpbnMvbW9kdWxlcy92aXRlL3BsdWdpbidcblxuXG5jb25zdCBQQVRIX1BSRUFDVCA9IGBub2RlX21vZHVsZXMvcHJlYWN0YFxuY29uc3QgUEFUSF9BTElBU19QUkVBQ1QgPSB7XG4gICdyZWFjdCc6IHJlc29sdmUoYCR7UEFUSF9QUkVBQ1R9L2NvbXBhdGApLFxuICAncmVhY3QtZG9tL3Rlc3QtdXRpbHMnOiByZXNvbHZlKGAke1BBVEhfUFJFQUNUfS90ZXN0LXV0aWxzYCksXG4gICdyZWFjdC1kb20nOiByZXNvbHZlKGAke1BBVEhfUFJFQUNUfS9jb21wYXRgKSxcbiAgJ3JlYWN0LXNzci1wcmVwYXNzJzogcmVzb2x2ZShgbm9kZV9tb2R1bGVzL3ByZWFjdC1zc3ItcHJlcGFzc2ApXG59XG5cblxuXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygocHJvcHMpID0+IHtcbiAgY29uc3QgeyBjb21tYW5kLCBtb2RlLCBpc1NzckJ1aWxkLCBpc1ByZXZpZXcgfSA9IHByb3BzXG4gIC8vY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCAnZW52Jyk7XG4gIGNvbnN0IF9fREVWX18gPSBtb2RlICE9PSAncHJvZHVjdGlvbidcbiAgY29uc3QgaXNCdWlsZCA9IGNvbW1hbmQgPT09ICdidWlsZCcgLy8gIFNTUiAmIENMSUVOVFxuICBjb25zdCBtaW5pZnkgPSAhaXNTc3JCdWlsZFxuXG5cblxuICByZXR1cm4ge1xuICAgIHB1YmxpY0RpcjogZmFsc2UsXG4gICAgZGVmaW5lOiB7XG4gICAgICBfX0RFVl9fLFxuICAgICAgX19TU1JfXzogaXNTc3JCdWlsZCxcbiAgICAgICdwcm9jZXNzLmVudi5fX0RFVl9fJzogX19ERVZfXyxcbiAgICAgICdwcm9jZXNzLmVudi5TU1InOiBmYWxzZSxcbiAgICAgICdpbXBvcnQubWV0YS5lbnYuU1NSJzogZmFsc2VcbiAgICB9LFxuICAgIHNlcnZlcjogeyBobXI6IHRydWUgfSxcbiAgICBwbHVnaW5zOiBbXG4gICAgICB0c2NvbmZpZ1BhdGhzKCksXG4gICAgICByZWFjdCh7XG4gICAgICAgIGluY2x1ZGU6IFsnKiovKi50c3gnLCAnKiovKi50cycsICcqKi8qLmpzeCcsICcqKi8qLmpzJ10sXG4gICAgICB9KSxcbiAgICAgIC8vIFZpdGVSZXN0YXJ0KHtcbiAgICAgIC8vICAgcmVzdGFydDogW1xuICAgICAgLy8gICAgICcuL2Jvb3RzdHJhcC5qcycsXG4gICAgICAvLyAgICAgJy4vc3JjL3BhZ2VzLyoqL3NlcnZlci50cycsXG4gICAgICAvLyAgIF1cbiAgICAgIC8vIH0pLFxuICAgICAgdml0ZVBsdWdpblNldHRpbmdDc3NNb2R1bGUoKSxcbiAgICAgIG1hbnVhbENodW5rc1BsdWdpbigpLFxuICAgICAgdmlzdWFsaXplcigpLFxuICAgICAgdml0ZVJhaXooe1xuICAgICAgICByb3V0ZXMsXG4gICAgICAgIGNodW5rcyxcbiAgICAgICAgbW9kZSxcbiAgICAgICAgaXNCdWlsZCwgLy8vIHdlIG5lZWQgdGhpcyBmb3Igc2VydmVyIG1hbmlmZXN0IGdlbmVyYXRpb25cbiAgICAgICAgY29uZmlnOiBzZXJ2ZXJDb25maWdcbiAgICAgIH0pLFxuICAgICAgY2xlYW51cCgpXG4gICAgXSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAuLi4oaXNCdWlsZCB8fCBpc1NzckJ1aWxkID8gUEFUSF9BTElBU19QUkVBQ1QgOiB7fSlcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjc3M6IHtcbiAgICAgIG1vZHVsZXM6IHtcbiAgICAgICAgZ2VuZXJhdGVTY29wZWROYW1lOiBfX0RFVl9fID8gXCJbbmFtZV1fX1tsb2NhbF1fX1toYXNoOmJhc2U2NDo1XVwiIDogXCJbaGFzaDpiYXNlNjQ6NV1cIixcbiAgICAgIH0sXG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAgIHNjc3M6IHtcbiAgICAgICAgICBxdWlldERlcHM6IHRydWUsXG4gICAgICAgICAgYWRkaXRpb25hbERhdGE6IGA7QHVzZSAnc2FzczptYXRoJztAaW1wb3J0IFwiL3Njc3MvY29uZmlnL2luZGV4LnNjc3NcIjtgLFxuICAgICAgICB9LFxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzc3I6IHtcbiAgICAgIG5vRXh0ZXJuYWw6IFsnQHJhaXovcmVhY3Qtc2ltcGxlLXN0b3JlJ10sXG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgdGFyZ2V0OiAnZXNuZXh0JywgLy8gZm9yIFNTUiBUTEEgaHR0cHM6Ly9naXRodWIuY29tL3ZpdGVqcy92aXRlL2lzc3Vlcy82OTg1XG4gICAgICBtYW5pZmVzdDogdHJ1ZSxcbiAgICAgIHNzck1hbmlmZXN0OiB0cnVlLFxuICAgICAgY3NzTWluaWZ5OiAnZXNidWlsZCcsXG4gICAgICBjc3NDb2RlU3BsaXQ6IHRydWUsIC8vIElmIGRpc2FibGVkLCBhbGwgQ1NTIGluIHRoZSBlbnRpcmUgcHJvamVjdCB3aWxsIGJlIGV4dHJhY3RlZCBpbnRvIGEgc2luZ2xlIENTUyBmaWxlLlxuICAgICAgc291cmNlbWFwOiBmYWxzZSxcbiAgICAgIHBvbHlmaWxsTW9kdWxlUHJlbG9hZDogZmFsc2UsXG4gICAgICBtaW5pZnk6IG1pbmlmeSA/ICd0ZXJzZXInIDogZmFsc2UsXG5cbiAgICAgIGxpYjoge1xuICAgICAgICBlbnRyeTogaXNTc3JCdWlsZCA/ICcuL3NyYy9lbnRyeS1zc3IudHN4JyA6ICcuL3NyYy9lbnRyeS1jbGllbnQudHN4JyxcbiAgICAgICAgbmFtZTogJ015TGliJyxcbiAgICAgICAgZm9ybWF0czogWydlcyddLFxuICAgICAgICBmaWxlTmFtZTogKC4uLnJlc3QpID0+IHtcbiAgICAgICAgICByZXR1cm4gYGVudHJ5LltoYXNoXS5qc2BcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcblxuICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgcmVwbGFjZSh7XG4gICAgICAgICAgICBwcmV2ZW50QXNzaWdubWVudDogdHJ1ZSxcbiAgICAgICAgICAgICdwcm9jZXNzLmVudi5TU1InOiAnJyxcbiAgICAgICAgICAgICdwcm9jZXNzLmVudi5OT0RFX0VOVic6IEpTT04uc3RyaW5naWZ5KCdwcm9kdWN0aW9uJyksXG4gICAgICAgICAgfSksXG5cbiAgICAgICAgICAvLyBleHRlcm5hbEdsb2JhbHMoeyByZWFjdDogXCJ3b3Jrc19idXRfbm90X3doYXRfd2Vfd2FudFwifSksLy8gc28gaXQgd2lsbCBwcmVmaXggYWxsIFJlYWN0IG1ldGhvZHMgd2l0aCB0aGUgZ2xvYWJsIHZhciBzbyAndXNlRWZmZWN0JyA9Pj4+PiBiZWNvbWVzIG15VmFyLnVzZUVmZmVjdFxuICAgICAgICAgIG1pbmlmeSA/IHRlcnNlcih7IC8vIGh0dHBzOi8vdGVyc2VyLm9yZy9kb2NzL29wdGlvbnMvXG5cbiAgICAgICAgICAgIGZvcm1hdDoge1xuICAgICAgICAgICAgICBiZWF1dGlmeTogZmFsc2UsXG4gICAgICAgICAgICAgIGNvbW1lbnRzOiBmYWxzZSxcbiAgICAgICAgICAgICAgZWNtYTogMjAxNSxcbiAgICAgICAgICAgICAgaW5kZW50X2xldmVsOiAwLFxuICAgICAgICAgICAgICBzYWZhcmkxMDogdHJ1ZSxcbiAgICAgICAgICAgICAgYXNjaWlfb25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgc2VtaWNvbG9uczogZmFsc2UgLy9pbnN0ZWFkIG9mIGEgc2VtaWNvbG9uLCBsZWFkaW5nIHRvIG1vcmUgcmVhZGFibGUgb3V0cHV0IG9mIG1pbmlmaWVkIGNvZGUgKHNpemUgYmVmb3JlIGd6aXAgY291bGQgYmUgc21hbGxlcjsgc2l6ZSBhZnRlciBnemlwIGluc2lnbmlmaWNhbnRseSBsYXJnZXIpLlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1hbmdsZToge1xuICAgICAgICAgICAgICBrZWVwX2NsYXNzbmFtZXM6IGZhbHNlLFxuICAgICAgICAgICAgICByZXNlcnZlZDogW10sXG4gICAgICAgICAgICAgIHNhZmFyaTEwOiBmYWxzZSxcbiAgICAgICAgICAgICAgdG9wbGV2ZWw6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21wcmVzczoge1xuICAgICAgICAgICAgICBlY21hOiAyMDE1LFxuICAgICAgICAgICAgICBjb21wYXJpc29uczogdHJ1ZSxcbiAgICAgICAgICAgICAga2VlcF9mbmFtZXM6IGZhbHNlLFxuICAgICAgICAgICAgICBtb2R1bGU6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlY21hOiA1XG4gICAgICAgICAgfSkgOiBudWxsLFxuICAgICAgICAgIGNsZWFudXAoeyBjb21tZW50czogJ25vbmUnLCBleHRlbnNpb25zOiBbXCJqc1wiLCBcInRzXCJdIH0pICAvLyBtdXN0IGJlIGxhc3RcbiAgICAgICAgXSxcblxuXG5cbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgZm9ybWF0OiAnZXNtJyxcbiAgICAgICAgICBzb3VyY2VtYXBFeGNsdWRlU291cmNlczogdHJ1ZSxcbiAgICAgICAgICBpbmxpbmVEeW5hbWljSW1wb3J0czogZmFsc2UsXG4gICAgICAgICAgYXNzZXRGaWxlTmFtZXM6IChmaWxlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gXCJbbmFtZV0uW2hhc2hdLltleHRdXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNodW5rRmlsZU5hbWVzOiAoZmlsZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFwiW25hbWVdLltoYXNoXS5qc1wiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBtYW51YWxDaHVua3M6IChpZCkgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBtb2R1bGUgPSB2aXRlUmFpek1vZHVsZXMuZmluZEJ5VmlydHVhbChpZClcbiAgICAgICAgICAgIGlmIChtb2R1bGUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG1vZHVsZS5wcm9kdWN0aW9uTmFtZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihpc1NzckJ1aWxkKXtcbiAgICAgICAgICAgICAgcmV0dXJuIDsgLy8vIG5vIGNodW5rcyBmb3IgU1NSXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ3JlYWN0LXNpbXBsZS1mb3JtJykpIHJldHVybiAnZm9ybSdcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnZ21hcCcpKSByZXR1cm4gJ2NvbnRhY3QnXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdwYW5lbC1zdGFjaycpKSByZXR1cm4gJ3N0b2NrJ1xuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdkcmFnJykpIHJldHVybiAnc3RvY2snXG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ3N3aXBlLXN0YWNrJykpIHJldHVybiAnc3RvY2snXG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ2l0ZW0tbmF2JykpIHJldHVybiAnc3RvY2snXG4gICAgICAgICAgICAvLy9cbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygncHJlYWN0JykpIHJldHVybiAncHJlYWN0J1xuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMnKSkgcmV0dXJuICd2ZW5kb3InXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcbn0pXG5cblxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxzcnZcXFxcYmVkc3RlYWRzLXVrLmNvLnVrXFxcXHd3d1xcXFxzcmNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHNydlxcXFxiZWRzdGVhZHMtdWsuY28udWtcXFxcd3d3XFxcXHNyY1xcXFxyb3V0ZXMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3Nydi9iZWRzdGVhZHMtdWsuY28udWsvd3d3L3NyYy9yb3V0ZXMudHNcIjtleHBvcnQgY29uc3QgY2h1bmtzID0ge1xyXG4gIGZvcm06ICdtb2R1bGVzL2Zvcm0nLFxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgcm91dGVzID0gW1xyXG4gIHtcclxuICAgIHVybDogJy8nLFxyXG4gICAgcGFnZTogJ2hvbWUnLFxyXG4gICAgaWQ6ICdob21lJyxcclxuICAgIG1ldGE6IHsgdGl0bGU6ICdob21lJywgbGFiZWw6ICdIb21lIHBhZ2UnIH0sXHJcbiAgfSxcclxuICB7XHJcbiAgICB1cmw6ICcvZmF2b3VyaXRlcycsXHJcbiAgICBwYWdlOiAnZmF2b3VyaXRlcycsXHJcbiAgICBpZDogJ2Zhdm91cml0ZXMnLFxyXG4gICAgbWV0YTogeyB0aXRsZTogJ2NvbnRhY3QnLCBsYWJlbDogJ0NvbnRhY3QgQmVkc3RlYWRzJyB9LFxyXG4gIH0sXHJcbiAge1xyXG4gICAgdXJsOiAnL2NvbnRhY3QnLFxyXG4gICAgcGFnZTogJ2NvbnRhY3QnLFxyXG4gICAgaWQ6ICdjb250YWN0JyxcclxuICAgIG1ldGE6IHsgdGl0bGU6ICdjb250YWN0JywgbGFiZWw6ICdDb250YWN0IEJlZHN0ZWFkcycgfSxcclxuICB9LFxyXG4gIHtcclxuICAgIHVybDogJy9wcml2YWN5JyxcclxuICAgIHBhZ2U6ICdwcml2YWN5JyxcclxuICAgIGlkOiAncHJpdmFjeScsXHJcbiAgICBtZXRhOiB7IHRpdGxlOiAncHJpdmFjeScsIGxhYmVsOiAnUHJpdmFjeSBQb2xpY3knIH0sXHJcbiAgfSxcclxuICB7XHJcbiAgICB1cmw6ICcvbWF0dHJlc3NlcycsXHJcbiAgICBwYWdlOiAnbWF0dHJlc3MnLFxyXG4gICAgaWQ6ICdtYXR0cmVzc2VzJyxcclxuICAgIG1ldGE6IHsgdGl0bGU6ICdtYXR0cmVzc2VzICYgYmFzZXMnLCBsYWJlbDogJ21hdHRyZXNzZXMgJiBiYXNlcycgfSxcclxuICB9LFxyXG4gIHtcclxuICAgIHVybDogJy9hbnRpcXVlJyxcclxuICAgIHBhZ2U6ICdzdG9jaycsXHJcbiAgICBpZDogJ2FudGlxdWUnLFxyXG4gICAgbWV0YToge1xyXG4gICAgICB0aXRsZTogJ2FudGlxdWUgYmVkcycsXHJcbiAgICAgIGxhYmVsOiAnYW50aXF1ZSBiZWRzJyxcclxuICAgICAgY2F0ZWdvcnk6ICdhbnRpcXVlJyxcclxuICAgIH0sXHJcbiAgfSxcclxuICB7XHJcbiAgICB1cmw6ICcvc3VwZXJraW5nJyxcclxuICAgIHBhZ2U6ICdzdG9jaycsXHJcbiAgICBpZDogJ3N1cGVya2luZycsXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIHRpdGxlOiAnc3VwZXJraW5nJyxcclxuICAgICAgbGFiZWw6ICdzdXBlcmtpbmcgYmVkcycsXHJcbiAgICAgIGNhdGVnb3J5OiAnYW50aXF1ZScsXHJcbiAgICAgIHNpemU6ICdzdXBlcmtpbmcnLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHtcclxuICAgIHVybDogJy9raW5nc2l6ZScsXHJcbiAgICBwYWdlOiAnc3RvY2snLFxyXG4gICAgaWQ6ICdraW5nc2l6ZScsXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIHRpdGxlOiAna2luZ3NpemUnLFxyXG4gICAgICBsYWJlbDogJ2tpbmdzaXplIGJlZHMnLFxyXG4gICAgICBjYXRlZ29yeTogJ2FudGlxdWUnLFxyXG4gICAgICBzaXplOiAna2luZ3NpemUnLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHtcclxuICAgIHVybDogJy9kb3VibGUnLFxyXG4gICAgcGFnZTogJ3N0b2NrJyxcclxuICAgIGlkOiAnZG91YmxlJyxcclxuICAgIG1ldGE6IHtcclxuICAgICAgdGl0bGU6ICdkb3VibGUnLFxyXG4gICAgICBsYWJlbDogJ2RvdWJsZSBiZWRzJyxcclxuICAgICAgY2F0ZWdvcnk6ICdhbnRpcXVlJyxcclxuICAgICAgc2l6ZTogJ2RvdWJsZScsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAge1xyXG4gICAgdXJsOiAnL3NpbmdsZScsXHJcbiAgICBwYWdlOiAnc3RvY2snLFxyXG4gICAgaWQ6ICdzaW5nbGUnLFxyXG4gICAgbWV0YToge1xyXG4gICAgICB0aXRsZTogJ3NpbmdsZScsXHJcbiAgICAgIGxhYmVsOiAnc2luZ2xlIGJlZHMnLFxyXG4gICAgICBjYXRlZ29yeTogJ2FudGlxdWUnLFxyXG4gICAgICBzaXplOiAnc2luZ2xlJyxcclxuICAgIH0sXHJcbiAgfSxcclxuICB7XHJcbiAgICB1cmw6ICcvZnVybml0dXJlJyxcclxuICAgIHBhZ2U6ICdzdG9jaycsXHJcbiAgICBpZDogJ2Z1cm5pdHVyZScsXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIHRpdGxlOiAnYW50aXF1ZSBmdXJuaXR1cmUnLFxyXG4gICAgICBsYWJlbDogJ2FudGlxdWUgZnVybml0dXJlJyxcclxuICAgICAgY2F0ZWdvcnk6ICdmdXJuaXR1cmUnLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHtcclxuICAgIHVybDogJy9yZXByb2R1Y3Rpb24nLFxyXG4gICAgcGFnZTogJ3N0b2NrJyxcclxuICAgIGlkOiAncmVwcm9kdWN0aW9uJyxcclxuICAgIG1ldGE6IHtcclxuICAgICAgdGl0bGU6ICdyZXByb2R1Y3Rpb24gYmVkcycsXHJcbiAgICAgIGxhYmVsOiAncmVwcm9kdWN0aW9uIGJlZHMnLFxyXG4gICAgICBjYXRlZ29yeTogJ3JlcHJvZHVjdGlvbicsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAge1xyXG4gICAgdXJsOiAnLyg/PGNhdGVnb3J5PihyZXByb2R1Y3Rpb258ZnVybml0dXJlfGFudGlxdWUpKS8oPzxzbHVnPlteL10rKV8oPzxpZD5bMC05XSspJyxcclxuICAgIHBhZ2U6ICdzdG9jaycsXHJcbiAgICBpZDogJ2l0ZW0nLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgdXJsOiAnLyg/PHNpemU+W14vXSspLyg/PHNsdWc+W14vXSspXyg/PGlkPlswLTldKyknLFxyXG4gICAgcGFnZTogJ3N0b2NrJyxcclxuICAgIGlkOiAnaXRlbScsXHJcbiAgfSxcclxuXVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWlSLFNBQVMsZUFBZTtBQUN6UyxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLG1CQUFtQjtBQUMxQixPQUFPLFdBQVc7QUFDbEIsT0FBTyxnQ0FBZ0M7QUFDdkMsU0FBUywwQkFBMEI7QUFDbkMsU0FBUyxrQkFBa0I7QUFDM0IsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sYUFBYTtBQUNwQixTQUFTLGNBQWM7OztBQ1RxUSxJQUFNLFNBQVM7QUFBQSxFQUN6UyxNQUFNO0FBQ1I7QUFFTyxJQUFNLFNBQVM7QUFBQSxFQUNwQjtBQUFBLElBQ0UsS0FBSztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sSUFBSTtBQUFBLElBQ0osTUFBTSxFQUFFLE9BQU8sUUFBUSxPQUFPLFlBQVk7QUFBQSxFQUM1QztBQUFBLEVBQ0E7QUFBQSxJQUNFLEtBQUs7QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLElBQUk7QUFBQSxJQUNKLE1BQU0sRUFBRSxPQUFPLFdBQVcsT0FBTyxvQkFBb0I7QUFBQSxFQUN2RDtBQUFBLEVBQ0E7QUFBQSxJQUNFLEtBQUs7QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLElBQUk7QUFBQSxJQUNKLE1BQU0sRUFBRSxPQUFPLFdBQVcsT0FBTyxvQkFBb0I7QUFBQSxFQUN2RDtBQUFBLEVBQ0E7QUFBQSxJQUNFLEtBQUs7QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLElBQUk7QUFBQSxJQUNKLE1BQU0sRUFBRSxPQUFPLFdBQVcsT0FBTyxpQkFBaUI7QUFBQSxFQUNwRDtBQUFBLEVBQ0E7QUFBQSxJQUNFLEtBQUs7QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLElBQUk7QUFBQSxJQUNKLE1BQU0sRUFBRSxPQUFPLHNCQUFzQixPQUFPLHFCQUFxQjtBQUFBLEVBQ25FO0FBQUEsRUFDQTtBQUFBLElBQ0UsS0FBSztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLElBQ1o7QUFBQSxFQUNGO0FBQUEsRUFDQTtBQUFBLElBQ0UsS0FBSztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLElBQ1I7QUFBQSxFQUNGO0FBQUEsRUFDQTtBQUFBLElBQ0UsS0FBSztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLElBQ1I7QUFBQSxFQUNGO0FBQUEsRUFDQTtBQUFBLElBQ0UsS0FBSztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLElBQ1I7QUFBQSxFQUNGO0FBQUEsRUFDQTtBQUFBLElBQ0UsS0FBSztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLElBQ1I7QUFBQSxFQUNGO0FBQUEsRUFDQTtBQUFBLElBQ0UsS0FBSztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1B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
