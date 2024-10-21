"use client";

import { TableActions } from "@/components/table/components/TableActions";
import { DateTimeFormatter } from "@/components/table/formatters/DateTimeFormatter";
import { StatusFormatter } from "@/components/table/formatters/StatusFormatter";
import { Post } from "@/lib/__generated/sdk";

import { PUBLISH_STATUS } from "../../constant";

import { ColumnDef } from "@tanstack/react-table";

export const ADMIN_TEXT_ONLY_COLUMNS: ColumnDef<Post>[] = [
  {
    accessorKey: "id",
    cell: ({ getValue }) => (
      <div className="flex flex-row gap-2 items-center w-[4rem]">
        <div className="capitalize">{`${getValue()}`}</div>
      </div>
    ),
  },
  {
    accessorKey: "title",
    cell: ({ getValue }) => (
      <div className="truncate  w-[40rem] ">{`${getValue()}`}</div>
    ),
  },
  {
    accessorKey: "views",

    cell: ({ getValue }) => (
      <div className=" text-right w-[4rem] normal-nums pr-4">
        {Number(getValue()).toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",

    cell: ({ getValue }) => {
      return <DateTimeFormatter date={getValue() as string} />;
    },
  },

  {
    accessorKey: "publishStatus",

    cell: ({ getValue }) => {
      return (
        <div className="capitalize  w-[4rem]">
          <StatusFormatter status={PUBLISH_STATUS} value={Number(getValue())} />
        </div>
      );
    },
  },

  {
    accessorKey: "User.UserProfile.name",
    header: "column_publisher",
    enableSorting: false,

    cell: ({ row }) => {
      const name = row.original.User?.UserProfile?.name || "-";
      return <div className="capitalize truncate w-[4rem]">{name}</div>;
    },
  },

  {
    id: "actions",

    cell: ({ row }) => {
      const payment = row.original;

      return (
        <div className="  w-[2rem]">
          <TableActions id={payment.id} />
        </div>
      );
    },
  },
];
