import Head from "next/head";
import AboutContent from "../../../(routes)/components/about/AboutContent";
import AboutHero from "../../../(routes)/components/about/AboutHero";
import AboutVideo from "../../../(routes)/components/about/AboutVideo";
import RootLayoutNew from "../../../(routes)/components/common/layout/RootLayout";
import "/public/assets/scss/master.scss";

const AboutView = () => {
  return (
    <div>
      <Head>
        <title>재단소개 | 이사장 인사말</title>
        <meta
          name="description"
          content="방송콘텐츠진흥재단, 재단소개-이사장 인사말"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <RootLayoutNew header="header1" footer="footer4">
        <AboutHero />
        <AboutVideo />
        <AboutContent />
      </RootLayoutNew>
    </div>
  );
};

export default AboutView;
