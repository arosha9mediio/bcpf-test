"use client";

import { Button } from "@/components/ui/button";
import { RoutePaths } from "@/constants/route";
import { useRouter } from "next/navigation";

const AddTitleAndDescription = () => {
  const router = useRouter();

  const onAddTitleAndDescription = () => {
    router.push(RoutePaths.updateAdminHomeMainSliderTitleAndDescription.value);
  };

  return (
    <Button onClick={onAddTitleAndDescription} variant="secondary">
      Update title&description
    </Button>
  );
};

export default AddTitleAndDescription;
