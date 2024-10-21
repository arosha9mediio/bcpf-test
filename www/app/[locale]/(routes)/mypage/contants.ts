import { ViewSettings } from "@/components/table/NextTable";
import {
  Contest,
  ContestApply,
  PaginatedRequest,
  Post,
} from "@/lib/__generated/sdk";
import { ADMIN_TEXT_ONLY_COLUMNS } from "../../admin/notice/components/adminNoticeColumn";
import { SelectionItemType } from "@/components/search/SearchBar";
import { MYPAGE_TEXT_ONLY_COLUMNS } from "./components/mypageColumns";

// DEFAULT SEARCH PARAMS
const DEFAULT_MYPAGE_PARAMS: PaginatedRequest = {
  page: 1,
  pageSize: 8,
  sortType: "asc",
  categoryId: 1,
  from: undefined,
  to: undefined,
  client: true,
};

const MYPAGE_SEARCH_BY_TYPES: SelectionItemType = {
  title: {
    label: "search_bar_type_drop_down_title",
    value: "title",
  },
  body: {
    label: "search_bar_type_droop_down_content",
    value: "body",
  },
} as const;

const VIEW_SETTINGS: ViewSettings<ContestApply> = {
  textOnly: [
    MYPAGE_TEXT_ONLY_COLUMNS,
    {
      headers: true,
      paginationMode: "ROUNDED",
      cls: {
        outer: "ring-0 border-b-2 border-[#111111]",
        head: "border-b-2 border-[#111111] px-0",
        cell: "px-0",
        header: "",
        table: "",
      },
    },
  ],
  column: null,
  grid: null,
  // .. grid n columns if needed
  // if role based; drop this inside server component for dynamic columns
} as const;

export { DEFAULT_MYPAGE_PARAMS, MYPAGE_SEARCH_BY_TYPES };
export { VIEW_SETTINGS };
