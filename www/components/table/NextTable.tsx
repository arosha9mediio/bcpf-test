import { Exact, PaginatedRequest } from "@/lib/__generated/sdk";
import { ColumnDef } from "@tanstack/react-table";
import { GraphQLClientRequestHeaders } from "graphql-request/build/esm/types";
import { DataTableDemo, OnRowClick } from "./TableBoilerplate";

type NextTableProps<T, E> = {
  gqlQuery: QueryMethod<T>;
  columns: ColumnDef<E>[];
  listParent: keyof T;

  viewOptions?: NextTableViewOptions;
  topWidget?: JSX.Element;

  pinned?: PinnedQueryProps<T>;

  onRowClick?: OnRowClick<E>;
} & Pick<FetchFilteredPostsProps<T>, "request" | "defaultRequest">;

type PinnedQueryProps<T> = {
  pinned: QueryMethod<T>;
  defaultRequest: PaginatedRequest;
};

type NextTableViewOptions = {
  boundaryLines?: boolean;
  headers?: boolean;
  mode?: NextTableViewModes;
  paginationMode?: NextTablePaginationModes;
  selectedRows?: boolean;
  columnSelector?: boolean;
  useStore?: boolean;

  cls?: NextTableStyles;
};

type NextTableStyles = {
  outer?: string;
  table?: string;
  cell?: string;
  header?: string;
  head?: string;
};

type ReadonlyTuple<T> = readonly [
  ColumnDef<T>[],
  Readonly<Omit<NextTableViewOptions, "mode">>,
];

type ViewSettings<T> = Record<NextTableViewModes, ReadonlyTuple<T>>;

type NextTableViewModes = "textOnly" | "column" | "grid";

type NextTablePaginationModes = "DEFAULT" | "ROUNDED" | "NONE";

type FetchFilteredPostsProps<T> = {
  request: Pick<PaginatedRequest, "query" | "page" | "type">;
  defaultRequest?: PaginatedRequest;
  query: QueryMethod<T>;
};

type QueryMethod<T> = (
  variables?: Exact<{
    pageRequest?: PaginatedRequest;
  }>,
  requestHeaders?: GraphQLClientRequestHeaders,
) => Promise<T>;

type FetchFilteredPostsType = <T>(
  props: FetchFilteredPostsProps<T>,
) => Promise<T>;

// GET POSTS
const fetchFilteredPosts: FetchFilteredPostsType = async ({
  query,
  request,
  defaultRequest,
}) =>
  await query({
    pageRequest: { ...defaultRequest, ...request },
  });

type NextTableType = <T, E>(
  props: NextTableProps<T, E>,
) => Promise<JSX.Element>;

const NextTable: NextTableType = async <T, E>({
  gqlQuery,
  request,
  columns,
  listParent,
  defaultRequest,

  viewOptions,
  topWidget,

  pinned,

  onRowClick,
}: NextTableProps<T, E>) => {
  const pinnedResponse = await fetchFilteredPosts({
    query: pinned?.pinned,
    request: null,
    defaultRequest: pinned?.defaultRequest,
  }).catch(error => null);

  const response = await fetchFilteredPosts({
    query: gqlQuery,
    request,
    defaultRequest,
  });

  const pinnedPosts: E[] | undefined = pinnedResponse?.[listParent]?.["list"];

  const posts: E[] | undefined = response?.[listParent]?.["list"];
  const totalPages = response?.[listParent]?.["pageCount"];
  const count = response?.[listParent]?.["itemCount"];

  const mergedPosts = [...(pinnedPosts ?? []), ...posts];

  // if (posts?.length === 0 || posts === null || posts === undefined) {
  //   return <div>{"No Data"}</div>;
  // }

  return (
    <DataTableDemo
      columns={columns}
      data={mergedPosts}
      totalPages={totalPages}
      options={viewOptions}
      topWidget={topWidget}
      itemCount={count}
      onRowClick={onRowClick}
    />
  );
};

export { NextTable, fetchFilteredPosts };
export type {
  NextTableProps,
  NextTableViewModes,
  NextTableViewOptions,
  PinnedQueryProps,
  QueryMethod,
  ViewSettings,
};
