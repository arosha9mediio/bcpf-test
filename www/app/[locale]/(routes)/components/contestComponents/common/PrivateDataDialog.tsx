import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTranslations } from "next-intl";

type PrivateDataDialogProps = {
  open: boolean;
  defaultOpen?: boolean;

  alertProps?: DialogProps;

  onOpenChange?: (open: boolean) => void;
  onContinue?: () => void;
  onClose?: () => void;
};

type DialogProps = {
  title?: string;
  description?: string;
  cancel?: string;
  continue?: string;
};

const DEFAULT_ALERT_PROPS = {
  title: "forms_dialog_private_info_title",
  description: "forms_dialog_private_info_description",
  continue: "forms_dialog_private_info_continue",
  cancel: "forms_dialog_private_info_close",
} as const;

type PrivateDataDialogType = (props: PrivateDataDialogProps) => JSX.Element;

const PrivateDataDialog: PrivateDataDialogType = ({
  open,
  alertProps,
  defaultOpen,
  onContinue,
  onOpenChange,
  onClose,
}) => {
  const filledAlertProps = { ...DEFAULT_ALERT_PROPS, ...alertProps };
  const t = useTranslations();
  return (
    <AlertDialog
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t(filledAlertProps.title)}</AlertDialogTitle>
          <AlertDialogDescription>
            {t(filledAlertProps.description)}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {filledAlertProps.cancel && (
            <AlertDialogCancel
              className="w-full border border-slate-400 border-solid "
              onClick={onClose}
              variant="outline">
              {t(filledAlertProps.cancel)}
            </AlertDialogCancel>
          )}
          {filledAlertProps.continue && (
            <AlertDialogAction
              className="w-full"
              onClick={e => {
                e.stopPropagation();
                onContinue();
              }}>
              {t(filledAlertProps.continue)}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { PrivateDataDialog };
