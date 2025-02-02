import { symlinks } from '@raiz/cli'
import { mkdirSync } from 'fs'
/*
 symlinking & other install steps for development
 You can do this manually.
 */
 mkdirSync('./assets')

symlinks(
    ['./public/image/', `../image_generated/image/`],
    ['./assets/image/', `../image_source/image/`],
    ['./public/sitemap/', `../sitemap/`]
)