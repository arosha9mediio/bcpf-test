import CmsHero from "@/app/[locale]/(routes)/components/cms/CmsHero";
import { PaginatedRequest } from "@/lib/__generated/sdk";
import { client } from "@/lib/client";
import Head from "next/head";
import RootLayoutNew from "../../../(routes)/components/common/layout/RootLayout";
import GlobalView from "./components/GlobalView";
import "/public/assets/scss/master.scss";
import { getTranslations } from "next-intl/server";
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
    title: t.seo_documentary_title,
    description: t.seo_documentary_description,
    viewport: "width=device-width, initial-scale=1",
  };
}

const AWARDS_DEFAULT_PARAMS: PaginatedRequest = {
  page: 1,
  pageSize: 10,
  sortType: "desc",
  type: "1",
} as const;

const GlobalDocumentary = async () => {
  const documentries = await client.broadcastFeed({
    pageRequest: AWARDS_DEFAULT_PARAMS,
  });

  const t = await getTranslations();

  return (
    <RootLayoutNew header="header2" footer="footer4">
      <CmsHero
        text={t("promo_project")}
        title={t("global_h2")}
        subtitle={t("global_h3")}
      />

      <section className="service__area-3 pb-150 sm:pt-150">
        <div className="container">
          <GlobalView documentries={documentries} />
          {/* <DocumentaryCards/> */}
          {/* <GlobalCards /> */}
        </div>
      </section>
    </RootLayoutNew>
  );
};

export default GlobalDocumentary;
