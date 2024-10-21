"use client";

import { Button } from "@/components/ui/button";
import { RoutePaths } from "@/constants/route";
import { useRouter } from "next/navigation";

const AddPage = () => {
  const router = useRouter();

  const onAddPage = () => {
    router.push(RoutePaths.addAdminPage.value("new"));
  };

  return <Button onClick={onAddPage}>Add page</Button>;
};

export default AddPage;
