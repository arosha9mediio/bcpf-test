import AboutContent from "@/app/[locale]/(routes)/components/about/AboutContent";
import AboutIntro from "@/app/[locale]/(routes)/components/about/AboutIntro";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useTranslations } from "next-intl";
import Head from "next/head";
import RootLayoutNew from "../../../(routes)/components/common/layout/RootLayout";
import "/public/assets/scss/master.scss";
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
    title: t.seo_about_title,
    description: t.seo_about_description,
    viewport: "width=device-width, initial-scale=1",
  };
}

const Introduce = () => {
  const t = useTranslations();

  return (
    <div>
      <Head>
        <title>재단소개 | 방송콘텐츠진흥재단 소개</title>
        <meta
          name="description"
          content="방송콘텐츠진흥재단 | 재단소개-이사장 인사말 | 방송콘텐츠진흥재단 소개"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <RootLayoutNew header="header1" footer="footer4">
        <AboutIntro />
        <AboutContent />
      </RootLayoutNew>
    </div>
  );
};

export default Introduce;
