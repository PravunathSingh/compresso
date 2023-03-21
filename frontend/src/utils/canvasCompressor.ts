export const compressImageWithCanvas = async (
  file: File,
  quality: number,
  type: string
) => {
  // get as image data
  const imageBitmap = await createImageBitmap(file);

  // create canvas
  const canvas = document.createElement('canvas');
  canvas.width = imageBitmap.width;
  canvas.height = imageBitmap.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

  // draw image
  ctx.drawImage(imageBitmap, 0, 0);

  // turn into blob
  const blob = await new Promise<Blob | null>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        resolve(blob);
      },
      file.type,
      quality
    );
  });

  if (!blob) {
    throw new Error('Could not compress image');
  }

  return new File([blob], file.name, { type: file.type });
};
