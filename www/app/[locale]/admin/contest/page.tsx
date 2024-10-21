import { Search } from "@/components/search/SearchBar";
import {
  NextTable,
  NextTableViewModes,
  ViewSettings,
} from "@/components/table/NextTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Contest, PaginatedRequest } from "@/lib/__generated/sdk";
import { client } from "@/lib/client";
import AddContest from "./components/add-contest";
import { ADMIN_CONTEST_COLUMNS } from "./components/adminContestColumn";
import { CONTEST_STATUS, CONTEST_TYPES } from "./components/constants";
import { handleRowClick } from "./utils/navigators";
import { Locale, getDictionary } from "@/dictionaries";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RoutePaths } from "@/constants/route";
import { UserRoles } from "@/constants/enums";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type ContestPageProps = {
  searchParams?: PaginatedRequest;
  params: { locale: Locale };
};

// DEFAULT SEARCH PARAMS
const defaultParams: PaginatedRequest = {
  page: 1,
  pageSize: 8,
  sortType: "asc",
  // status: undefined,
  // type: undefined,
  from: undefined,
  to: undefined,
};

const VIEW_SETTINGS: ViewSettings<Contest> = {
  textOnly: [ADMIN_CONTEST_COLUMNS, { headers: true, useStore: true }],
  column: null,
  grid: null,
} as const;

type ContestPageType = (props: ContestPageProps) => Promise<JSX.Element>;

const ContestPage: ContestPageType = async ({
  searchParams: { page, ...searchParams },
  params: { locale },
}) => {
  const mode: NextTableViewModes = "textOnly";
  const [columns, options] = VIEW_SETTINGS[mode];

  const { user } = await getServerSession(authOptions);

  const dict = await getDictionary(locale);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{dict.admin_contest}</CardTitle>
        <CardDescription className="flex items-center justify-between">
          <span>{dict.admin_contest_sub}</span>
          {user?.role === UserRoles.ADMIN && (
            <Link
              href={{
                pathname: `${RoutePaths.addAdminContest.value("new")}`,
              }}>
              <Button>{dict.admin_contest_button}</Button>
            </Link>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <NextTable
          gqlQuery={client.ContestsFeed}
          request={{ page: Number(page) || 1, ...searchParams }}
          defaultRequest={defaultParams}
          columns={columns}
          listParent={"contestsFeed"}
          onRowClick={handleRowClick}
          viewOptions={{ mode, ...options }}
          topWidget={
            <Search
              components={["SEARCH", "TYPE", "SEARCHBY", "RESET"]}
              searchByItems={CONTEST_STATUS}
              searchItems={CONTEST_TYPES}
              defaultRequest={defaultParams}
              searchMode="CHANGE"
              typeSelectionMode="Drop"
            />
          }
        />
      </CardContent>
    </Card>
  );
};

export default ContestPage;
