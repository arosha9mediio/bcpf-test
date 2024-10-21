import {
  NextTable,
  NextTableViewModes,
  ViewSettings,
} from "@/components/table/NextTable";
import {
  Donation as DonationType,
  PaginatedRequest,
} from "@/lib/__generated/sdk";
import { client } from "@/lib/client";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { USER_DONATION_COLUMNS } from "./components/userDonationColumn";
import { Search } from "@/components/search/SearchBar";
import moment from "moment";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { getImagePath } from "@/utils/aws";

type Props = {
  searchParams?: PaginatedRequest;
  params: { locale: string }; // undefined searchParams: { page, ...searchParams },
};

// DEFAULT SEARCH PARAMS
const defaultParams: PaginatedRequest = {
  page: 1,
  pageSize: 99,
  sortType: "asc",
  from: undefined,
  to: undefined,
  year: (moment().get("year") - 1).toString(),
};

const VIEW_SETTINGS: ViewSettings<DonationType> = {
  textOnly: [USER_DONATION_COLUMNS, { headers: true }],
  column: null,
  grid: null,
} as const;

function getPastYearsKeyValue(): Record<string, string> {
  const maxYear = new Date().getFullYear() - 1;
  const years: Record<string, string> = {};
  for (let i = 2016; i <= maxYear; i++) {
    years[`${i}`] = `${i}`;
  }
  return years;
}

const Donation = ({ searchParams: { page, ...searchParams } }: Props) => {
  const t = useTranslations();
  const mode: NextTableViewModes = "textOnly";
  const [columns, options] = VIEW_SETTINGS[mode];

  const currentYear = searchParams.year || new Date().getFullYear() - 1;

  return (
    <div className="container">
      <ScrollArea className="flex flex-col gap-5 space-y-4 py-5 sm:py-10 lg:py-24   h-full overflow-hidden">
        <div className="py-4 space-y-2 mb-8">
          <h1 className="text-3xl font-bold">여러분의 후원을 기다립니다.</h1>
          <p className="text-lg">
            방송콘텐츠진흥재단(BCPF)은 개인과 기업의 후원금으로 운영되며
            후원금은 다큐멘터리 제작지원 및 방송영상 제작인력 양성 (BCPF
            콘텐츠학교 운영), 학술지원 등의 목적으로 사용되며 그 사용 내역을
            투명하게 공개하고 있습니다. 방송영상의 제작에서 소외된 이들의
            교육사업과 국내 다큐멘터리 발전에 관심이 있으신 개인과 기업의 후원을
            기다립니다. 또한 본 재단은 기획재정부 장관이 지정한 ‘지정기부금단체’
            로서 후원하시는 개인과 기업에 기부금 영수증 발급 및 세금 혜택이
            주어집니다.
          </p>
        </div>

        <div className="space-y-2 mb-8">
          <h2 className="text-xl font-bold">후원문의</h2>
          <p className="font-medium text-lg">
            Tel: 02-6123-4300~6 | E-mail:bcpf@bcpf.or.kr
          </p>
        </div>
        <div className="w-full">
          <div className="flex gap-2">
            <Search
              components={["YEAR"]}
              defaultRequest={{ ...defaultParams, type: "1" }}
              searchMode="CHANGE"
              typeSelectionMode="Drop"
              yearItems={getPastYearsKeyValue()}
              execBtnClassName={"bg-slate-600 hover:bg-slate-600/80"}
              styles={{ formClassName: "mb-4" }}
              options={{
                labels: {
                  search: "donation_search_submit",
                },
              }}
            />
            <Link
              href={{
                pathname: getImagePath(
                  `statics/web/donation/statement-${currentYear}.jpg`,
                ),
              }}
              className="mt-1 "
              target="_blank"
              prefetch={false}>
              <Button variant="default" className="bg-black hover:bg-black/95">
                {t("donation_search_submit")}
              </Button>
            </Link>
          </div>
        </div>

        <NextTable
          gqlQuery={client.donationFeed}
          request={{ page: Number(page) || 1, ...searchParams, type: "1" }}
          defaultRequest={{ ...defaultParams, type: "1" }}
          columns={columns}
          listParent={"donationFeed"}
          viewOptions={{
            mode,
            ...options,
            cls: {
              outer: "border-none",
              head: "text-lg border-b-2 border-black font-bold text-black dark:border-white dark:text-white",
            },
            paginationMode: "NONE",
          }}
          topWidget={
            <h2 className="text-xl font-bold">기부금 내역 (단위:천원)</h2>
          }
        />
        <NextTable
          gqlQuery={client.donationFeed}
          request={{ page: Number(page) || 1, ...searchParams, type: "2" }}
          defaultRequest={{ ...defaultParams, type: "2" }}
          columns={columns}
          listParent={"donationFeed"}
          viewOptions={{
            mode,
            ...options,
            cls: {
              outer: "border-none",
              head: "text-lg border-b-2 border-black font-bold text-black dark:border-white dark:text-white",
            },
            paginationMode: "NONE",
          }}
          topWidget={
            <h2 className="text-xl font-bold">기부금 사용내역 (단위:천원)</h2>
          }
        />
      </ScrollArea>
    </div>
  );
};

export default Donation;
