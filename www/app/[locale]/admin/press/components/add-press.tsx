"use client";

import { Button } from "@/components/ui/button";
import { RoutePaths } from "@/constants/route";
import { useRouter } from "next/navigation";

const AddPress = () => {
  const router = useRouter();

  const onAddPress = () => {
    router.push(RoutePaths.addAdminPress.value("new"));
  };

  return <Button onClick={onAddPress}>Add Press</Button>;
};

export default AddPress;
