"use client";

import {
  GetAsset,
  getFileExtension,
} from "@/app/[locale]/post/[type]/[slug]/components/FileTypeDownloader";
import { HeaderSorter } from "@/components/table/components/HeaderSorter";
import { DateTimeFormatter } from "@/components/table/formatters/DateTimeFormatter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ContestApply } from "@/lib/__generated/sdk";

import { ColumnDef } from "@tanstack/react-table";
import { ActionComponent } from "./actionComponent";
import { isCurrentDateWithinInterval } from "../../contest/[contestId]/utils";

export const MYPAGE_TEXT_ONLY_COLUMNS: ColumnDef<ContestApply>[] = [
  {
    accessorKey: "Contest.title",
    header: "admin_contest",
    cell: ({ row }) => (
      <div className="flex flex-row gap-2 items-center">
        <div className="capitalize flex flex-row">
          {row.original?.Contest?.title}
        </div>
      </div>
    ),
  },
  // {
  //   accessorKey: "companyName",
  //   header: ({ column, table: { getState } }) => {
  //     const state = getState();
  //     const { id, desc } = state.sorting?.[0] || {};

  //     const isActive = column?.id === id;

  //     return (
  //       <HeaderSorter
  //         callback={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         sortingProps={{ state: isActive, desc }}
  //         label={"column_companyName"}
  //       />
  //     );
  //   },

  //   cell: ({ row }) => (
  //     <div className="capitalize flex justify-center">
  //       {row?.original?.companyName ?? "-"}
  //     </div>
  //   ),
  // },
  {
    accessorKey: "passStatus",
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
      const status = row.original.passStatus;

      return <div>{status}</div>;
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
          buttonProps={{ className: "pl-0" }}
          label={"column_createdAt"}
        />
      );
    },

    cell: ({ row }) => {
      const date = row.original.createdAt;

      return <DateTimeFormatter date={date} format="yyyy-MM-dd" />;
    },
  },

  {
    accessorKey: "file",
    header: "column_files",
    cell: ({ row }) => {
      const files = row.original?.file;
      const docs = files?.filter(item => item?.type === "DOC");
      const fileNames = docs?.map(doc => doc?.filename);

      const Previews = () =>
        fileNames?.map((name, index) => {
          const extension = getFileExtension(name);
          return <GetAsset key={index} extension={extension} />;
        });

      return (
        <div className="flex">
          <Previews />
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const applicationId = row.original.id;
      const contest = row?.original?.Contest;

      const isContestPeriod = isCurrentDateWithinInterval(
        contest?.startDate,
        contest?.endDate,
      );

      const isEditable =
        row?.original?.Contest?.statusId === 0 || isContestPeriod;

      return (
        <ActionComponent
          contestId={contest?.id}
          applicationId={applicationId}
          isEditable={isEditable}
        />
      );
    },
  },
];
