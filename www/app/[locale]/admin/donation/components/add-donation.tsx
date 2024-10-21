"use client";

import { Button } from "@/components/ui/button";
import { RoutePaths } from "@/constants/route";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const AddDonation = () => {
  const router = useRouter();
  const t = useTranslations();

  const onAddDonation = () => {
    router.push(RoutePaths.addAdminDonation.value("new"));
  };

  return <Button onClick={onAddDonation}>{t("Add donation")}</Button>;
};

export default AddDonation;
