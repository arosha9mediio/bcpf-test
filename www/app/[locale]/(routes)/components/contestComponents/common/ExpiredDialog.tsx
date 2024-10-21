"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const DEFAULT_EXPIRED_ALERT_PROPS = {
  title: "contest_period_dialog_title",
  description: "contest_period_dialog_description",

  goback: "contest_period_dialog_close",
} as const;

type ExpiredDialogProps = {
  open?: boolean;
  defaultOpen?: boolean;
};

type ExpiredDialogType = (props: ExpiredDialogProps) => JSX.Element;

const ExpiredDialog: ExpiredDialogType = ({
  open = true,
  defaultOpen = true,
}) => {
  const { back } = useRouter();
  const t = useTranslations();

  return (
    <AlertDialog defaultOpen={defaultOpen} onOpenChange={null} open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t(DEFAULT_EXPIRED_ALERT_PROPS.title)}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t(DEFAULT_EXPIRED_ALERT_PROPS.description)}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="w-full border border-slate-400 border-solid "
            onClick={back}
            variant="outline">
            {t(DEFAULT_EXPIRED_ALERT_PROPS.goback)}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { ExpiredDialog };
