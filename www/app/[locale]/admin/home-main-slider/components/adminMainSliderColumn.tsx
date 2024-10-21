"use client";

import { HeaderSorter } from "@/components/table/components/HeaderSorter";
import { SortingIcons } from "@/components/table/components/SortingIcons";
import { TableActions } from "@/components/table/components/TableActions";
import { DateTimeFormatter } from "@/components/table/formatters/DateTimeFormatter";
import { Button } from "@/components/ui/button";
import { Post } from "@/lib/__generated/sdk";
import { getImagePath } from "@/utils/aws";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export const ADMIN_MAIN_SLIDER_COLUMNS: ColumnDef<Post>[] = [
  {
    accessorKey: "id",
    header: ({ column, table: { getState } }) => {
      const state = getState();
      const { id, desc } = state.sorting?.[0] || {};
      const isActive = column?.id === id;
      return (
        <HeaderSorter
          buttonProps={{ className: "pl-0" }}
          callback={() => column.toggleSorting(column.getIsSorted() === "asc")}
          sortingProps={{ state: isActive, desc }}
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
    accessorKey: "file",
    header: "column_image",
    cell: ({ getValue }) => {
      const files = getValue() as {
        url: string;
        filename: string;
        type: string;
      }[];
      const firstFile = files?.[0];

      return (
        <div className="flex flex-row gap-2 items-center">
          {firstFile && (
            <Image
              width={50}
              height={50}
              src={getImagePath(firstFile.url)}
              alt={firstFile.filename}
              className="rounded"
            />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "views",
    header: ({ column, table: { getState } }) => {
      const state = getState();
      const { id, desc } = state.sorting?.[0] || {};
      const isActive = column?.id === id;
      return (
        <HeaderSorter
          callback={() => column.toggleSorting(column.getIsSorted() === "asc")}
          sortingProps={{ state: isActive, desc }}
          label={"column_views"}
        />
      );
    },
    cell: ({ row }) => (
      <div className="capitalize pl-4">{row.getValue("views")}</div>
    ),
  },
  {
    accessorKey: "publishedAt",
    header: ({ column, table: { getState } }) => {
      const state = getState();
      const { id, desc } = state.sorting?.[0] || {};

      const isActive = column?.id === id;

      return (
        <HeaderSorter
          callback={() => column.toggleSorting(column.getIsSorted() === "asc")}
          sortingProps={{ state: isActive, desc }}
          label={"period"}
        />
      );
    },

    cell: ({ row }) => {
      const startDate = row.original.publishedAt;
      const endDate = row.original.unpublishedAt;
      return (
        <div className="flex flex-row gap-2 items-center">
          <div className="flex flex-row space-x-1">
            <DateTimeFormatter format="yyyy-MM-dd HH:mm" date={startDate} />
            <div>~</div>
            <DateTimeFormatter format="yyyy-MM-dd HH:mm" date={endDate} />
          </div>
        </div>
      );
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <TableActions
          id={payment.id}
          deleteMessage="Main slider deleted successfully."
        />
      );
    },
  },
];
