"use client";

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

export const handleZipDownload = async (searchParams: string) => {
  const url = `${process.env.NEXT_PUBLIC_API}/application/zip?contestId=${searchParams}`;

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
