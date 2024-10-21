"use client";

import { OnRowClick } from "@/components/table/TableBoilerplate";
import { RoutePaths } from "@/constants/route";
import { Contest, Post, ContestApply } from "@/lib/__generated/sdk";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const handleRowClick: OnRowClick<ContestApply> = async (payload, path, router, _) => {

  const mode = new URLSearchParams({ mode: "readOnly"}).toString();
  
    try {
        router.push('/contest/'+ payload.Contest.id + '/' + payload.id + '?' + mode);
  } catch (error) {
    console.error("Error handling row click:", error);
  }
};

export { handleRowClick };
