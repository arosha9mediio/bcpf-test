"use client";

import { HeaderSorter } from "@/components/table/components/HeaderSorter";
import { TableActions } from "@/components/table/components/TableActions";
import { Post } from "@/lib/__generated/sdk";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { removeSchemeAndSubdomain } from "../utils/utils";
import { DateTimeFormatter } from "@/components/table/formatters/DateTimeFormatter";

const ADMIN_TICKER_COLUMNS: ColumnDef<Post>[] = [
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
    accessorKey: "body",
    header: "column_link",
    cell: ({ row }) => {
      const slug = row.original.body || "N/A";
      return (
        <Link
          prefetch={false}
          href={{ pathname: slug }}
          target="_blank"
          className="hover:underline text-blue-500">
          {removeSchemeAndSubdomain(slug)}
        </Link>
      );
    },
  },
  {
    accessorKey: "publishedAt",
    header: ({ column, table: { getState } }) => {
      const state = getState();
      const { id, desc } = state.sorting?.[0] || {};

      const isActive = column?.id === id;

      return (
        <HeaderSorter
          buttonProps={{ className: "p-1" }}
          callback={() => column.toggleSorting(column.getIsSorted() === "asc")}
          sortingProps={{ state: isActive, desc }}
          label={"duration"}
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

      return <TableActions id={payment.id} />;
    },
  },
];

export { ADMIN_TICKER_COLUMNS };
