import RootLayoutNew from "../../../(routes)/components/common/layout/RootLayout";
import HistoryDetails from "../../../(routes)/components/history/HistoryDetails";
import HistoryHero from "../../../(routes)/components/history/HistoryHero";
import "/public/assets/scss/master.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "방송콘텐츠진흥재단 | 연혁",
  description: "재단소개",
};

const HistoryView = () => {
  return (
    <main>
      <RootLayoutNew header="header1" footer="footer4">
        <HistoryHero />
        {/* <CmsHero text="재단소개" title="연혁" subtitle="-  HISTORY" /> */}
        <HistoryDetails />
      </RootLayoutNew>
    </main>
  );
};

export default HistoryView;
