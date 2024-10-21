import { ReactNode } from "react";
import Hero from "./components/Hero";
import RootLayoutNew from "../(routes)/components/common/layout/RootLayout";
import "/public/assets/scss/master.scss";
import CmsHero from "../(routes)/components/cms/CmsHero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "방송콘텐츠진흥재단 | 후원안내",
  description: "재단소개",
};

type DonationLayoutProps = {
  children: ReactNode;
};

type DonationLayoutType = (props: DonationLayoutProps) => JSX.Element;

const DonationLayout: DonationLayoutType = ({ children }) => {
  return (
    <RootLayoutNew header="header2" footer="footer4">
      <CmsHero title="후원안내" subtitle="- Support" text="재단소개" />
      {/* <Hero title="후원안내" subtitle="- Support" text="재단소개" /> */}
      {children}
    </RootLayoutNew>
  );
};

export default DonationLayout;
