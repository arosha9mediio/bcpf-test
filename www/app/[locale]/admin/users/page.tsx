import { Search } from "@/components/search/SearchBar";
import {
  NextTable,
  NextTableViewModes,
  ViewSettings,
} from "@/components/table/NextTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PaginatedRequest, User } from "@/lib/__generated/sdk";
import { client } from "@/lib/client";
import { ADMIN_USERS_COLUMNS } from "./components/adminUserColumn";
import { ScrollArea } from "@/components/ui/scroll-area";
import AddUser from "./components/add-user";
import { DataCount } from "../components/DataCount";
import { getDictionary } from "@/dictionaries";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RoutePaths } from "@/constants/route";

type UsersPageProps = {
  searchParams?: PaginatedRequest;
  params: { locale: "en" | "ko" }; // undefined
};

// DEFAULT SEARCH PARAMS
const defaultParams: PaginatedRequest = {
  page: 1,
  pageSize: 10,
  sortType: "asc",
  from: undefined,
  to: undefined,
};

const VIEW_SETTINGS: ViewSettings<User> = {
  textOnly: [ADMIN_USERS_COLUMNS, { headers: true, useStore: true }],
  column: null,
  grid: null,
} as const;

type UsersPageType = (props: UsersPageProps) => Promise<JSX.Element>;

const UsersPage: UsersPageType = async ({
  searchParams: { page, ...searchParams },
  params: { locale },
}) => {
  const mode: NextTableViewModes = "textOnly";
  const [columns, options] = VIEW_SETTINGS[mode];

  const dict = await getDictionary(locale);

  return (
    <Card>
      <CardHeader>
        <div className="flex gap-2">
          <CardTitle className="capitalize">{dict.admin_users}</CardTitle>
          <DataCount />
        </div>
        <div className="flex items-center justify-between text-gray-500">
          <span>{dict.admin_users_sub}</span>
          <div className="flex flex-row gap-2">
            <Link
              href={{
                pathname: `${RoutePaths.addAdminUser.value("new")}`,
              }}>
              <Button>{dict.admin_user_button}</Button>
            </Link>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        <NextTable
          gqlQuery={client.userFeed}
          request={{ page: Number(page) || 1, ...searchParams }}
          defaultRequest={defaultParams}
          columns={columns}
          listParent={"userFeed"}
          viewOptions={{ mode, ...options }}
          topWidget={
            <Search
              components={["DATE-RANGE", "SEARCH"]}
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

export default UsersPage;
