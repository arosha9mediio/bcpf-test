"use client";
import { getImagePath } from "@/utils/aws";
import { AnimatePresence, motion } from "framer-motion";
import { Upload } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslations } from "next-intl";

export default function UploadImage({
  error = false,
  value: files,
  onChange: setFiles,
  maxFiles = 8,
  accept = ["image/*"],
  sx,
  isSingle = true,
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
          className={`drop-zone w-full h-full ${
            isDragActive ? "opacity-75" : "hover:opacity-50"
          } ${isDragReject || error ? "border-red-500 bg-red-100 text-red-500" : ""}`}>
          <input {...getInputProps()} />
          {files.length === 0 ? (
            <div className="flex flex-col items-center justify-center cursor-pointer mr-5 w-full h-full border rounded ">
              <div>
                <Upload />
              </div>
              <p className="font-bold text-sm leading-4 text-center mt-1">
                {t("forms_lb_upload")}
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap ml-1 items-start overflow-x-auto h-full w-full">
              {files.map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative h-full w-full mr-2">
                  <img
                    className="img-preview w-full h-full object-cover rounded-md cursor-pointer"
                    src={typeof file === "string" ? file : file.preview}
                    alt="preview"
                  />
                  <div className="hidden">
                    {" "}
                    <Upload />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
