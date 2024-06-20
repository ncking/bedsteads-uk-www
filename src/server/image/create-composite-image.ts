import sharp from 'sharp'

export function makeMultipleSrc({ images, srcDir }) {
  const height = 1320
  const width = 2000
  const w1 = Math.floor(width / 2)
  return {
    width,
    height,
    background: '#000000',
    images: [
      { src: `${srcDir}/${images[0].src}`, width: w1, height, top: 0, left: 0 },
      { src: `${srcDir}/${images[1].src}`, width: width - w1, height, top: 0, left: w1 },
    ],
  }
}

export const createCompositeImage = async ({
  width: canvasWidth,
  height: canvasHeight,
  background = '#00f000',
  images }) => {
  const canvas = sharp({
    // failOnError: false,
    create: {
      width: canvasWidth,
      height: canvasHeight,
      channels: 4,
      background,
    },
  })

  const buffers = []
  const imagesWithCoords = images.map((image) => {
    const { src, width, height, left, top } = image
    // always resize to center ... but we couldpass other options
    const img = sharp(src).resize({
      width,
      height,
    })
    const buffer = img.toBuffer()
    buffers.push(buffer)

    return ({
      input: buffer,
      left,
      top,
      width,
      height,
    })
  })

  await Promise.allSettled(buffers).then((resolvedBuffer) => {
    resolvedBuffer.map((buff, i) => {
      imagesWithCoords[i].input = buff.value
    })
  })
  /**
     * We MUST flatten to a new image, otherwise checks like canvas size
     * will ref the composite parts;
     * ESP you will get the error "post-composite image size is smaller than the composite input image size" as our filnam images
     * are smallerthat the origial composite parts
     */
  const canvas2 = await canvas.composite(imagesWithCoords).jpeg().toBuffer()
  const newImage = await sharp(canvas2)
  return newImage
}
