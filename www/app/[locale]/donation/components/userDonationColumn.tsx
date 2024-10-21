"use client";

import { Donation } from "@/lib/__generated/sdk";
import { ColumnDef } from "@tanstack/react-table";

export const USER_DONATION_COLUMNS: ColumnDef<Donation>[] = [
  {
    accessorKey: "month",
    header: () => <div style={{ width: "80px" }}>날짜</div>,
    cell: ({ getValue }) => (
      <div style={{ width: "80px" }}>{getValue<Donation["month"]>()}</div>
    ),
  },
  {
    accessorKey: "names",
    header: () => <div>내역</div>,
    cell: ({ getValue }) => <div>{getValue<Donation["names"]>()}</div>,
  },
  {
    accessorKey: "price",
    header: () => <div style={{ textAlign: "right" }}>금액</div>,
    cell: ({ getValue }) => (
      <div style={{ textAlign: "right" }}>{getValue<Donation["price"]>()}</div>
    ),
  },
];
