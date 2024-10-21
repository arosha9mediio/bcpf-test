"use client";

import { Button } from "@/components/ui/button";
import { RoutePaths } from "@/constants/route";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const AddUser = () => {
  const router = useRouter();
  const t = useTranslations();

  const onAddUser = () => {
    router.push(RoutePaths.addAdminUser.value("new"));
  };

  return <Button onClick={onAddUser}>{t("Add user")}</Button>;
};

export default AddUser;
