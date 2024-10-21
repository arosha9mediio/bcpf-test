import Head from "next/head";
import RootLayoutNew from "../../../(routes)/components/common/layout/RootLayout";
import "/public/assets/scss/master.scss";
import CmsHero from "@/app/[locale]/(routes)/components/cms/CmsHero";
import CommunityView from "./components/CommunityView";
import CommunityCards from "./components/CommunityCards";
import { BroadcastFeedQuery, PaginatedRequest } from "@/lib/__generated/sdk";
import { client } from "@/lib/client";
import { SingleProjectTabs } from "./components/tabs";
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
    title: t.seo_community_title,
    description: t.seo_community_description,
    viewport: "width=device-width, initial-scale=1",
  };
}

const AWARDS_DEFAULT_PARAMS: PaginatedRequest = {
  page: 1,
  pageSize: 10,
  sortType: "desc",
  sortBy: "id",
  type: "5",
  searchBy: "awards",
} as const;

type QueryProjects = (
  page: number,
  query: string,
) => Promise<BroadcastFeedQuery>;

// ACTION
const queryProjects = async (page: number, query: string) => {
  "use server";
  return await client.broadcastFeed({
    pageRequest: {
      ...AWARDS_DEFAULT_PARAMS,
      page,
      query,
    },
  });
};

type SingleProjectProps = {
  searchParams: { year?: string };
};

type SingleProjectType = (props: SingleProjectProps) => Promise<JSX.Element>;

const SingleProject: SingleProjectType = async ({
  searchParams: { year = "2023" },
}) => {
  //

  const projectsQuery = await queryProjects(1, year);
  const t = await getTranslations();

  return (
    <RootLayoutNew header="header2" footer="footer4">
      <CmsHero text={t("promo_project")} title={t("community_h2")} />

      <section className="service__area-3 pb-150 sm:pt-150">
        <div className="container">
          <CommunityView />
          <SingleProjectTabs query={year} />

          <CommunityCards
            key={year}
            initialProjects={projectsQuery.broadcastFeed?.list}
            hasMoreProjects={projectsQuery.broadcastFeed.hasNextPage}
            year={year}
            getProjects={queryProjects}
          />
        </div>
      </section>
    </RootLayoutNew>
  );
};

export default SingleProject;
export type { QueryProjects };
