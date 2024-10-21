"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToastAction, ToastProps } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { client } from "@/lib/client";
import { MoreHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MouseEvent, useState } from "react";
import { ActionAlert, ActionAlertProps } from "./DeleteAlert";
import { LoadingSpinner } from "./TableActionLoader";
import { Mutation } from "@/lib/__generated/sdk";
import useSaveCurrentLocation from "@/hooks/use-save-current-location";

type TableActionsProps = {
  id: string;
  other?: string;
  successToast?: ToastProps;
  failureToast?: ToastProps;

  tableActionTypes?: TableActionTypes[];

  deleteAlertProps?: ActionAlertProps["alertProps"];

  deleteMessage?: string;

  deleteMutation?: (params: { id: string }) => void;
};

type ClickEvent = MouseEvent<HTMLDivElement, globalThis.MouseEvent>;

type TableActionTypes =
  | "LABEL"
  | "EDIT"
  | "DELETE"
  | "SEPARATOR"
  | "COPY"
  | "VIEW";

type TableActionsType = (props: TableActionsProps) => JSX.Element;

const TableActions: TableActionsType = ({
  id,
  successToast,
  failureToast,
  deleteAlertProps,
  deleteMessage,
  other,
  tableActionTypes = ["LABEL", "SEPARATOR", "EDIT", "DELETE"],
  deleteMutation,
}) => {
  const pathName = usePathname();
  useSaveCurrentLocation();

  const { push, refresh } = useRouter();
  const { toast } = useToast();

  const [open, setOpen] = useState<boolean>();
  const [isLoading, setIsLoading] = useState(false);

  const handleOnOpenChange = (e?: ClickEvent) => {
    e?.stopPropagation();
    setOpen(!open);
  };

  const handleOnContinue = async () => {
    setIsLoading(true);
    try {
      await (deleteMutation || client.deletePost)({ id: id });
      refresh();
      // await fakeTimeout(2000);
      toast({
        description: deleteMessage || "삭제되었습니다.",
        variant: "default",
        duration: 1500,
        ...successToast,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `${error}`,
        action: (
          <ToastAction onClick={handleOnContinue} altText="Try again">
            Try again
          </ToastAction>
        ),
        ...failureToast,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Edit this
  const handleOnEdit = (e: ClickEvent) => {
    e.stopPropagation();
    push(`${pathName}/${id}`);
  };

  // View this
  const handleOnView = (e: ClickEvent) => {
    e.stopPropagation();
    push(`${pathName}/${id}`);
  };

  return (
    <DropdownMenu modal={false}>
      {open && (
        <ActionAlert
          open={open}
          onContinue={handleOnContinue}
          onOpenChange={() => {
            handleOnOpenChange();
          }}
          alertProps={deleteAlertProps}
        />
      )}
      <DropdownMenuTrigger asChild onClick={event => event.stopPropagation()}>
        <Button disabled={isLoading} variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          {!isLoading && <MoreHorizontal className="h-4 w-4" />}
          {isLoading && <LoadingSpinner className={null} />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {tableActionTypes.map((item, index) => {
          switch (item) {
            case "LABEL":
              return (
                <DropdownMenuLabel key={`table-action-${index}`}>
                  기능
                </DropdownMenuLabel>
              );

            case "VIEW":
              return (
                <DropdownMenuItem
                  key={`table-action-${index}`}
                  onClick={handleOnView}>
                  상세보기
                </DropdownMenuItem>
              );
            case "COPY":
              return (
                <DropdownMenuItem
                  key={`table-action-${index}`}
                  onClick={e => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(id);
                  }}>
                  Copy ID
                </DropdownMenuItem>
              );
            case "EDIT":
              return (
                <DropdownMenuItem
                  key={`table-action-${index}`}
                  onClick={handleOnEdit}>
                  편집
                </DropdownMenuItem>
              );
            case "DELETE":
              return (
                <DropdownMenuItem
                  key={`table-action-${index}`}
                  onClick={handleOnOpenChange}>
                  삭제
                </DropdownMenuItem>
              );

            case "SEPARATOR":
              return <DropdownMenuSeparator key={`table-action-${index}`} />;

            default:
              null;
          }
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { TableActions };
