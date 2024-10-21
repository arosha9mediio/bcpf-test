"use client";

import { HeaderSorter } from "@/components/table/components/HeaderSorter";
import { SortingIcons } from "@/components/table/components/SortingIcons";
import { TableActions } from "@/components/table/components/TableActions";
import { DateTimeFormatter } from "@/components/table/formatters/DateTimeFormatter";
import {
  StatusFormatter,
  StatusType,
} from "@/components/table/formatters/StatusFormatter";
import { Button } from "@/components/ui/button";
import { Post } from "@/lib/__generated/sdk";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

const PUBLISH_STATUS: StatusType = {
  0: { label: "UNPUBLISHED", color: "primary", variant: "destructive" },
  1: { label: "PUBLISHED", color: "error", variant: "default" },
} as const;

export const ADMIN_TEXT_ONLY_COLUMNS: ColumnDef<Post>[] = [
  {
    accessorKey: "id",
    header: ({ column, table: { getState } }) => {
      const state = getState();
      const { id, desc } = state.sorting?.[0] || {};

      const isActive = column?.id === id;

      return (
        <HeaderSorter
          callback={() => column.toggleSorting(column.getIsSorted() === "asc")}
          sortingProps={{ state: isActive, desc }}
          buttonProps={{ className: "pl-0" }}
          label={"column_id"}
        />
      );
    },

    cell: ({ getValue }) => (
      <div className="flex flex-row gap-2 items-center">
        <div className="capitalize">{`${getValue()}`}</div>
      </div>
    ),
  },

  {
    accessorKey: "title",
    header: "column_title",
    cell: ({ getValue }) => (
      <div className="flex flex-row gap-2 items-center">
        <div className="capitalize">{`${getValue()}`}</div>
      </div>
    ),
  },

  {
    accessorKey: "slug",
    header: "column_slug",
    cell: ({ row }) => {
      const slug = row.original.slug || "N/A";
      return (
        <Link
          href={`/page/${slug}`}
          target="_blank"
          className="hover:underline text-blue-500">
          {slug}
        </Link>
      );
    },
  },
  {
    accessorKey: "publishStatus",
    header: ({ column, table: { getState } }) => {
      const state = getState();
      const { id, desc } = state.sorting?.[0] || {};

      const isActive = column?.id === id;

      return (
        <HeaderSorter
          buttonProps={{ className: "pl-0" }}
          callback={() => column.toggleSorting(column.getIsSorted() === "asc")}
          sortingProps={{ state: isActive, desc }}
          label={"column_posted"}
        />
      );
    },

    cell: ({ row }) => {
      const value = Number(row.getValue("publishStatus")) satisfies
        | number
        | string; // blame tanstack/table

      return (
        <div className="capitalize">
          <StatusFormatter status={PUBLISH_STATUS} value={value} />
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column, table: { getState } }) => {
      const state = getState();
      const { id, desc } = state.sorting?.[0] || {};
      const isActive = column?.id === id;

      return (
        <HeaderSorter
          callback={() => column.toggleSorting(column.getIsSorted() === "asc")}
          sortingProps={{ state: isActive, desc }}
          label={"column_date"}
        />
      );
    },

    cell: ({ row }) => {
      const date = row.getValue("createdAt") satisfies string;

      return <DateTimeFormatter date={date} />;
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return <TableActions id={payment.id} />;
    },
  },
];
