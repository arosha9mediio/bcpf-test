"use client";

import { HeaderSorter } from "@/components/table/components/HeaderSorter";
import { SortingIcons } from "@/components/table/components/SortingIcons";
import { TableActions } from "@/components/table/components/TableActions";
import ActiveFormatter from "@/components/table/formatters/ActiveFormatter";
import { DateTimeFormatter } from "@/components/table/formatters/DateTimeFormatter";
import { Button } from "@/components/ui/button";
import { Post } from "@/lib/__generated/sdk";
import { getImagePath } from "@/utils/aws";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

const tags = [
  { value: "1", label: "Drama" },
  { value: "2", label: "Documentary" },
  { value: "3", label: "Creator" },
];

export const ADMIN_SLIDER_COLUMNS: ColumnDef<Post>[] = [
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
    accessorKey: "title",
    header: "column_title",
    cell: ({ getValue }) => (
      <div className="flex flex-row gap-2 items-center">
        <div className="capitalize">{`${getValue()}`}</div>
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "description",
    cell: ({ getValue }) => (
      <div className="flex flex-row gap-2 items-center">
        <div className="capitalize">{`${getValue()}`}</div>
      </div>
    ),
  },
  {
    accessorKey: "tags",
    header: ({ column, table: { getState } }) => {
      const state = getState();
      const { id, desc } = state.sorting?.[0] || {};

      const isActive = column?.id === id;

      return (
        <HeaderSorter
          callback={() => column.toggleSorting(column.getIsSorted() === "asc")}
          sortingProps={{ state: isActive, desc }}
          label={"Tags"}
        />
      );
    },

    cell: ({ row }) => {
      const tagValue = row.getValue("tags") as string;
      const tag = tags.find(t => t.value === tagValue);

      return (
        <div className="capitalize pl-4">{tag ? tag.label : "Unknown Tag"}</div>
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
          label={"column_createdAt"}
        />
      );
    },

    cell: ({ row }) => {
      const date = row.getValue("createdAt") satisfies string;
      return <DateTimeFormatter date={date} />;
    },
  },

  // {
  //   accessorKey: "title",
  //   header: "Title",
  //   cell: ({ getValue }) => (
  //     <div className="flex flex-row gap-2 items-center">
  //       <div className="capitalize">{`${getValue()}`}</div>
  //     </div>
  //   ),
  // },

  {
    accessorKey: "publishStatus",
    header: ({ column, table: { getState } }) => {
      const state = getState();
      const { id, desc } = state.sorting?.[0] || {};

      const isActive = column?.id === id;

      return (
        <HeaderSorter
          callback={() => column.toggleSorting(column.getIsSorted() === "asc")}
          sortingProps={{ state: isActive, desc }}
          label={"column_status"}
        />
      );
    },

    cell: ({ row }) => {
      const value = Number(row.getValue("publishStatus")) satisfies
        | number
        | string; // blame tanstack/table
      return (
        <div className="capitalize pl-4">
          <ActiveFormatter value={value} />
        </div>
      );
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
