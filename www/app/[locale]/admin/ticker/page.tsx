import { Locale, getDictionary } from "@/dictionaries";
import { PaginatedRequest } from "@/lib/__generated/sdk";
import { Search } from "@/components/search/SearchBar";
import { NextTable, NextTableViewModes } from "@/components/table/NextTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { client } from "@/lib/client";
import { DataCount } from "../components/DataCount";
import { TICKER_DEFAULT_PARAMS, TICKER_VIEW_SETTINGS } from "./constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RoutePaths } from "@/constants/route";

type TickerPageProps = {
  searchParams?: PaginatedRequest;
  params: { locale: Locale };
};

type TickerPageType = (props: TickerPageProps) => Promise<JSX.Element>;

const TickerPage: TickerPageType = async ({
  searchParams: { page, ...searchParams },
  params: { locale },
}) => {
  const mode: NextTableViewModes = "textOnly";
  const [columns, options] = TICKER_VIEW_SETTINGS[mode];
  const dict = await getDictionary(locale);

  return (
    <Card>
      <CardHeader>
        <div className="flex gap-2">
          <CardTitle className="capitalize">{dict.ticker_title}</CardTitle>
          <DataCount />
        </div>
        <CardDescription className="flex items-center justify-between">
          <span>{dict.ticker_description}</span>
          <Link href={{ pathname: `${RoutePaths.adminTicker.value}/new` }}>
            <Button>{dict.admin_ticker_view_create_new}</Button>
          </Link>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        <NextTable
          gqlQuery={client.postFeed}
          request={{ page: Number(page) || 1, ...searchParams }}
          defaultRequest={TICKER_DEFAULT_PARAMS}
          columns={columns}
          listParent={"postFeed"}
          viewOptions={{ mode, ...options }}
          topWidget={
            <Search
              components={["DATE-RANGE", "SEARCH"]}
              defaultRequest={TICKER_DEFAULT_PARAMS}
              searchMode="CHANGE"
              typeSelectionMode="Drop"
            />
          }
        />
      </CardContent>
    </Card>
  );
};

export default TickerPage;
