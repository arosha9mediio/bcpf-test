"use client";

import { Button } from "@/components/ui/button";
import { RoutePaths } from "@/constants/route";
import { useRouter } from "next/navigation";

const AddSlider = () => {
  const router = useRouter();

  const onAddSlider = () => {
    router.push(RoutePaths.addAdminHomeMainSlider.value("new"));
  };

  return <Button onClick={onAddSlider}>Add slider</Button>;
};

export default AddSlider;
