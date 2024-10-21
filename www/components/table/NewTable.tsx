import { Exact, PaginatedRequest } from "@/lib/__generated/sdk";
import { ColumnDef } from "@tanstack/react-table";
import { GraphQLClientRequestHeaders } from "graphql-request/build/esm/types";
import { OnRowClick } from "./TableBoilerplate";
import { client } from "@/lib/client";
import { Locale } from "@/dictionaries";
import { CustomReactTable } from "./CustomReactTable";

type DefaultTablePageProps = {
  searchParams?: PaginatedRequest;
  params: { locale: Locale }; // undefined
};

type TablePageType = (props: DefaultTablePageProps) => Promise<JSX.Element>;

type NextTableProps<T, E> = {
  gqlQuery?: QueryMethod<T>;
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

// DEFAULT SEARCH PARAMS
const defaultPaginatedRequest: PaginatedRequest = {
  page: 1,
  pageSize: 10,
  sortType: "desc",
};

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

// GET POSTS
const fetchFilteredPosts = async ({ query, request }) =>
  await query({
    pageRequest: {
      ...defaultPaginatedRequest,
      ...request,
      ...{ page: request.page ? Number(request.page) : 1 },
    },
  });

type NextTableType = <T, E>(
  props: NextTableProps<T, E>,
) => Promise<JSX.Element>;

const NewTable: NextTableType = async <T, E>({
  // gqlQuery,
  request,
  columns,
  listParent,

  viewOptions,
  topWidget,

  pinned,

  onRowClick,
}: NextTableProps<T, E>) => {
  const gqlQuery = client[listParent as string];
  const pinnedResponse = await fetchFilteredPosts({
    query: pinned?.pinned,
    request: null,
  }).catch(error => null);

  const response = await fetchFilteredPosts({
    query: gqlQuery,
    request,
  });

  console.log({ ...response });

  const pinnedPosts: E[] | undefined = pinnedResponse?.[listParent]?.["list"];

  const posts: E[] | undefined = response?.[listParent]?.["list"];
  const totalPages = response?.[listParent]?.["pageCount"];
  const count = response?.[listParent]?.["itemCount"];

  const mergedPosts = [...(pinnedPosts ?? []), ...posts];

  if (posts?.length === 0 || posts === null || posts === undefined) {
    return <div>{"No Data"}</div>;
  }

  return (
    <CustomReactTable
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

export { NewTable };
export type { TablePageType };
