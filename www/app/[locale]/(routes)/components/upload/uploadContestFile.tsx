// "use client";
// import { getImagePath } from "@/utils/aws";
// import { AnimatePresence, motion } from "framer-motion";
// import { Upload } from "lucide-react";
// import { useCallback } from "react";
// import { useDropzone } from "react-dropzone";

// export default function UploadContestFile({
//   error = false,
//   value: files,
//   onChange: setFiles,
//   maxFiles = 8,
//   accept = ["**/*"],
//   sx,
//   isSingle = true,
//   ...other
// }) {
//   const handleDrop = useCallback(
//     acceptedFiles => {
//       if (isSingle) {
//         const newFile = acceptedFiles[0];
//         newFile.preview = URL.createObjectURL(newFile);
//         setFiles([newFile]);
//       } else {
//         const newFiles = acceptedFiles.map(file => {
//           file.preview = URL.createObjectURL(file);
//           return file;
//         });
//         setFiles(prevFiles => [...newFiles, ...prevFiles].slice(0, maxFiles));
//       }
//     },
//     [isSingle, setFiles],
//   );

//   const handleRemoveAll = () => {
//     setFiles([]);
//   };

//   const handleRemoveFile = file => {
//     const newFiles = files.filter(f => f !== file);
//     setFiles(newFiles);
//   };

//   const { getRootProps, getInputProps, isDragActive, isDragReject } =
//     useDropzone({
//       onDrop: handleDrop,
//       maxFiles,
//       accept: { "**/*": [] },
//     });

//   return (
// <div className="flex flex-row" style={sx} {...other}>
//   <div className="flex flex-row w-full">
//     <div
//       {...getRootProps()}
//       className={`drop-zone ${
//         isDragActive ? "opacity-75" : "hover:opacity-50"
//       } ${isDragReject || error ? "border-red-500 bg-red-100 text-red-500" : ""}`}>
//       <input {...getInputProps()} />

//       <div className="flex flex-col items-center justify-center cursor-pointer mr-5 h-24 w-[200px] border rounded">
//         <div>
//           <Upload />
//         </div>
//         <p className="font-bold text-sm leading-4 text-center mt-1">
//           Upload
//         </p>
//         {files.length > 0 && <p className="text-sm">1 file added</p>}
//       </div>
//     </div>
//   </div>
// </div>
//   );
// }

// // Tailwind CSS styles
// const styles = {
//   dropZone:
//     "outline-none flex h-24 w-28 text-center mt-3 items-center flex-col justify-center p-5 border border-dashed border-gray-400 hover:opacity-75 cursor-pointer",
//   stepImg: "w-7 h-7 mx-auto",
//   imgPreview: "w-24 h-24 object-cover rounded-md mt-4",
// };

"use client";
import { getImagePath } from "@/utils/aws";
import { AnimatePresence, motion } from "framer-motion";
import { Paperclip, Upload } from "lucide-react";
import { useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslations } from "next-intl";
export default function UploadContestFile({
  error = false,
  value: files,
  onChange: setFiles,
  maxFiles = 8,
  accept = ["image/*"],
  sx,
  isSingle = false,
  readOnly = false,
  ...other
}) {
  const fileRef = useRef(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) {
      return;
    }

    const fileList = e.target.files;
    if (fileList) {
      const filesArray = Array.from(fileList);
      const newFiles = filesArray.map(file => {
        //@ts-ignore
        file.preview = URL.createObjectURL(file);
        return file;
      });
      setFiles(prevFiles => [...newFiles, ...prevFiles]);
    }
  };
  const handleRemoveFile = file => {
    if (readOnly) {
      return;
    }

    const newFiles = files.filter(f => f !== file);
    setFiles(newFiles);
  };

  const t = useTranslations();

  return (
    <div className="">
      <div className="sm:flex rounded items-center">
        <div>
          <div className="hidden">
            <input
              readOnly={readOnly}
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              multiple
              ref={fileRef}
              onChange={handleFileChange}
            />
          </div>
          {/* <Paperclip
            className="mt-1 h-9 ml-2"
            onClick={() => fileRef.current.click()}></Paperclip> */}
          <div className="flex flex-row" style={sx} {...other}>
            <div
              onClick={() => !readOnly && fileRef.current.click()}
              className="flex flex-row w-full">
              <div className="flex flex-col items-center justify-center cursor-pointer mr-5 h-24 w-[200px] border rounded dark:border-slate-500">
                <div>
                  <Upload />
                </div>
                <p className="font-bold text-sm leading-4 text-center mt-1">
                  {t("forms_lb_upload")}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap ml-1 items-start overflow-x-auto mb-1 mt-1 ">
          <AnimatePresence>
            {files?.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative mr-2 m-0 p-0 px-2 rounded bg-slate-200 mt-1 mb-1 dark:bg-slate-700">
                <button
                  type="button"
                  onClick={() => handleRemoveFile(file)}
                  className="absolute top-0 right-1 bg-gray-400 text-white rounded-full p-1 ml-4 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
                <div className="text-sm p-1 mr-5 line-clamp-1">
                  {file?.name ? file.name : "file"}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
const styles = {
  dropZone:
    "outline-none flex h-24 w-28 text-center mt-3 items-center flex-col justify-center p-5   border-gray-400 hover:opacity-75 cursor-pointer",
  stepImg: "w-7 h-7 mx-auto",
  imgPreview: "w-24 h-24 object-cover rounded-md mt-4",
};
