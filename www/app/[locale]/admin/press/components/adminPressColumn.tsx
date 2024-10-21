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
import { PUBLISH_STATUS } from "../../constant";

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
    accessorKey: "views",
    header: ({ column, table: { getState } }) => {
      const state = getState();
      const { id, desc } = state.sorting?.[0] || {};

      const isActive = column?.id === id;

      return (
        <div className="flex justify-center">
          <HeaderSorter
            callback={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }
            sortingProps={{ state: isActive, desc }}
            label={"column_views"}
          />
        </div>
      );
    },

    cell: ({ row }) => (
      <div className="capitalize flex justify-center">
        {row.getValue("views")}
      </div>
    ),
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

      return (
        <div className="pl-4">
          <DateTimeFormatter date={date} />
        </div>
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
          label={"column_status"}
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
    accessorKey: "User.UserProfile.name",
    header: "column_publisher",
    cell: ({ row }) => {
      const name = row.original.User?.UserProfile?.name || "N/A";
      return <div className="capitalize">{name}</div>;
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
