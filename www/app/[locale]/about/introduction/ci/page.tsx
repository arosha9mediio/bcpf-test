import Head from "next/head";
import CmsHero from "../../../(routes)/components/cms/CmsHero";
import RootLayoutNew from "../../../(routes)/components/common/layout/RootLayout";
import "/public/assets/scss/master.scss";
import AboutCI from "@/app/[locale]/(routes)/components/about/AboutCI";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "방송콘텐츠진흥재단 | 로고",
  description: "재단소개",
};

const LogoCI = () => {
  return (
    <RootLayoutNew header="header2" footer="footer4">
      <CmsHero
        text="재단소개"
        title="로고"
        subtitle="- Logo Usage Guidelines"
      />
      <AboutCI />
    </RootLayoutNew>
  );
};

export default LogoCI;
