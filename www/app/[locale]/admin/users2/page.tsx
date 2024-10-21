import { Search } from "@/components/search/SearchBar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ADMIN_USERS_COLUMNS } from "./components/AdminUserColumn";
import { DataCount } from "../components/DataCount";
import { getDictionary } from "@/dictionaries";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RoutePaths } from "@/constants/route";
import { NewTable, TablePageType } from "@/components/table/NewTable";

const TablePage: TablePageType = async ({ searchParams, params }) => {
  // fetch view settings

  const dict = await getDictionary(params.locale);
  console.log({ ...searchParams });

  return (
    <Card>
      <CardHeader>
        <div className="flex gap-2">
          <CardTitle className="capitalize">{dict.admin_users}</CardTitle>
          <DataCount />
        </div>
        <CardDescription className="flex items-center justify-between">
          <span>{dict.admin_users_sub}</span>
          <Link
            href={{
              pathname: `${RoutePaths.addAdminUser.value("new")}`,
            }}>
            <Button>{dict.admin_user_button}</Button>
          </Link>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col ">
        {/* <Search execBtnLbl="Search" /> */}
        {/* <TypeTab /> */}

        <NewTable
          request={{ ...searchParams, ...{ categoryId: 1 } }}
          columns={ADMIN_USERS_COLUMNS}
          listParent={"userFeed"}
          topWidget={<Search components={["DATE-RANGE", "SEARCH", "RESET"]} />}
        />
      </CardContent>
    </Card>
  );
};

export default TablePage;
