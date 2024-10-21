import { ReactNode } from "react";
import "/public/assets/scss/master.scss";

type LayoutTypeProps = {
  children: ReactNode;
};

type LayoutType = (props: LayoutTypeProps) => JSX.Element;

const Layout: LayoutType = ({ children }) => {
  return <>{children}</>;
};

export default Layout;
