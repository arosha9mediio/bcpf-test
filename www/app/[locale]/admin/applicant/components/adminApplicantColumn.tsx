"use client";

import { SortingIcons } from "@/components/table/components/SortingIcons";
import { TableActions } from "@/components/table/components/TableActions";
import { DateTimeFormatter } from "@/components/table/formatters/DateTimeFormatter";
import {
  StatusFormatter,
  StatusType,
} from "@/components/table/formatters/StatusFormatter";
import { Button } from "@/components/ui/button";
import { ContestApply } from "@/lib/__generated/sdk";

import { ColumnDef } from "@tanstack/react-table";
import { CONTEST_TYPES } from "./constants";
import { Badge } from "@/components/ui/badge";
import { StatusComponent } from "./statusComponent";
import { HeaderSorter } from "@/components/table/components/HeaderSorter";
import DownloadFile from "./downloadFile";

const PUBLISH_STATUS: StatusType = {
  0: { label: "UNPUBLISHED", color: "primary", variant: "destructive" },
  1: { label: "PUBLISHED", color: "error", variant: "default" },
} as const;

const handleOnEdit = () => {
  console.log("work");
};
export const ADMIN_TEXT_ONLY_COLUMNS: ColumnDef<ContestApply>[] = [
  {
    accessorKey: "applyNumber",
    header: ({ column, table: { getState } }) => {
      const state = getState();
      const { id, desc } = state.sorting?.[0] || {};

      const isActive = column?.id === id;

      return (
        <HeaderSorter
          buttonProps={{ className: "pl-0" }}
          callback={() => column.toggleSorting(column.getIsSorted() === "asc")}
          sortingProps={{ state: isActive, desc }}
          label={"column_appNumber"}
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
    id: "userInfo",
    header: "column_userInfo",
    cell: ({ row }) => {
      const applier1Name = row.original.applier1Name;
      const applier1Email = row.original.applier1Email;
      const applier1Mobile = row.original.applier1Mobile;

      return (
        <div className="flex flex-col gap-1">
          <div>{applier1Name}</div>
          <div>{applier1Mobile}</div>
          <div>{applier1Email}</div>
        </div>
      );
    },
  },
  {
    id: "passStatus",
    header: "column_status",
    cell: ({ row }) => {
      const passStatus = row.original.passStatus;
      const id = row.original.id;

      return (
        <div className="flex flex-col gap-1">
          <StatusComponent status={passStatus} id={id} />
        </div>
      );
    },
  },
  {
    id: "applicant",
    header: "column_publisher",
    cell: ({ row }) => {
      const applier1Name = row.original.applier1Name;
      const applier1Email = row.original.applier1Email;

      return (
        <div className="flex flex-col gap-1">
          <div>{applier1Name}</div>
          <div>{applier1Email}</div>
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
          buttonProps={{ className: "pl-0" }}
          callback={() => column.toggleSorting(column.getIsSorted() === "asc")}
          sortingProps={{ state: isActive, desc }}
          label={"column_applicationDate"}
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
      const id = row.original.id;
      const file = row.original.file;

      return <DownloadFile file={file} applicationId={id} />;
    },
  },
];
