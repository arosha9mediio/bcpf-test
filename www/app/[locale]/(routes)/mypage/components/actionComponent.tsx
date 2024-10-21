import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAlertModal } from "@/hooks/use-alert-modal";
// import StatusModal from "./status-modal";
import { MouseEvent, useState } from "react";
import { handleRowClick } from "../utils/navigator";
import { useRouter } from "next/navigation";
import { RoutePaths } from "@/constants/route";
import { ActionAlert } from "@/components/table/components/DeleteAlert";
import { client } from "@/lib/client";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface StatusModalProps {
  applicationId?: string;
  contestId?: any;
  isEditable?: boolean;
}
type ClickEvent = MouseEvent<HTMLDivElement, globalThis.MouseEvent>;

export const ActionComponent = ({
  contestId,
  applicationId,
  isEditable = true,
}: StatusModalProps) => {
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useAlertModal();
  const onClickStatus = () => {
    onOpen();
  };
  const [open, setOpen] = useState<boolean>();
  const path = "contest";

  const handleOnEdit = () => {
    router.push(`${path}/${contestId}/${applicationId}`);
  };
  const handleOnOpenChange = () => {
    // e?.stopPropagation();
    setOpen(!open);
  };

  const handleOnContinue = async () => {
    // setIsLoading(true);
    try {
      await client.deleteApplication({ id: applicationId });
      router.refresh();
      // await fakeTimeout(2000);
      toast({
        description: "삭제되었습니다.",
        variant: "default",
        duration: 1500,
        // ...successToast,
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
        // ...failureToast,
      });
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-end gap-2">
        <Button disabled={!isEditable} onClick={handleOnEdit}>수정</Button>
        <Button onClick={handleOnOpenChange}>삭제</Button>
      </div>
      <ActionAlert
        open={open}
        onContinue={handleOnContinue}
        onOpenChange={() => {
          handleOnOpenChange();
        }}
        // alertProps={deleteAlertProps}
      />
    </div>
  );
};
