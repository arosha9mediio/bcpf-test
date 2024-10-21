import Head from "next/head";
import CmsHero from "../../../(routes)/components/cms/CmsHero";
import RootLayoutNew from "../../../(routes)/components/common/layout/RootLayout";
import YouthContent from "./components/YouthContent";
import "/public/assets/scss/master.scss";
import { useTranslations } from "next-intl";
import { Metadata } from "next";
import { getLocales } from "@/utils/string";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getLocales(locale);

  return {
    title: t.seo_youth_title,
    description: t.seo_youth_description,
    viewport: "width=device-width, initial-scale=1",
  };
}

const YouthDocumentary = () => {
  const t = useTranslations();

  return (
    <RootLayoutNew header="header2" footer="footer4">
      <CmsHero text={t("promo_project")} title={t("youth_h2")} />
      <YouthContent />
    </RootLayoutNew>
  );
};

export default YouthDocumentary;
