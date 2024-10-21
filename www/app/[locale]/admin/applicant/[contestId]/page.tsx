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
import { ADMIN_TEXT_ONLY_COLUMNS } from "../components/adminApplicantColumn";
import DownloadExcel from "../components/download-excel";
import DownloadZip from "../components/download-zip";
import { APPLICATION_STATUS, CONTEST_TYPES } from "../components/constants";
import { handleRowClick } from "../utils/navigators";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

type ApplicantPageProps = {
  searchParams?: PaginatedRequest;
  params: { locale: string; contestId: number }; // undefined
};

const VIEW_SETTINGS: ViewSettings<ContestApply> = {
  textOnly: [ADMIN_TEXT_ONLY_COLUMNS, { headers: true }],
  column: null,
  grid: null,
} as const;

type ApplicantPageType = (props: ApplicantPageProps) => Promise<JSX.Element>;

const ApplicantPage: ApplicantPageType = async ({
  searchParams: { page, ...searchParams },
  params,
}) => {
  const defaultParams: PaginatedRequest = {
    page: 1,
    pageSize: 8,
    sortType: "asc",
    from: undefined,
    to: undefined,
  };

  const mode: NextTableViewModes = "textOnly";
  const [columns, options] = VIEW_SETTINGS[mode];

  searchParams = { contestId: Number(params.contestId), ...searchParams };

  const { contestId, ...rest } = searchParams;

  const t = await getTranslations();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("admin_contest_applicant")}</CardTitle>
        <CardDescription className="flex items-center justify-between">
          <span>{t("admin_contest_applicant_desc")}</span>
          <CardDescription className="flex gap-5">
            <Link
              prefetch={false}
              href={{
                pathname: params?.contestId + "/excel",
                query: rest,
              }}
              target="_parent">
              <Button>{t("download_excel")}</Button>
            </Link>

            <Link
              prefetch={false}
              href={{
                pathname: params?.contestId + "/zip",
                query: rest,
              }}
              target="_parent">
              <Button>{t("download_zip")}</Button>
            </Link>

            {/* <DownloadExcel searchParams={{ searchParams }} />
            <DownloadZip searchParams={{ searchParams }} /> */}
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
