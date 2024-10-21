"use client";

import { ColumnDef } from "@tanstack/react-table";

import { TableActions } from "@/components/table/components/TableActions";
import { DateTimeFormatter } from "@/components/table/formatters/DateTimeFormatter";
import { Contest } from "@/lib/__generated/sdk";
import ActiveFormatter from "@/components/table/formatters/ActiveFormatter";
import { client } from "@/lib/client";
import { CONTEST_STATUS, CONTEST_TYPES } from "./constants";
import { HeaderSorter } from "@/components/table/components/HeaderSorter";

export const ADMIN_CONTEST_COLUMNS: ColumnDef<Contest>[] = [
  {
    accessorKey: "contestType",
    header: "column_type",
    cell: ({ getValue }) => {
      const contestType = getValue() as keyof typeof CONTEST_TYPES;
      const label = CONTEST_TYPES[contestType]?.label || contestType;
      return (
        <div className="flex flex-row gap-2 items-center">
          <div className="capitalize">{label}</div>
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
    accessorKey: "views",
    header: "column_applicants",
    cell: ({ row }) => {
      const applicants = row.original.Application satisfies any;
      const count = applicants?.length;

      return (
        <div className="flex flex-row gap-2 items-center">
          <div className="capitalize min-w-[3rem]">{count}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "viewMain",
    header: "column_main",

    cell: ({ row }) => {
      const value = row.original.viewMain satisfies string | number;

      const fValue = ["예", "yes", "1", "Y"].includes(value) ? value : "";

      return (
        <div className="min-w-[3rem]">
          <ActiveFormatter value={fValue} />
        </div>
      );
    },
  },
  {
    accessorKey: "statusId",
    header: "column_status",
    cell: ({ getValue }) => {
      const statusId = getValue() as keyof typeof CONTEST_STATUS;
      const label = CONTEST_STATUS[statusId]?.label || statusId;
      return (
        <div className="flex flex-row gap-2 items-center">
          <div className="capitalize">{label}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "startDate",
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
      const startDate = row.original.startDate;
      const endDate = row.original.endDate;
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
          deleteMutation={client.deleteContest}
          id={payment.id}
          other="/contest"
          tableActionTypes={[
            "LABEL",
            "COPY",
            "SEPARATOR",
            "EDIT",
            "DELETE",
            "VIEW",
          ]}
        />
      );
    },
  },
];
