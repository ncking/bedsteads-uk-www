import * as dbase from '#dbase'
import { getImageAssetFilePath, getimagesize, stockImageUrlRegex, renderStockImage, stockImageTileSrc, stockGallerySrc, getMainImageSrc, getThumbSrc  } from "@server"
import { fixSlashes } from '@raiz/cli'

/**
 * loop all beds % find if we have images to create the
 * thumbs & sizes
 * If we dont then add to the 'remove' list
 * 
 */
let stop = false
await dbase.findAll().then(records => {


    const failedIds = []

    records.map(item => {
        if (stop) {
            return
        }
        const { id, images = [], sold, deleted, category } = item
        let hasApassingImage = false
        let deleteItem = false
        images.map(img => {
            const { src } = img
            const { width, height, size } = getimagesize(getImageAssetFilePath({ id, filename: src }))
            if (width >= 2000) {
                hasApassingImage = true
            }
        })

        if (!hasApassingImage && (id < 1600)) {
            if (!sold && !deleted) {
                console.log('skipping', id)
            } else {
                deleteItem = true
            }
        }

        /**
         * 
         */
        if (deleteItem) {
            failedIds.push(id)
            // delet record from dbase
            dbase.deleteRecordById(id)
        } else {
            const isFurniture = category === 'furniture';

            images.map(async (img, i) => {
                const { src } = img
                const file = src.split('.')[0]
                const args = { ...img, id, isFurniture }
                // PATH DRIVEN
                if (!i) {
                  await imageGen(stockImageTileSrc(args)) //{ id, src, r }
                }
                await imageGen(getThumbSrc(args))
                //
                const largeImage = i ? stockGallerySrc(args) : getMainImageSrc(args)
                await imageGen(getSizedSrc(largeImage, 0))
                await imageGen(getSizedSrc(largeImage, 1))
                await imageGen(getSizedSrc(largeImage, 2))
                await imageGen(getSizedSrc(largeImage, 3))
            })

        }
    })
    //otal: 1676, failed : 1065 good ones
    console.log(`total: ${records.length}, failed : ${failedIds.length}`)
})



function getSizedSrc(src, size = 0) {
    return src.replace('.jpg', `,s_${size}.jpg`)
}

async function imageGen(pathname) {
    const outFile = fixSlashes(`public/${pathname}`);
    const { token, size, id, file } = stockImageUrlRegex(pathname)
    await renderStockImage({ id, file, pathname, outFile, token, size })
}