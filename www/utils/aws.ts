const s3Endpoint = process.env.NEXT_PUBLIC_S3_ENDPOINT;

export const getImagePath = (path: string) => {
  let concatPath = "";
  if (!path || !s3Endpoint) {
    return concatPath;
  }

  if (path.includes("http")) {
    concatPath = path;
  } else {
    concatPath = s3Endpoint + path;
  }

  return concatPath;
};
