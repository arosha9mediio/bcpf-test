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
import { ContestApply, PaginatedRequest } from "@/lib/__generated/sdk";
import { client } from "@/lib/client";
import { ADMIN_TEXT_ONLY_COLUMNS } from "./components/adminApplicantColumn";
import DownloadExcel from "./components/download-excel";
import DownloadZip from "./components/download-zip";
import { APPLICATION_STATUS, CONTEST_TYPES } from "./components/constants";
import { Locale, getDictionary } from "@/dictionaries";
import { handleRowClick } from "./utils/navigators";

type ApplicantPageProps = {
  searchParams?: PaginatedRequest;
  params: { locale: Locale }; // undefined
};

const defaultParams: PaginatedRequest = {
  page: 1,
  pageSize: 8,
  sortType: "asc",
  from: undefined,
  to: undefined,
};

const VIEW_SETTINGS: ViewSettings<ContestApply> = {
  textOnly: [ADMIN_TEXT_ONLY_COLUMNS, { headers: true }],
  column: null,
  grid: null,
} as const;

type ApplicantPageType = (props: ApplicantPageProps) => Promise<JSX.Element>;

const ApplicantPage: ApplicantPageType = async ({
  searchParams: { page, ...searchParams },
  params: { locale },
}) => {
  const mode: NextTableViewModes = "textOnly";
  const [columns, options] = VIEW_SETTINGS[mode];

  const dict = await getDictionary(locale);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{dict.admin_contest_apply}</CardTitle>
        <CardDescription className="flex items-center justify-between">
          <span>{dict.admin_contest_apply_sub}</span>
          <CardDescription className="flex gap-5">
            {/* <DownloadExcel searchParams={{ searchParams }} />
            <DownloadZip /> */}
          </CardDescription>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        <NextTable
          gqlQuery={client.ApplicationFeed}
          request={{ page: Number(page) || 1, ...searchParams }}
          defaultRequest={defaultParams}
          columns={columns}
          listParent={"applicationFeed"}
          onRowClick={handleRowClick}
          viewOptions={{ mode, ...options }}
          topWidget={
            <Search
              components={["SEARCH", "TYPE", "SEARCHBY", "RESET"]}
              searchByItems={APPLICATION_STATUS}
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

export default ApplicantPage;
