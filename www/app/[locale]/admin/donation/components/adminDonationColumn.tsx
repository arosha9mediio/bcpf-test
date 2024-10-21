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
import { Donation } from "@/lib/__generated/sdk";
import { client } from "@/lib/client";
import { ColumnDef } from "@tanstack/react-table";

const DONATION_TYPE: StatusType = {
  1: { label: "Donation", color: "primary", variant: "destructive" },
  2: { label: "Money", color: "error", variant: "default" },
};

export const ADMIN_DONATION_COLUMNS: ColumnDef<Donation>[] = [
  {
    accessorKey: "id",
    header: ({ column, table: { getState } }) => {
      const state = getState();
      const { id, desc } = state.sorting?.[0] || {};
      const isActive = column?.id === id;

      return (
        <HeaderSorter
          buttonProps={{ className: "px-0" }}
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
  { accessorKey: "names", header: "column_name" },
  { accessorKey: "year", header: "column_year" },
  { accessorKey: "month", header: "column_month" },
  { accessorKey: "price", header: "column_amount" },
  {
    accessorKey: "type",
    header: "column_type",
    cell: ({ row }) => {
      const value = Number(row.getValue("type"));
      return (
        <div className="capitalize">
          <StatusFormatter status={DONATION_TYPE} value={value} />
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
          label={"column_createdAt"}
        />
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("createdAt") satisfies string;
      return <DateTimeFormatter date={date} />;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column, table: { getState } }) => {
      const state = getState();
      const { id, desc } = state.sorting?.[0] || {};
      const isActive = column?.id === id;
      return (
        <HeaderSorter
          callback={() => column.toggleSorting(column.getIsSorted() === "asc")}
          sortingProps={{ desc, state: isActive }}
          label={"column_updatedAt"}
        />
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("updatedAt") satisfies string;
      return <DateTimeFormatter date={date} />;
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
          deleteMessage="Donation deleted successfully."
          deleteMutation={({ id }) => client.deleteDonation({ id })}
        />
      );
    },
  },
];
