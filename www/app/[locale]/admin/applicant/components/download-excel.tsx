"use client";

import { Button } from "@/components/ui/button";
import { PaginatedRequest } from "@/lib/__generated/sdk";
import { authOptions } from "@/lib/auth";
import { isProd, isServer } from "@/lib/utils";
import { getFileName } from "@/utils/files";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

const getAccessToken = async () => {
  const session = isServer
    ? await getServerSession(authOptions)
    : await getSession();
  return session?.user?.accessToken;
};

export type ApplicantPageProps = {
  searchParams?: PaginatedRequest;
};

const DownloadExcel = ({
  searchParams,
}: {
  searchParams: ApplicantPageProps;
}) => {
  const handleDownload = async () => {
    const stringParams = Object.fromEntries(
      Object.entries(searchParams.searchParams).map(([key, value]) => [
        key,
        String(value),
      ]),
    );

    const queryString = new URLSearchParams(stringParams).toString();
    const url = `${process.env.NEXT_PUBLIC_API}application/excel?${queryString}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await getAccessToken()}`,
        },
      });

      if (!response.ok)
        throw new Error(`Failed to download file: ${response.statusText}`);

      const contentDisposition = response.headers.get("Content-Disposition");

      const fileName = getFileName(contentDisposition, "applicants.xlsx");
      const decodedName = decodeURIComponent(fileName);

      const blob = await response.blob();
      const oUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = oUrl;
      a.download = decodedName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(oUrl);
      a.remove();
    } catch (error) {
      console.error("Error occurred during file download", error);
    }
  };

  return <Button onClick={handleDownload}>Download Excel</Button>;
};

export default DownloadExcel;
