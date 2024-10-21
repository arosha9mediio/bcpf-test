import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MyPageDetails from "../../(routes)/components/my-page/MyPageDetails";
import { useTranslations } from "next-intl";

type PageType = () => JSX.Element;

const Page: PageType = () => {
  const t = useTranslations();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("admin_edit_profile")}</CardTitle>
        <CardDescription>{t("admin_edit_profile_description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <MyPageDetails className="" />
      </CardContent>
    </Card>
  );
};

export default Page;
