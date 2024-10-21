import Head from "next/head";
import "/public/assets/scss/master.scss";
import RootLayoutNew from "../../(routes)/components/common/layout/RootLayout";
import CmsHero from "../../(routes)/components/cms/CmsHero";
import DirectionTabs from "./components/DirectionTabs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "방송콘텐츠진흥재단 | 오시는 길",
  description: "재단소개",
};

const Directions = () => {
  return (
    <RootLayoutNew header="header2" footer="footer4">
      <CmsHero text="재단소개" title="오시는 길" />
      <DirectionTabs />
    </RootLayoutNew>
  );
};

export default Directions;
