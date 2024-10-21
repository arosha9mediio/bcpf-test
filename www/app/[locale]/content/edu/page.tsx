import Head from "next/head";
import CmsHero from "../../(routes)/components/cms/CmsHero";
import RootLayoutNew from "../../(routes)/components/common/layout/RootLayout";
import "/public/assets/scss/master.scss";
import EducationalView from "./components/EducationalView";
import TabSection from "./components/TabSection";

const EducationalProject = () => {
  return (
    <div>
      <Head>
        <title>주요사업 | 교육사업</title>
        <meta name="description" content="방송콘텐츠진흥재단 | 교육사업" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <RootLayoutNew header="header2" footer="footer4">
        <CmsHero
          text="주요사업"
          title="교육사업"
          subtitle="- BCPF 콘텐츠 학교"
        />
        <EducationalView />
        <TabSection />
      </RootLayoutNew>
    </div>
  );
};

export default EducationalProject;
