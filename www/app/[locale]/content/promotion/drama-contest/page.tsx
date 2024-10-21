import Head from "next/head";
import DramaView from "../../../(routes)/components/DramaView";
import CmsHero from "../../../(routes)/components/cms/CmsHero";
import RootLayoutNew from "../../../(routes)/components/common/layout/RootLayout";
import Gallery1 from "../../../(routes)/components/gallery/Gallery1";
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
    title: t.seo_drama_title,
    description: t.seo_drama_description,
    viewport: "width=device-width, initial-scale=1",
  };
}

const DramaContest = () => {
  const t = useTranslations();

  return (
    <div>
      <Head>
        <title>진흥사업 | 드라마극본공모전</title>
        <meta
          name="description"
          content="방송콘텐츠진흥재단 | 드라마극본공모전"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <RootLayoutNew header="header2" footer="footer4">
        <CmsHero text={t("promo_project")} title={t("drama_h2")} />
        <section className="service__area-3">
          <div className="container">
            <DramaView />
          </div>
          <Gallery1 />
        </section>
      </RootLayoutNew>
    </div>
  );
};

export default DramaContest;
