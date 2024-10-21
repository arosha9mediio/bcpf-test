"use client";
import { getImagePath } from "@/utils/aws";
import { AnimatePresence, motion } from "framer-motion";
import { Upload } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslations } from "next-intl";

export default function UploadMultiFileMini({
  error = false,
  value: files,
  onChange: setFiles,
  maxFiles = 8,
  accept = ["image/*"],
  sx,
  isSingle = false,
  ...other
}) {
  const handleDrop = useCallback(
    acceptedFiles => {
      if (isSingle) {
        const newFile = acceptedFiles[0];
        newFile.preview = URL.createObjectURL(newFile);
        setFiles([newFile]);
      } else {
        const newFiles = acceptedFiles.map(file => {
          file.preview = URL.createObjectURL(file);
          return file;
        });
        setFiles(prevFiles => [...newFiles, ...prevFiles].slice(0, maxFiles));
      }
    },
    [isSingle, setFiles],
  );

  const handleRemoveAll = () => {
    setFiles([]);
  };

  const handleRemoveFile = file => {
    const newFiles = files.filter(f => f !== file);
    setFiles(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop: handleDrop,
      maxFiles,
      accept: { "image/*": [] },
    });

  const t = useTranslations();

  return (
    <div className="flex flex-row" style={sx} {...other}>
      <div className="flex flex-row w-full">
        <div
          {...getRootProps()}
          className={`drop-zone ${
            isDragActive ? "opacity-75" : "hover:opacity-50"
          } ${
            isDragReject || error
              ? "border-red-500 bg-red-100 text-red-500"
              : ""
          }`}>
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center cursor-pointer mr-5  w-24 h-24 border rounded dark:border-slate-500">
            <div>
              <Upload />
            </div>
            <p className="font-bold text-sm leading-4 text-center mt-1">
              {t("admin_select_image")}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap ml-1 items-start overflow-x-auto">
          <AnimatePresence>
            {files.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative h-24 w-28  mr-2">
                <button
                  type="button"
                  onClick={() => handleRemoveFile(file)}
                  className="absolute top-0 right-0 bg-gray-300 text-black rounded-full p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
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
                <img
                  className="img-preview w-24 h-24 object-cover rounded-md"
                  src={
                    typeof file === "string"
                      ? getImagePath(file)
                      : file?.preview || file?.path || file?.original || file
                  }
                  alt="preview"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Tailwind CSS styles
const styles = {
  dropZone:
    "outline-none flex h-24 w-28 text-center mt-3 items-center flex-col justify-center p-5 border border-dashed border-gray-400 hover:opacity-75 cursor-pointer",
  stepImg: "w-7 h-7 mx-auto",
  imgPreview: "w-24 h-24 object-cover rounded-md mt-4",
};
