import Head from "next/head";
import RootLayoutNew from "../../../(routes)/components/common/layout/RootLayout";
import "/public/assets/scss/master.scss";
import CmsHero from "@/app/[locale]/(routes)/components/cms/CmsHero";
import PublicView from "./components/PublicView";
import { BroadcastFeedQuery, PaginatedRequest } from "@/lib/__generated/sdk";
import { client } from "@/lib/client";
import VideosComponent from "./components/VideoComponent";
import { SingleAwardTabs } from "./components/tabs";
import { getTranslations } from "next-intl/server";
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
    title: t.seo_public_title,
    description: t.seo_public_description,
    viewport: "width=device-width, initial-scale=1",
  };
}

const AWARDS_DEFAULT_PARAMS: PaginatedRequest = {
  page: 1,
  pageSize: 10,
  sortType: "desc",
  sortBy: "id",
  type: "6",
  searchBy: "awards",
} as const;

type QueryInterests = (
  page: number,
  query: string,
) => Promise<BroadcastFeedQuery>;

// ACTION
const queryInterests = async (page: number, query: string) => {
  "use server";
  return await client.broadcastFeed({
    pageRequest: {
      ...AWARDS_DEFAULT_PARAMS,
      page,
      query,
    },
  });
};

type SingleInterestProps = {
  searchParams: { year?: string };
};

type SingleInterestType = (props: SingleInterestProps) => Promise<JSX.Element>;

const SingleInterest: SingleInterestType = async ({
  searchParams: { year = "2023" },
}) => {
  //

  const interestsQuery = await queryInterests(1, year);
  const t = await getTranslations();

  return (
    <RootLayoutNew header="header2" footer="footer4">
      <CmsHero text={t("promo_project")} title={t("public_h2")} />

      <section className="service__area-3 pb-150 sm:pt-150">
        <div className="container">
          <PublicView />
          <SingleAwardTabs query={year} />

          <VideosComponent
            key={year}
            initialAwards={interestsQuery.broadcastFeed?.list}
            hasMoreAwards={interestsQuery.broadcastFeed.hasNextPage}
            year={year}
            getAwards={queryInterests}
          />
        </div>
      </section>
    </RootLayoutNew>
  );
};

// export { AWARDS_DEFAULT_PARAMS };
export default SingleInterest;
export type { QueryInterests };
