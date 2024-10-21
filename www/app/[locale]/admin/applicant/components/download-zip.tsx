"use client";

import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { isProd, isServer } from "@/lib/utils";
import { getFileName } from "@/utils/files";
import { ApplicantPageProps } from "./download-excel";

const getAccessToken = async () => {
  const session = isServer
    ? await getServerSession(authOptions)
    : await getSession();
  return session?.user?.accessToken;
};

const DownloadZip = ({
  searchParams,
}: {
  searchParams: ApplicantPageProps;
}) => {
  const baseURL = `${process.env.NEXT_PUBLIC_API}/`;

  const handleZipDownload = async () => {
    const stringParams = Object.fromEntries(
      Object.entries(searchParams?.searchParams).map(([key, value]) => [
        key,
        String(value),
      ]),
    );

    const queryString = new URLSearchParams(stringParams).toString();
    const url = `${baseURL}application/zip?${queryString}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await getAccessToken()}`,
        },
      });

      const contentDisposition = response.headers.get("Content-Disposition");

      const fileName = getFileName(contentDisposition, "application.zip");
      const decodedName = decodeURIComponent(fileName);

      if (!response.ok)
        throw new Error(`Failed to download file: ${response.statusText}`);

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

  return <Button onClick={handleZipDownload}>Download Zip</Button>;
};

export default DownloadZip;
