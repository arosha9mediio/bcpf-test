"use client";

import { Button } from "@/components/ui/button";
import { RoutePaths } from "@/constants/route";
import { useRouter } from "next/navigation";

const AddNotice = () => {
  const router = useRouter();

  const onAddNotice = () => {
    router.push(RoutePaths.addAdminNotice.value("new"));
  };

  return <Button onClick={onAddNotice}>Add notice</Button>;
};

export default AddNotice;
