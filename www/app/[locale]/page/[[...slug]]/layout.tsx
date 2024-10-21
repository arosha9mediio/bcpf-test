import { ReactNode } from "react";
import Hero from "./components/Hero";
import RootLayoutNew from "../../(routes)/components/common/layout/RootLayout";
import "/public/assets/scss/master.scss";
import { getPage } from "./action/get-page";
import CmsHero from "../../(routes)/components/cms/CmsHero";

type PageLayoutProps = {
  children: ReactNode;
  params: { slug: string[] };
};

type PageLayoutType = (props: PageLayoutProps) => Promise<JSX.Element>;

const PageLayout: PageLayoutType = async ({ children, params: { slug } }) => {
  const page = await getPage(slug.join("/"));
  if (!page) return <p>Page not found!</p>;

  return (
    <RootLayoutNew header="header2" footer="footer4">
      <CmsHero title={page?.title} />
      {/* <Hero title={page?.title} subtitle="- Page" text="재단소개" /> */}
      {children}
    </RootLayoutNew>
  );
};

export default PageLayout;
