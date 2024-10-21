import { BroadcastFeedQuery, PaginatedRequest } from "@/lib/__generated/sdk";
import { client } from "@/lib/client";
import SingleCards from "./components/SingleCards";
import SingleTable from "./components/SingleTable";
import { SingleAwardTabs } from "./components/tabs";
import SingleView from "./components/SingleView";

const AWARDS_DEFAULT_PARAMS: PaginatedRequest = {
  page: 1,
  pageSize: 10,
  sortType: "desc",
  sortBy: "id",
  type: "4",
  searchBy: "awards",
} as const;

type QueryAwards = (page: number, query: string) => Promise<BroadcastFeedQuery>;

// ACTION
const queryAwards = async (page: number, query: string) => {
  "use server";
  return await client.broadcastFeed({
    pageRequest: {
      ...AWARDS_DEFAULT_PARAMS,
      page,
      query,
    },
  });
};

type SingleAwardProps = {
  searchParams: { year?: string };
};

type SingleAwardType = (props: SingleAwardProps) => Promise<JSX.Element>;

const SingleAward: SingleAwardType = async ({
  searchParams: { year = "2023" },
}) => {
  //

  const awardsQuery = await queryAwards(1, year);

  return (
    <div>
      <SingleView />
      <SingleTable />
      <SingleAwardTabs query={year} />

      <SingleCards
        key={year}
        initialAwards={awardsQuery.broadcastFeed?.list}
        hasMoreAwards={awardsQuery.broadcastFeed.hasNextPage}
        year={year}
        getAwards={queryAwards}
      />
    </div>
  );
};

export default SingleAward;
export type { QueryAwards };
