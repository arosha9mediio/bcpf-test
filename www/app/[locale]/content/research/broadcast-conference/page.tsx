import React from "react";
import RootLayoutNew from "../../../(routes)/components/common/layout/RootLayout";
import "/public/assets/scss/master.scss";
import CmsHero from "@/app/[locale]/(routes)/components/cms/CmsHero";
import BroadcastView from "./BroadcastView";
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
    title: t.seo_conference_title,
    description: t.seo_conference_description,
    viewport: "width=device-width, initial-scale=1",
  };
}

const BroadcastConference = () => {
  const t = useTranslations();

  return (
    <RootLayoutNew header="header2" footer="footer4">
      <CmsHero text={t("research_h1")} title={t("conference_h2")} />
      <BroadcastView />
    </RootLayoutNew>
  );
};

export default BroadcastConference;
