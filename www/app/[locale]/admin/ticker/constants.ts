import { ViewSettings } from "@/components/table/NextTable";
import { PaginatedRequest, Post } from "@/lib/__generated/sdk";
import { ADMIN_TICKER_COLUMNS } from "./components/admin-ticker-columns";

const TICKER_DEFAULT_PARAMS: PaginatedRequest = {
  page: 1,
  pageSize: 8,
  sortType: "asc",
  categoryId: 30,
  from: undefined,
  to: undefined,
} as const;

const TICKER_VIEW_SETTINGS: ViewSettings<Post> = {
  textOnly: [ADMIN_TICKER_COLUMNS, { headers: true, useStore: true }],
  column: null,
  grid: null,
} as const;

export { TICKER_DEFAULT_PARAMS, TICKER_VIEW_SETTINGS };
