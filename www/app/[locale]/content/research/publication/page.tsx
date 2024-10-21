import React from "react";
import RootLayoutNew from "../../../(routes)/components/common/layout/RootLayout";
import "/public/assets/scss/master.scss";
import CmsHero from "@/app/[locale]/(routes)/components/cms/CmsHero";
import Publications from "./components/Publications";
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
    title: t.seo_publication_title,
    description: t.seo_publication_description,
    viewport: "width=device-width, initial-scale=1",
  };
}

const Publication = () => {
  const t = useTranslations();

  return (
    <RootLayoutNew header="header2" footer="footer4">
      <CmsHero text={t("research")} title={t("publications_h2")} />

      <section className="service__area-3 pb-150 sm:pt-150">
        <div className="container">
          <Publications />
        </div>
      </section>
    </RootLayoutNew>
  );
};

export default Publication;
