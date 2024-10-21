"use client";

import { OnRowClick } from "@/components/table/TableBoilerplate";
import { RoutePaths } from "@/constants/route";
import { Contest, Post } from "@/lib/__generated/sdk";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const handleRowClick: OnRowClick<Contest> = async (payload, path, router, _) => {
    
    try {
        router.push(RoutePaths.adminContestApplicant.value(payload.id));
  } catch (error) {
    console.error("Error handling row click:", error);
  }
};

export { handleRowClick };
