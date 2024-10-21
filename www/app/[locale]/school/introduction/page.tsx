import Head from "next/head";
import RootLayoutNew from "../../(routes)/components/common/layout/RootLayout";
import "/public/assets/scss/master.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "../../(routes)/components/plugins";
import IntroView from "./components/IntroView";
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
    title: t.seo_school_title,
    description: t.seo_school_description,
    viewport: "width=device-width, initial-scale=1",
  };
}

gsap.registerPlugin(ScrollTrigger);

const SchoolIntroduction = () => {
  return (
    <div>
      <Head>
        <title>BCPF콘텐츠학교 | 학교소개</title>
        <meta name="description" content="방송콘텐츠진흥재단 | 학교소개" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <RootLayoutNew header="header2" footer="footer4">
        <section className="broadcast__area-school">
          <IntroView />
        </section>
      </RootLayoutNew>
    </div>
  );
};

export default SchoolIntroduction;
