"use client";
import { toast } from "@/components/ui/use-toast";
import { handleExcelDownload } from "./dashboard-excel";
import { handleZipDownload } from "./dashboard-zip";
import { DateTimeFormatter } from "@/components/table/formatters/DateTimeFormatter";
import { getErrorMessage } from "@/utils/error";
import { useTranslations } from "next-intl";

const ICONS = {
  doc: "/assets/imgs/files/ic_doc.png",
  default: "/assets/imgs/files/ic_document.png",
  download: "/assets/imgs/dashboard/ic_download.png",
  zip: "/assets/imgs/files/ic_zip.png",
} as const;

const QuickDownload = ({ downloads }) => {
  const t = useTranslations();

  const handleDownload = (download, type) => {
    try {
      if (download.Application?.length > 0) {
        switch (type) {
          case "excel":
            handleExcelDownload(download.id);
            break; // Ensure we exit the switch case
          case "zip":
            handleZipDownload(download.id);
            break;
          default:
            toast({
              variant: "destructive",
              description: t("Unsupported download type"),
            });
        }
      } else {
        toast({
          variant: "default",
          description: t("There is no data available"),
        });
      }
    } catch (e) {
      toast({
        variant: "destructive",
        description: getErrorMessage(e),
      });
    }
  };

  return (
    <div>
      <h2 className="text-lg text-[#212B36] font-bold mb-4">Quick Download</h2>
      <div className="space-y-4">
        {downloads.map(download => (
          <div key={download.id} className="space-y-4">
            <div className="block p-4 bg-white rounded-xl border-[1px] border-slate-300 hover:shadow-lg hover:shadow-slate-200 transition">
              <div className="flex justify-between items-center space-x-5">
                <div className="flex flex-row space-x-5 items-center">
                  <img
                    className="h-[32px] w-[32px]"
                    src={ICONS.doc}
                    alt="Document Icon"
                  />
                  <div>
                    <div className="text-sm font-semibold flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span>{download.title}</span>
                      </div>
                    </div>
                    <div className="text-xs flex items-center space-x-7">
                      <div className="text-[#919EAB] text-sm">
                        <DateTimeFormatter date={download.updatedAt} />
                      </div>
                      <div className="text-[#919EAB] text-sm">
                        {download.size}
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  className="h-[15px] w-[12px] cursor-pointer"
                  onClick={() => handleDownload(download, "excel")}
                  src={ICONS.download}
                  alt="Download Icon"
                />
              </div>
            </div>
            <div className="block p-4 bg-white rounded-xl border-[1px] border-slate-300 hover:shadow-lg hover:shadow-slate-200 transition">
              <div className="flex justify-between items-center space-x-5">
                <div className="flex flex-row space-x-5 items-center">
                  <img
                    className="h-[32px] w-[32px]"
                    src={ICONS.zip}
                    alt="Zip Icon"
                  />
                  <div>
                    <div className="text-sm font-semibold flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span>{download.title}</span>
                      </div>
                    </div>
                    <div className="text-xs flex items-center space-x-7">
                      <div className="text-[#919EAB] text-sm">
                        <DateTimeFormatter date={download.updatedAt} />
                      </div>
                      <div className="text-[#919EAB] text-sm">
                        {download.size}
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  className="h-[15px] w-[12px] cursor-pointer"
                  onClick={() => handleDownload(download, "zip")}
                  src={ICONS.download}
                  alt="Download Icon"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickDownload;
