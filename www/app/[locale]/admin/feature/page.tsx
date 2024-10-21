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
import { PaginatedRequest, Post } from "@/lib/__generated/sdk";
import { client } from "@/lib/client";
import { ADMIN_FEATURE_COLUMNS } from "./components/adminFeatureColumn";
import { DataCount } from "../components/DataCount";
import { Locale, getDictionary } from "@/dictionaries";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RoutePaths } from "@/constants/route";

type FeaturePageProps = {
  searchParams?: PaginatedRequest;
  params: { locale: Locale }; // undefined
};

// DEFAULT SEARCH PARAMS
const defaultParams: PaginatedRequest = {
  page: 1,
  pageSize: 8,
  sortType: "asc",
  categoryId: 12,
  from: undefined,
  to: undefined,
};

const FEATURE_SEARCH_TYPES = {
  1: "All",
  2: "Announcement",
} as const;

const VIEW_SETTINGS: ViewSettings<Post> = {
  textOnly: [ADMIN_FEATURE_COLUMNS, { headers: true, useStore: true }],
  column: null,
  grid: null,
} as const;

type FeaturePageType = (props: FeaturePageProps) => Promise<JSX.Element>;

const FeaturePage: FeaturePageType = async ({
  searchParams: { page, ...searchParams },
  params: { locale },
}) => {
  const mode: NextTableViewModes = "textOnly";
  const [columns, options] = VIEW_SETTINGS[mode];

  const dict = await getDictionary(locale);

  return (
    <Card className="">
      <CardHeader>
        <div className="flex gap-2">
          <CardTitle>{dict.admin_features}</CardTitle>
          <DataCount />
        </div>
        <CardDescription className="flex items-center justify-between">
          <span>{dict.admin_features_sub}</span>
          <Link
            href={{
              pathname: `${RoutePaths.addAdminFeature.value("new")}`,
            }}>
            <Button>{dict.admin_feature_button}</Button>
          </Link>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
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

export default FeaturePage;
