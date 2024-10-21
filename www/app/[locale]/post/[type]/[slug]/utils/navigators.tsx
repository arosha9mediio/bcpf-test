"use client";

import { OnRowClick } from "@/components/table/TableBoilerplate";
import { Post } from "@/lib/__generated/sdk";
import { useMemo } from "react";

const handleRowClick: OnRowClick<Post> = async (payload, path, router, _) => {
  // const nonEmptyParams = Object.fromEntries(
  //   Object.entries(_).filter(
  //     ([_, value]) => value !== undefined && value !== null && value !== "",
  //   ),
  // );

  // const stringParams = Object.fromEntries(
  //   Object.entries(nonEmptyParams).map(([key, value]) => [key, String(value)]),
  // );

  const stringParams = Object.fromEntries(
    Object.entries(_)
      .filter(([_, value]) => value !== undefined && value !== null && value !== "")
      .map(([key, value]) => [key, String(value)]),
  );
  

  const queryString = new URLSearchParams(stringParams).toString();

  try {
    if (path && router) {
      if (payload?.slug?.length !== 0) {
        router.push(`${path}/${payload?.slug}/?${queryString}`);
        return;
      }

      // fallback
      router.push(`${path}/${payload?.id}?${queryString}`);
    }
  } catch (error) {
    console.error("Error handling row click:", error);
  }
};

export { handleRowClick };
