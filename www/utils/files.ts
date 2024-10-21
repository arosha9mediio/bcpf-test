import { EmbedApplyFileType } from "@/lib/__generated/sdk";

/**
 * gets the filename from Content-Disposition header
 * @param contentDisposition Content-Disposition header
 * @param defaultName default file name
 * @returns
 */
export const getFileName = (
  contentDisposition: string | null,
  defaultName: string,
) => {
  if (!contentDisposition) return defaultName;

  const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
  const matches = filenameRegex.exec(contentDisposition);

  const filename =
    matches != null && matches[1] ? matches[1].replace(/['"]/g, "") : "";

  return filename;
};

/**
 * Triggers the download of a file by creating a temporary anchor element.
 *
 * @param path -the  path to the file that needs to be downloaded.
 * @param filename - the name to be used for the downloaded file.
 */
export const downloadFile = (path: string, filename: string) => {
  const zipUrl = path;
  const link = document.createElement("a");
  link.href = zipUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
