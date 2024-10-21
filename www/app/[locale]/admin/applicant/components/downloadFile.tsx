"use client";

import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { EmbedApplyFileType } from "@/lib/__generated/sdk";
import { authOptions } from "@/lib/auth";
import { isProd, isServer } from "@/lib/utils";
import { getFileName } from "@/utils/files";

const getAccessToken = async () => {
  const session = isServer
    ? await getServerSession(authOptions)
    : await getSession();
  return session?.user?.accessToken;
};

type ApplicantPageProps = {
  applicationId?: string;
  file?: EmbedApplyFileType[];
};

// const contentTypeToExtension = {
//   "application/pdf": ".pdf",
//   "application/msword": ".doc",
//   "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
//     ".docx",
//   "application/vnd.ms-excel": ".xls",
//   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ".xlsx",
//   "text/plain": ".txt",
//   // "image/jpeg": ".jpg",
//   // "image/png": ".png",
// };

const DownloadFile = ({ applicationId, file }: ApplicantPageProps) => {
  const baseURL = `${process.env.NEXT_PUBLIC_API}/`;
  const docs = file?.filter(item => item?.type === "DOC");

  const handleDownload = async () => {
    const url = `${baseURL}application/file/${applicationId}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await getAccessToken()}`,
        },
      });

      // const contentType = response.headers.get("Content-Type");
      const contentDisposition = response.headers.get("Content-Disposition");

      const fileName = getFileName(contentDisposition, file[0].filename);

      if (!response.ok)
        throw new Error(`Failed to download file: ${response.statusText}`);

      const blob = await response.blob();
      const oUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = oUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(oUrl);
      a.remove();
    } catch (error) {
      console.error("Error occurred during file download", error);
    }
  };

  return (
    <div>
      {docs?.[0] && <Button onClick={handleDownload}>파일 다운로드</Button>}
    </div>
  );
};

export default DownloadFile;
