import dynamic from "next/dynamic";
import { NextTable, NextTableViewModes } from "@/components/table/NextTable";
import RootLayoutNew from "../components/common/layout/RootLayout";
import MyPageDetails from "../components/my-page/MyPageDetails";
// import MyPageHero from "../components/my-page/MyPageHero";
import "/public/assets/scss/master.scss";
import { client } from "@/lib/client";
import { Search } from "@/components/search/SearchBar";
import { PaginatedRequest } from "@/lib/__generated/sdk";

import {
  DEFAULT_MYPAGE_PARAMS,
  MYPAGE_SEARCH_BY_TYPES,
  VIEW_SETTINGS,
} from "./contants";

const MyPageHero = dynamic(() => import("../components/my-page/MyPageHero"), {
  ssr: false,
});

type MyPageProps = {
  searchParams?: PaginatedRequest;
  params: { locale: string };
};

type MyPageType = (props: MyPageProps) => JSX.Element;

const MyPage: MyPageType = ({ searchParams: { page, ...searchParams } }) => {
  const mode: NextTableViewModes = "textOnly";
  const [columns, options] = VIEW_SETTINGS[mode];

  const fPage = Number(page || 1);

  return (
    <RootLayoutNew header="header3" footer="footer4">
      <MyPageHero />
      <MyPageDetails>
        <div>
          <NextTable
            gqlQuery={client.ApplicationFeed}
            request={{ page: fPage, ...searchParams }}
            defaultRequest={DEFAULT_MYPAGE_PARAMS}
            columns={columns}
            listParent={"applicationFeed"}
            viewOptions={{ mode, ...options }}
            pinned={null}
            // onRowClick={handleRowClick}
            topWidget={
              <Search
                components={["SEARCHBY", "SEARCH", "SUBMIT", "RESET"]}
                searchByItems={MYPAGE_SEARCH_BY_TYPES}
                defaultRequest={DEFAULT_MYPAGE_PARAMS}
              />
            }
          />
        </div>
      </MyPageDetails>
    </RootLayoutNew>
  );
};

export default MyPage;
