"use client";

import { DateTimeFormatter } from "@/components/table/formatters/DateTimeFormatter";
import { Post } from "@/lib/__generated/sdk";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { NoticeTile } from "../components/NoticeTile";

export const NOTICE_TABLE_COLUMNS: ColumnDef<Post>[] = [
  {
    header: function Header() {
      const t = useTranslations();
      return (
        <div className="capitalize text-base sm:text-lg font-bold">
          {t("column_title")}
        </div>
      );
    },
    accessorKey: "title",
    cell: function Row({ row }) {
      const t = useTranslations();

      const isNotice = Boolean(row?.original?.pin);

      return (
        <NoticeTile
          chipLabel={t("notice_tile_chip")}
          content={row?.original?.title}
          isAnnouncement={isNotice}
          tag={row?.original?.tags}
        />
      );
    },
  },
  {
    header: function Header() {
      const t = useTranslations();
      return (
        <div className="capitalize text-base sm:text-lg font-bold ml-4">
          {t("column_createdAt")}
        </div>
      );
    },
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") satisfies string;

      return <DateTimeFormatter date={date} />;
    },
  },
  {
    header: function Header() {
      const t = useTranslations();
      return (
        <div className="flex flex-row capitalize text-base sm:text-lg font-bold justify-end min-w-[48px] ml-4">
          {t("column_views")}
        </div>
      );
    },

    accessorKey: "views",

    cell: ({ row }) => (
      <div className="flex flex-row capitalize justify-end min-w-[48px] ml-4">
        {row.getValue("views")}
      </div>
    ),
  },
];
