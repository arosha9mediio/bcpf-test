import s3UploaderPreSigned from "../s3-presigned";

export const getLastPartOfString = (string, separater) => {
  const parts = string.split(separater);
  return parts.length > 1 ? parts[parts.length - 1] : string;
};

export default function useUploadFiles() {
  async function uploadFiles(files,type?:string,path?:string) {
    if (files.length > 0) {
      let attachFiles = [];
      try {
        const index = 0;
        for await (const file of files) {
          const generatedFileName = file.name;
          // const uploadPath = `files/${generatedFileName}`;
          
          const result = await s3UploaderPreSigned(file, type, path);
          const attachFile = {
            path: result,
            originalName: file?.name || generatedFileName,
          };
          attachFiles = [...attachFiles, attachFile];
        }

        return attachFiles;
      } catch (error) {
        console.log("Error uploading files", error);
        throw error;
      }
    }
  }

  return {
    uploadFiles,
  };
}
