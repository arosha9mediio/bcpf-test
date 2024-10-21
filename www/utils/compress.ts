import imageCompression from "browser-image-compression";

const units: string[] = [
  "bytes",
  "KiB",
  "MiB",
  "GiB",
  "TiB",
  "PiB",
  "EiB",
  "ZiB",
  "YiB",
];

function niceBytes(x: number): string {
  let l = 0;
  let n = parseInt(x.toString(), 10) || 0;

  while (n >= 1024 && ++l) {
    n /= 1024;
  }

  return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}

const imageSize = (
  file: File,
): Promise<{ width: number; height: number }> | undefined => {
  if (!file) {
    return;
  }

  const reader = new FileReader();

  reader.readAsDataURL(file);

  const promise = new Promise<{ width: number; height: number }>(
    (resolve, reject) => {
      reader.onload = function (e) {
        const image = new Image();

        image.src = e?.target?.result as string;

        image.onload = function () {
          const height = image.height;
          const width = image.width;

          resolve({ width, height });
        };

        image.onerror = reject;
      };
    },
  );

  return promise;
};

export const compressImage = async (file: File): Promise<File | undefined> => {
  if (!file) {
    return;
  }
  const imageDimensions = await imageSize(file);
  if (!imageDimensions) {
    return;
  }
  console.log({ imageDimensions, size: niceBytes(file.size) });

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight:
      imageDimensions.width > 1300 ? 1300 : imageDimensions.width,
    useWebWorker: true,
  };

  const compressedImg = await imageCompression(file, options);

  return compressedImg;
};
