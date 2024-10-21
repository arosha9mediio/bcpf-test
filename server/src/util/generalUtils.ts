import { Response } from 'express';
import contentDisposition from 'content-disposition';

type ResponseHeaders =
  | 'Content-Disposition'
  | 'Content-Type'
  | 'Access-Control-Expose-Headers'; // add more if we need

// type ContentType = 'application/zip' | 'application/json' | 'text/html';

/**
 * use to set headers for response
 * @param res Express Response
 * @param contentType content type of the response
 * @param fileName filename for disposition
 * @param exposedHeaders headers to expose to the client
 * @returns
 */
export const setHeaders = (
  res: Response,
  contentType: string,
  fileName: string,
  exposedHeaders: ResponseHeaders[]
) => {
  const contentDispositionHeader = contentDisposition(fileName);

  return res.set({
    'Content-Disposition': contentDispositionHeader,
    'Content-Type': contentType,
    'Access-Control-Expose-Headers': exposedHeaders.join(','),
  });
};
