"use client";
import { getImagePath } from "@/utils/aws";
import { AnimatePresence, motion } from "framer-motion";
import { Paperclip } from "lucide-react";
import { useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
export default function UploadFiles({
  error = false,
  value: files,
  onChange: setFiles,
  maxFiles = 8,
  accept = ["image/*", "application/x-hwp"],
  sx,
  isSingle = false,
  ...other
}) {
  const fileRef = useRef(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const filesArray = Array.from(fileList);
      const newFiles = filesArray.map(file => {
        if (!file.type) {
          const extension = file.name.split(".").pop();
          if (extension === "hwp") {
            file = new File([file], file.name, { type: "application/x-hwp" });
          }
        }
        //@ts-ignore
        file.preview = URL.createObjectURL(file);
        return file;
      });
      setFiles(prevFiles => [...newFiles, ...prevFiles]);
    }
  };
  const handleRemoveFile = file => {
    const newFiles = files.filter(f => f !== file);
    setFiles(newFiles);
  };
  return (
    <div className="w-full">
      <div className="flex border border-input rounded-md items-center min-h-[40px] text-slate-500 cursor-pointer hover:bg-slate-100 hover:text-inherit dark:hover:bg-accent dark:border-slate-500">
        <div>
          <div className="hidden">
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              multiple
              ref={fileRef}
              onChange={handleFileChange}
            />
          </div>
          <Paperclip
            className="h-5 ml-2"
            onClick={() => fileRef.current.click()}></Paperclip>
        </div>
        <div className="flex flex-wrap ml-1 items-start overflow-x-auto mb-1 mt-1 ">
          <AnimatePresence>
            {files.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative  mr-2 m-0 p-0 border rounded bg-slate-200 mt-1 mb-1">
                <button
                  type="button"
                  onClick={() => handleRemoveFile(file)}
                  className="absolute top-0 right-0 bg-gray-300 text-white rounded-full p-1 ml-4 mt-1">
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
    "outline-none flex h-24 w-28 text-center mt-3 items-center flex-col justify-center p-5 border border-dashed border-gray-400 hover:opacity-75 cursor-pointer",
  stepImg: "w-7 h-7 mx-auto",
  imgPreview: "w-24 h-24 object-cover rounded-md mt-4",
};
