"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ParamRecord, useQueryParams } from "@/hooks/useQueryParams";
import { Paginations } from "../pagination/Pagination";
import { NextTableViewOptions } from "./NextTable";
import { TablePagination } from "./TablePagination";

import { usePathname, useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { SelectionItemType } from "../search/SearchBar";
import { useNextTableStore } from "@/store/useNextTableStore";
import { useTranslations } from "next-intl";
import { processHeader } from "./utils.ts/header-formatter";
import { SortingIcons } from "./components/SortingIcons";
import { HeaderSorter } from "./components/HeaderSorter";

type NextTableColumns<T> = ColumnDef<T, any>[];

type CustomReactTableProps<T> = {
  columns: NextTableColumns<T>;
  data: T[];

  totalPages: number;
  searchItems?: SelectionItemType;

  options?: NextTableViewOptions;

  topWidget?: JSX.Element;

  itemCount?: number;

  onRowClick?: OnRowClick<T>;
};

type OnRowClick<T> = (
  payload?: T,
  path?: string,
  router?: AppRouterInstance,
  params?: ParamRecord,
) => Promise<void>;

type CustomReactTableType = <T>(props: CustomReactTableProps<T>) => JSX.Element;

export const CustomReactTable: CustomReactTableType = <T,>({
  columns: cols,
  data,
  totalPages,
  searchItems,
  topWidget,
  itemCount,
  options: {
    mode = "textOnly",
    headers = true,
    selectedRows = false,
    columnSelector = false,
    paginationMode = "DEFAULT",
    useStore = true,
    cls,
  } = {},
  onRowClick,
}: CustomReactTableProps<T>) => {
  const path = usePathname();
  const router = useRouter();
  const { setCount } = useNextTableStore();
  const t = useTranslations();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns = React.useMemo(() => cols, []);

  const isGrid = React.useMemo(() => mode === "grid", [mode]);
  const isTextOnly = React.useMemo(() => mode === "textOnly", [mode]);
  const isColumnOrText = React.useMemo(
    () => mode === "column" || mode === "textOnly",
    [mode],
  );
  const [_, setQuery] = useQueryParams();

  const handleSetSorting = () => {
    const sortBy = sorting?.[0]?.id;
    const sortType = sorting?.[0]?.desc ? "desc" : "asc";
    const sortData = {
      sortBy,
      sortType,
    } as const;
    const filteredValues = Object.fromEntries(
      Object.entries(sortData).filter(
        ([_, value]) => value !== undefined && value !== null,
      ),
    );

    return setQuery(filteredValues);
  };

  const Pagination = React.useMemo(() => {
    switch (paginationMode) {
      case "DEFAULT":
        return <TablePagination totalPages={totalPages} />;

      case "ROUNDED":
        return <Paginations totalPages={totalPages} />;
      case "NONE":
        return null;
    }
  }, [totalPages, paginationMode]);

  React.useEffect(() => {
    if (!useStore) {
      return;
    }

    setCount(itemCount);
  }, [itemCount]);

  React.useEffect(() => {
    if (sorting?.length === 0) {
      return;
    }

    handleSetSorting();
  }, [sorting]);

  const table = useReactTable<T>({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    manualSorting: true,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageSize: data?.length,
        pageIndex: 0,
      },
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center px-0">
        {/* <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        /> */}

        {topWidget}

        {/* Column Visibility Selector */}
        {isTextOnly && columnSelector && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter(column => column.getCanHide())
                .map(column => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={value =>
                        column.toggleVisibility(!!value)
                      }>
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <div
        className={`
        ${cls?.outer && cls?.outer} 
        ${!cls?.outer && "rounded-md border"}`}>
        <Table>
          {headers && (
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {/* {headerGroup.headers.map(header => {
                    const blended = processHeader({
                      header: header.column.columnDef.header,
                      t,
                    });

                    console.log({ ...header });

                    return (
                      <TableHead className={`${cls?.head}`} key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(blended, header.getContext())}
                      </TableHead>
                    );
                  })} */}
                  {headerGroup.headers.map(header => {
                    let blended =
                      (typeof header.column.columnDef.header === "string"
                        ? header.column.columnDef.header
                        : "") || header.column?.id;
                    if (typeof blended === "string") {
                      blended = t(`column_${blended.replace("column_", "")}`);
                    }

                    const { id, desc } = table.getState().sorting?.[0] || {};
                    return (
                      <TableHead className={`${cls?.head}`} key={header.id}>
                        {header.column?.id ===
                        "actions" ? null : header.column.getCanSort() ? (
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? "select-none cursor-pointer flex items-center gap-1"
                                : "",
                              onClick: header.column.getToggleSortingHandler(),
                            }}>
                            {blended}
                            <SortingIcons
                              desc={desc}
                              state={header.column?.id === id}
                            />
                          </div>
                        ) : (
                          <div>{blended}</div>
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
          )}

          {/* GRID MODE */}
          {isGrid &&
            (table.getRowModel().rows?.length ? (
              <TableBody>
                <>
                  <TableRow className="md:grid md:grid-cols-3 md:gap-4 flex flex-col hover:bg-transparent">
                    {table.getRowModel().rows.map(row => (
                      <TableCell
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}>
                        {row.getVisibleCells().map(cell => (
                          <div key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </div>
                        ))}
                      </TableCell>
                    ))}
                  </TableRow>
                </>
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          {/* GRID MODE ENDS */}

          {isColumnOrText && (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    className={onRowClick ? "hover:cursor-pointer" : null}
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={
                      onRowClick
                        ? () => onRowClick(row?.original, path, router, _)
                        : undefined
                    }>
                    {row.getVisibleCells().map(cell => (
                      <TableCell className={`${cls?.cell}`} key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
      <div className="flex items-center justify-center space-x-2 py-4">
        {selectedRows && (
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
        )}
        {data.length > 0 && (
          <div className="space-x-2 w-full">{Pagination}</div>
        )}
      </div>
    </div>
  );
};

export type { NextTableColumns, OnRowClick };
