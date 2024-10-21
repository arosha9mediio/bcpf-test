import RootLayoutNew from "../../../(routes)/components/common/layout/RootLayout";
import "/public/assets/scss/master.scss";
import CmsHero from "@/app/[locale]/(routes)/components/cms/CmsHero";
import CreatorView from "./components/CreatorView";
import CreatorContainer from "./components/CreatorContainer";
import { useTranslations } from "next-intl";
import { Metadata } from "next";
import { getLocales } from "@/utils/string";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getLocales(locale);

  return {
    title: t.seo_creator_title,
    description: t.seo_creator_description,
    viewport: "width=device-width, initial-scale=1",
  };
}

const CreatorTraining = () => {
  const t = useTranslations();

  return (
    <div>
      <RootLayoutNew header="header2" footer="footer4">
        <CmsHero text={t("promo_project")} title={t("creator_h2")} />

        <section className="service__area-3 pb-150 sm:pt-150">
          <div className="container">
            <CreatorView />
            <CreatorContainer />
          </div>
        </section>
      </RootLayoutNew>
    </div>
  );
};

export default CreatorTraining;
