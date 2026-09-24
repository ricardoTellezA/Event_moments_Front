type CompressImageOptions = {
  maxFileSize?: number;
  maxImageSide?: number;
  outputType?: string;
  qualities?: number[];
};

const defaultMaxFileSize = 4 * 1024 * 1024;
const defaultMaxImageSide = 2400;
const defaultQualities = [0.9, 0.82, 0.74];

export async function compressImageFile(
  file: File,
  {
    maxFileSize = defaultMaxFileSize,
    maxImageSide = defaultMaxImageSide,
    outputType = "image/jpeg",
    qualities = defaultQualities,
  }: CompressImageOptions = {},
) {
  const image = document.createElement("img");
  const url = URL.createObjectURL(file);

  try {
    image.src = url;
    await image.decode();

    const scale = Math.min(1, maxImageSide / Math.max(image.width, image.height));
    const width = Math.max(1, Math.round(image.width * scale));
    const height = Math.max(1, Math.round(image.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d")?.drawImage(image, 0, 0, width, height);

    for (const quality of qualities) {
      const blob = await canvasToBlob(canvas, outputType, quality);

      if (blob.size <= maxFileSize) {
        return new File([blob], replaceExtension(file.name), {
          type: outputType,
        });
      }
    }

    throw new Error("IMAGE_TOO_LARGE");
  } finally {
    URL.revokeObjectURL(url);
  }
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
          return;
        }

        reject(new Error("Image compression failed"));
      },
      type,
      quality,
    );
  });
}

function replaceExtension(fileName: string) {
  return fileName.replace(/\.[^.]+$/, "") + ".jpg";
}
