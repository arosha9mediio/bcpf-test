"use client";

import { OnRowClick } from "@/components/table/TableBoilerplate";
import { ContestApply, Post } from "@/lib/__generated/sdk";

const handleRowClick: OnRowClick<ContestApply> = async (
  payload,
  _path,
  router,
  _,
) => {
  const stringParams = Object.fromEntries(
    Object.entries(_)
      .filter(
        ([_, value]) => value !== undefined && value !== null && value !== "",
      )
      .map(([key, value]) => [key, String(value)]),
  );

  const queryString = new URLSearchParams(stringParams).toString();
  const path = "contest";

  try {
    if (path && router) {
      if (payload?.id?.length !== 0) {
        router.push(`${path}/${payload?.contestId}/?${queryString}`);
        return;
      }

      // fallback
      router.push(`${path}/${payload?.contestId}?${queryString}`);
    }
  } catch (error) {
    console.error("Error handling row click:", error);
  }
};

export { handleRowClick };
