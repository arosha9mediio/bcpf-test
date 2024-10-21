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

export const handleExcelDownload = async (searchParams: string) => {
  const baseURL = `${process.env.NEXT_PUBLIC_API}/`;

  const url = `${baseURL}application/excel?contestId=${searchParams}`;

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
