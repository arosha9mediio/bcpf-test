import Head from "next/head";
import CmsHero from "../../(routes)/components/cms/CmsHero";
import RootLayoutNew from "../../(routes)/components/common/layout/RootLayout";
import "/public/assets/scss/master.scss";
import AboutOrganization from "@/app/[locale]/(routes)/components/about/AboutOrganization";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "방송콘텐츠진흥재단 | 조직도",
  description: "재단소개",
};

const Organization = () => {
  return (
    <RootLayoutNew header="header2" footer="footer4">
      <CmsHero
        text="재단소개"
        title="조직도"
        subtitle="- Foundation Structure"
      />
      <AboutOrganization />
    </RootLayoutNew>
  );
};

export default Organization;
