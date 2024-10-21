import CmsHero from "@/app/[locale]/(routes)/components/cms/CmsHero";
import Head from "next/head";
import { ReactNode, memo } from "react";
import RootLayoutNew from "../../../(routes)/components/common/layout/RootLayout";
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
    title: t.seo_individual_title,
    description: t.seo_individual_description,
    viewport: "width=device-width, initial-scale=1",
  };
}

type LayoutProps = {
  children: ReactNode;
};

type LayoutType = (props: LayoutProps) => JSX.Element;

const Layout: LayoutType = ({ children }) => {
  const t = useTranslations();
  return (
    <RootLayoutNew header="header2" footer="footer4">
      <CmsHero text={t("promo_project")} title={t("single_h2")} />

      <section className="service__area-3 pb-150 sm:pt-150">
        <div className="container">{children}</div>
      </section>
    </RootLayoutNew>
  );
};

export default memo(Layout);
