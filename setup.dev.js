import { symlinks } from '@raiz/cli'
/*
 symlinking & other install steps for development
 You can do this manually.
 */

symlinks(
    ['./public/image/', `../image_generated/image/`],
    ['./assets/image/', `../image_source/image/`],
    ['./public/sitemap/', `../sitemap/`]
)