import { ReactNode } from "react";

import RootLayoutNew from "../components/common/layout/RootLayout";
import "/public/assets/scss/master.scss";

type ContestLayoutProps = {
  children: ReactNode;
};

type ContestLayoutType = (props: ContestLayoutProps) => JSX.Element;

const ContestLayout: ContestLayoutType = ({ children }) => {
  return (
    <RootLayoutNew
      scrollStyle={false}
      isBlack={true}
      header="header1"
      footer="footer4">
      {children}
    </RootLayoutNew>
  );
};

export default ContestLayout;
