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

import AddSlider from "./components/add-slider";
import { ADMIN_SLIDER_COLUMNS } from "./components/adminSliderColumn";
import { DataCount } from "../components/DataCount";
import { Locale, getDictionary } from "@/dictionaries";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RoutePaths } from "@/constants/route";

type SliderPageProps = {
  searchParams?: PaginatedRequest;
  params: { locale: Locale }; // undefined
};

// DEFAULT SEARCH PARAMS
const defaultParams: PaginatedRequest = {
  page: 1,
  pageSize: 8,
  sortType: "asc",
  categoryId: 11,
  from: undefined,
  to: undefined,
};

const SLIDER_SEARCH_TYPES = {
  1: "All",
  2: "Announcement",
} as const;

const VIEW_SETTINGS: ViewSettings<Post> = {
  textOnly: [ADMIN_SLIDER_COLUMNS, { headers: true, useStore: true }],
  column: null,
  grid: null,
} as const;

type SliderPageType = (props: SliderPageProps) => Promise<JSX.Element>;

const SliderPage: SliderPageType = async ({
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
          <CardTitle className="capitalize">{dict.admin_sliders}</CardTitle>
          <DataCount />
        </div>
        <CardDescription className="flex items-center justify-between">
          <span>{dict.admin_sliders_sub}</span>
          <Link
            href={{
              pathname: `${RoutePaths.addAdminSlider.value("new")}`,
            }}>
            <Button>{dict.admin_slider_button}</Button>
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
              // searchItems={SLIDER_SEARCH_TYPES}
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

export default SliderPage;
