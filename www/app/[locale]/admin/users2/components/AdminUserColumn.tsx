"use client";

import { TableActions } from "@/components/table/components/TableActions";
import { DateTimeFormatter } from "@/components/table/formatters/DateTimeFormatter";
import {
  StatusFormatter,
  StatusType,
} from "@/components/table/formatters/StatusFormatter";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/lib/__generated/sdk";
import { client } from "@/lib/client";
import { getErrorMessage } from "@/utils/error";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useRouter } from "next/navigation";

const USER_ROLES: StatusType = {
  ADMIN: { label: "Admin", variant: "destructive" },
  USER: { label: "User", variant: "default" },
  TEACHER: { label: "Teacher", variant: "outline" },
};

const USER_STATUS: StatusType = {
  1: { label: "Active", variant: "default" },
  2: { label: "Inactive", variant: "destructive" },
  3: { label: "Banned", variant: "secondary" },
  4: { label: "Deleted", variant: "outline" },
};

export const ADMIN_USERS_COLUMNS: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    cell: ({ getValue }) => (
      <div className="flex flex-row gap-2 items-center">
        <div className="capitalize">{`${getValue()}`}</div>
      </div>
    ),
  },
  {
    accessorKey: "UserProfile.name",
    header: "column_name",
    enableSorting:false
  },
  {
    accessorKey: "email",
    header: "column_email",
    cell: ({ row }) => {
      const email = row.getValue("email") satisfies string;
      return (
        <Link
          target="_blank"
          href={`mailto:${email}`}
          className="hover:underline text-blue-500">
          {email}
        </Link>
      );
    },
    enableSorting:false
  },
  {
    accessorKey: "UserProfile.phone",
    header: "column_phone",
    cell: ({ row }) => {
      const phone = row?.original?.UserProfile?.phone;
      return phone ? (
        <Link
          target="_blank"
          href={`tel:${phone}`}
          className="hover:underline text-blue-500">
          {phone}
        </Link>
      ) : (
        "-"
      );
    },
    enableSorting:false
  },

  {
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.getValue("status") satisfies string;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter();
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { toast } = useToast();
      const onStatusChange = async (status: string) => {
        try {
          await client.updateUser({
            updateUserDto: { id: row?.original?.id, status: +status },
          });
          router.refresh();
        } catch (e) {
          toast({
            variant: "destructive",
            title: "Error",
            description: getErrorMessage(e),
          });
        }
      };
      return (
        <div className="capitalize">
          <StatusFormatter
            status={USER_STATUS}
            value={status}
            onStatusChange={onStatusChange}
          />
        </div>
      );
    },
    enableSorting:false
  },
  {
    accessorKey: "role",
    cell: ({ row }) => {
      const role = row.getValue("role") satisfies string;
      return (
        <div className="capitalize">
          <StatusFormatter status={USER_ROLES} value={role} />
        </div>
      );
    },
    enableSorting:false
  },

  {
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") satisfies string;
      return <DateTimeFormatter date={date} />;
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <TableActions
          id={user.id}
          deleteMessage="User deleted successfully."
          deleteMutation={({ id }) =>
            client.updateUser({
              updateUserDto: { id, status: 4 },
            })
          }
        />
      );
    },
  },
];