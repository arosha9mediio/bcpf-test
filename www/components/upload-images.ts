import { Upload } from "@/types";
import s3UploaderPreSigned from "../app/[locale]/(routes)/components/s3-presigned";

export const getLastPartOfString = (string: string, separator: string) => {
  const parts = string.split(separator);
  return parts.length > 1 ? parts[parts.length - 1] : string;
};

export async function uploadImages(files: Upload[],type?:string,path?:string) {
  if (files.length > 0) {
    let attachFiles = [];
    try {
      for await (const file of files) {
        const generatedFileName = `${getLastPartOfString(
          file.preview,
          "/",
        )}.${getLastPartOfString(file.type, "/")}`;
        // const uploadPath = `images/${generatedFileName}`;
        
        const result = await s3UploaderPreSigned(file, type, path);
        const attachFile = {
          path: result,
          originalName: file?.name || generatedFileName,
        };
        attachFiles = [...attachFiles, attachFile];
      }
      return attachFiles;
    } catch (error) {
      console.log("Error uploading images", error);
      throw error;
    }
  }
}
