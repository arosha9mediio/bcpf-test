"use client";

import { RoutePaths } from "@/constants/route";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace(RoutePaths.home.value);
  }, []);
  return <></>;
};

export default DashboardPage;
