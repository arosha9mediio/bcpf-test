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

type ActionAlertProps = {
  open: boolean;
  defaultOpen?: boolean;

  alertProps?: AlertProps;

  onOpenChange?: (open: boolean) => void;
  onContinue?: () => void;
};

type AlertProps = {
  title?: string;
  description?: string;
  cancel?: string;
  continue?: string;
};

type ActionAlertType = (props: ActionAlertProps) => JSX.Element;

const DEFAULT_ALERT_PROPS = {
  title: "확인",
  description: "삭제후 다시 복구가 불가능합니다. 삭제하시겠습니까?",
  // "This action cannot be undone. This will permanently delete your data from our servers.",
  cancel: "취소",
  continue: "확인",
} as const;

const ActionAlert: ActionAlertType = ({
  open,
  onOpenChange,
  onContinue,
  defaultOpen = false,
  alertProps = DEFAULT_ALERT_PROPS,
}) => {
  const filledAlertProps = { ...DEFAULT_ALERT_PROPS, ...alertProps };

  return (
    <AlertDialog
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      open={open}>
      {/* <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger> */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{filledAlertProps.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {filledAlertProps.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={event => event.stopPropagation()}>
            {filledAlertProps.cancel}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={e => {
              e.stopPropagation();
              onContinue();
            }}>
            {filledAlertProps.continue}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { ActionAlert };
export type { ActionAlertProps };
