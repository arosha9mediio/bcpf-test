import { Button } from "@/components/ui/button";
import Link from "next/link";

const FILE_ICONS = {
  doc: "/assets/imgs/files/ic_doc.png",
  default: "/assets/imgs/files/ic_document.png",
  hwp: "/assets/imgs/files/ic_hwp.png",
  txt: "/assets/imgs/files/ic_txt.png",
  zip: "/assets/imgs/files/ic_zip.png",
  png: "/assets/imgs/files/ic_img.png",
  jpg: "/assets/imgs/files/ic_img.png",
  pdf: "/assets/imgs/files/ic_pdf.png",
} as const;

type Extensions =
  | "zip"
  | "doc"
  | "hwp"
  | "txt"
  | "docx"
  | "png"
  | "pdf"
  | "jpg"
  | null;

const getFileExtension = (filename: string): Extensions => {
  if (!filename || filename?.length === 0) {
    return null;
  }

  const dotIndex = filename.lastIndexOf(".");

  if (dotIndex === -1) {
    return null;
  }

  return filename?.slice(dotIndex + 1) as Extensions;
};

type GetAssetProps = {
  extension: Extensions;
};

type GetAssetType = (props: GetAssetProps) => JSX.Element;

// could use variants for files
const GetAsset: GetAssetType = ({ extension }) => {
  const loadIcon = (): string | null => {
    switch (extension) {
      case "zip":
        return FILE_ICONS.zip;

      case "doc":
        return FILE_ICONS.doc;

      case "docx":
        return FILE_ICONS.doc;

      case "hwp":
        return FILE_ICONS.hwp;

      case "txt":
        return FILE_ICONS.txt;

      case "png":
        return FILE_ICONS.png;

      case "jpg":
        return FILE_ICONS.jpg;

      case "pdf":
        return FILE_ICONS.pdf;

      case null:
        return null;

      default:
        return FILE_ICONS.default;
    }
  };

  const icon = loadIcon();

  if (!icon) return <p>{"-"}</p>;

  return (
    <img className="max-h-[34px] max-w-[24px]" src={icon} alt="My Image" />
  );
};

export { GetAsset };

type FileDownloaderProps = {
  doc: string;
  url: string;
  label: string;
};

type FileDownloaderType = (props: FileDownloaderProps) => JSX.Element;

const FileDownloader: FileDownloaderType = ({ doc, url, label }) => {
  const extension = getFileExtension(doc);

  return (
    <div className="flex flex-row justify-items items-center gap-3">
      <GetAsset extension={extension} />
      {doc}
      {extension && (
        <Link prefetch={false} replace href={url} target="_parent">
          <Button
            variant="secondary"
            className="bg-[#DFE3E8] text-black dark:hover:text-white dark:hover:bg-slate-600">
            {label}
          </Button>
        </Link>
      )}
    </div>
  );
};

export { FileDownloader };
export { getFileExtension };
