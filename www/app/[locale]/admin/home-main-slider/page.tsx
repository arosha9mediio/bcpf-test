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
import AddTitleAndDescription from "./components/add-title-description";
import { ADMIN_MAIN_SLIDER_COLUMNS } from "./components/adminMainSliderColumn";
import { DataCount } from "../components/DataCount";
import { getDictionary } from "@/dictionaries";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RoutePaths } from "@/constants/route";

type MainSliderPageProps = {
  searchParams?: PaginatedRequest;
  params: { locale: "en" | "ko" }; // undefined
};

// DEFAULT SEARCH PARAMS
const defaultParams: PaginatedRequest = {
  page: 1,
  pageSize: 8,
  sortType: "asc",
  categoryId: 13,
  type: "1",
  from: undefined,
  to: undefined,
};

const VIEW_SETTINGS: ViewSettings<Post> = {
  textOnly: [ADMIN_MAIN_SLIDER_COLUMNS, { headers: true, useStore: true }],
  column: null,
  grid: null,
} as const;

type MainSliderPageType = (props: MainSliderPageProps) => Promise<JSX.Element>;

const MainSliderPage: MainSliderPageType = async ({
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
          <CardTitle className="capitalize">
            {dict.admin_home_main_slider}
          </CardTitle>
          <DataCount />
        </div>
        <CardDescription className="flex items-center justify-between">
          <span>{dict.admin_home_main_slider_sub}</span>
          <div className="flex flex-row gap-2">
            <Link
              href={{
                pathname: `${RoutePaths.updateAdminHomeMainSliderTitleAndDescription.value}`,
              }}>
              <Button variant="secondary">
                {dict.admin_home_main_slider_create_button}
              </Button>
            </Link>
            <Link
              href={{
                pathname: `${RoutePaths.addAdminHomeMainSlider.value("new")}`,
              }}>
              <Button>{dict.admin_home_main_slider_create_button2}</Button>
            </Link>
          </div>
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
              components={["DATE-RANGE"]}
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

export default MainSliderPage;
