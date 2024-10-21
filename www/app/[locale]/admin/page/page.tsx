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
import { PaginatedRequest, Post } from "@/lib/__generated/sdk";
import { client } from "@/lib/client";
import AddPage from "./components/add-page";
import { ADMIN_TEXT_ONLY_COLUMNS } from "./components/adminPageColumn";
import { DataCount } from "../components/DataCount";
import { Locale, getDictionary } from "@/dictionaries";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RoutePaths } from "@/constants/route";

type PagePageProps = {
  searchParams?: PaginatedRequest;
  params: { locale: Locale }; // undefined
};

// DEFAULT SEARCH PARAMS
const defaultParams: PaginatedRequest = {
  page: 1,
  pageSize: 10,
  sortType: "asc",
  categoryId: 15,
  from: undefined,
  to: undefined,
};

// const getColumnsBasedOnRole = (role: "TEACHER" | "ADMIN") => {
//   switch (role) {
//     case "ADMIN":
//       return ADMIN_TEXT_ONLY_COLUMNS;

//     case "TEACHER":
//     // something

//     default:
//       null;
//   }
// };

const VIEW_SETTINGS: ViewSettings<Post> = {
  textOnly: [ADMIN_TEXT_ONLY_COLUMNS, { headers: true, useStore: true }],
  column: null,
  grid: null,
  // .. grid n columns if needed
  // if role based; drop this inside server component for dynamic columns
} as const;

type PagePageType = (props: PagePageProps) => Promise<JSX.Element>;

const PagePage: PagePageType = async ({
  searchParams: { page, ...searchParams },
  params: { locale },
}) => {
  // fetch view settings

  const mode: NextTableViewModes = "textOnly";
  const [columns, options] = VIEW_SETTINGS[mode];

  const dict = await getDictionary(locale);

  return (
    <Card className="">
      <CardHeader>
        <div className="flex gap-2">
          <CardTitle>{dict.admin_pages}</CardTitle>
          <DataCount />
        </div>
        <CardDescription className="flex items-center justify-between">
          <span>{dict.admin_pages_sub}</span>
          <Link
            href={{
              pathname: `${RoutePaths.addAdminPage.value("new")}`,
            }}>
            <Button>{dict.admin_notice_button}</Button>
          </Link>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        {/* <Suspense key={query + page} fallback={<SuspenseLoading />}> */}
        {/* <Search execBtnLbl="Search" /> */}
        {/* <TypeTab /> */}

        <NextTable
          gqlQuery={client.postFeed}
          request={{ page: Number(page) || 1, ...searchParams }}
          defaultRequest={defaultParams}
          columns={columns}
          listParent={"postFeed"}
          viewOptions={{ mode, ...options }}
          topWidget={
            <Search
              components={["DATE-RANGE", "SEARCH"]}
              // searchItems={NOTICE_SEARCH_TYPES}
              defaultRequest={defaultParams}
              searchMode="CHANGE"
              typeSelectionMode="Drop"
            />
          }
        />
        {/* </Suspense> */}
      </CardContent>
    </Card>
  );
};

export default PagePage;
