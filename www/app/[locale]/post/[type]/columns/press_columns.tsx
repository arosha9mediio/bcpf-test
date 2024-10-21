"use client";

import { Post } from "@/lib/__generated/sdk";

import { ColumnDef } from "@tanstack/react-table";

import { PressCard } from "../components/PressCard";
import { getImagePath } from "@/utils/aws";

const FALLBACK_THUMBNAIL =
  "https://d7nka16kwym54.cloudfront.net/dev/tmp/7763ff64-71da-4a30-a601-e7ae9add7df6" as const;

const getImageWithFallback = (img?: string): string => {
  if (!img) {
    return FALLBACK_THUMBNAIL;
  }

  return getImagePath(img);
};

export const PRESS_GRID_COLUMNS: ColumnDef<Post>[] = [
  {
    accessorKey: "file.original",
    cell: ({ row }) => {
      const hrefPath =
        row.original?.slug?.length !== 0
          ? row.original?.slug
          : row.original?.id;

      const thumbnail = row?.original?.file?.find(
        item => item?.type === "IMAGE",
      )?.url;

      const image = getImageWithFallback(thumbnail);

      return (
        <PressCard
          id={hrefPath}
          image={image}
          subtitle={row?.original?.description ?? row?.original?.title}
          title={row?.original?.title}
          date={row.original.createdAt}
          views={row?.original?.views}
          mode="grid"
          imgCls={"max-h-[200px]"}
        />
      );
    },
  },
];

export const PRESS_THUMBNAIL_COLUMN: ColumnDef<Post>[] = [
  {
    accessorKey: "file.original",
    cell: ({ row }) => {
      const hrefPath =
        row.original?.slug?.length !== 0
          ? row.original?.slug
          : row.original?.id;

      const thumbnail = row?.original?.file?.find(
        item => item?.type === "IMAGE",
      )?.url;

      const image = getImageWithFallback(thumbnail);

      return (
        <PressCard
          id={hrefPath}
          image={image}
          subtitle={row?.original?.tags}
          title={row?.original?.title}
          date={row.original.createdAt}
          views={row?.original?.views}
          mode="column"
        />
      );
    },
  },
];
