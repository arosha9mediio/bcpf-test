import Head from "next/head";
import CmsHero from "../../(routes)/components/cms/CmsHero";
import RootLayoutNew from "../../(routes)/components/common/layout/RootLayout";
import "/public/assets/scss/master.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "../../(routes)/components/plugins";
import MajorProgram from "../../content/edu/components/MajorProgram";
import { program } from "../facility/FacilityData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "방송콘텐츠진흥재단 | 주요 프로그램",
  description: "BCPF콘텐츠학교",
};

gsap.registerPlugin(ScrollTrigger);

const SchoolProgram = () => {
  return (
    <RootLayoutNew header="header2" footer="footer4">
      <CmsHero
        text="콘텐츠학교"
        title="주요 프로그램"
        subtitle="- School Program"
      />
      <section className="service__area-3 pb-10 pt-150">
        <div>
          <MajorProgram programData={program} />
        </div>
      </section>
    </RootLayoutNew>
  );
};

export default SchoolProgram;
