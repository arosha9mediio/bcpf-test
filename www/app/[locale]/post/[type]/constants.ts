import {
  NextTableViewModes,
  NextTableViewOptions,
  PinnedQueryProps,
} from "@/components/table/NextTable";
import { PaginatedRequest, Post, PostFeedQuery } from "@/lib/__generated/sdk";
import { ColumnDef } from "@tanstack/react-table";
import { NOTICE_TABLE_COLUMNS } from "./columns/notice_columns";
import {
  PRESS_GRID_COLUMNS,
  PRESS_THUMBNAIL_COLUMN,
} from "./columns/press_columns";
import { SearchProps, SelectionItemType } from "@/components/search/SearchBar";
import { client } from "@/lib/client";

const CATEGORY_TYPES = {
  notice: {
    /**
     * 5 : NOTICE | 9 : PRESS
     */
    id: 1,
    layoutProps: {
      text: "알림마당",
      title: "공지사항",
      subtitle: "-  총 402건의 게시글이 있습니다.",
    },
  },
  press: {
    id: 2,
    layoutProps: {
      text: "알림마당",
      title: "보도자료",
      subtitle: "-  총 96건의 게시글이 있습니다.",
    },
  },
} as const;

// ---

// NOTICE
const NOTICE_DEFAULT_PARAMS: PaginatedRequest = {
  page: 1,
  pageSize: 10,
  sortType: "DESC",
  categoryId: 1,
  sortBy: "createdAt",
  type: null,
  searchBy: null,
  client: true,
  query: "",
};

const NOTICE_DEFAULT_PINNED_PARAMS: PinnedQueryProps<PostFeedQuery> = {
  pinned: client.postFeed,
  defaultRequest: {
    page: 1,
    categoryId: 1,
    pageSize: 3,
    type: null,
    searchBy: null,
    client: true,
    query: "",
    sortBy: "pin",
    sortType: "DESC",
  },
} as const;

const NOTICE_SEARCH_BY_TYPES: SelectionItemType = {
  all: {
    label: "search_bar_type_droop_down_all",
    value: null,
  },
  title: {
    label: "search_bar_type_drop_down_title",
    value: "title",
  },
  body: {
    label: "search_bar_type_droop_down_content",
    value: "body",
  },
} as const;

// PRESS
const PRESS_DEFAULT_PARAMS: PaginatedRequest = {
  page: 1,
  pageSize: 12,
  sortType: "asc",
  categoryId: 2,
  type: null,
  searchBy: null,
  query: "",
};

const PRESS_SEARCH_BY_TYPES: SelectionItemType = {
  all: {
    label: "search_bar_type_droop_down_all",
    value: null,
  },
  title: {
    label: "search_bar_type_drop_down_title",
    value: "title",
  },
  body: {
    label: "search_bar_type_droop_down_content",
    value: "body",
  },
} as const;

// ----

type CategoryTypes = keyof typeof CATEGORY_TYPES;
type CategoryIdTypes = (typeof CATEGORY_TYPES)[CategoryTypes]["id"];

type CategorySearchTypes =
  | typeof NOTICE_SEARCH_BY_TYPES
  | typeof PRESS_SEARCH_BY_TYPES;

type ReadonlyTuple = readonly [
  ColumnDef<Post>[],
  Readonly<Omit<NextTableViewOptions, "mode">>,
];

type CompactReadonlyTuple = readonly [
  Record<NextTableViewModes, ReadonlyTuple>,
  PaginatedRequest,
  CategorySearchTypes,
];
// ----
const NOTICE_VIEW_SETTINGS: Record<NextTableViewModes, ReadonlyTuple> = {
  textOnly: [
    NOTICE_TABLE_COLUMNS,
    {
      headers: true,
      paginationMode: "ROUNDED",
      useStore: true,
      cls: {
        outer: "ring-0 border-b-2 border-[#111111]",
        head: "border-b-2 border-[#111111] px-0",
        cell: "px-0 hover:cursor-pointer",
        header: "",
        table: "",
      },
    },
  ],
  column: null,
  grid: null,
} as const;

const PRESS_VIEW_SETTINGS: Record<NextTableViewModes, ReadonlyTuple> = {
  column: [
    PRESS_THUMBNAIL_COLUMN,
    {
      headers: false,
      paginationMode: "ROUNDED",
      useStore: true,
      cls: {
        outer: "ring-0",
      },
    },
  ],
  grid: [
    PRESS_GRID_COLUMNS,
    {
      headers: false,
      paginationMode: "ROUNDED",
      useStore: true,
      cls: {
        outer: "ring-0",
      },
    },
  ],
  textOnly: null,
} as const;

const COMPACT_VIEW_SETTINGS: Record<CategoryIdTypes, CompactReadonlyTuple> = {
  "1": [NOTICE_VIEW_SETTINGS, NOTICE_DEFAULT_PARAMS, NOTICE_SEARCH_BY_TYPES],
  "2": [PRESS_VIEW_SETTINGS, PRESS_DEFAULT_PARAMS, PRESS_SEARCH_BY_TYPES],
} as const;

const DYNAMIC_SEARCH_OPTIONS: SearchProps["options"] = {
  variants: {
    search: "underlined",
    searchBy: "underlined",
  },
};

export { CATEGORY_TYPES };
export { COMPACT_VIEW_SETTINGS };
export { NOTICE_DEFAULT_PINNED_PARAMS, DYNAMIC_SEARCH_OPTIONS };
export type { CategoryTypes, CategoryIdTypes };
