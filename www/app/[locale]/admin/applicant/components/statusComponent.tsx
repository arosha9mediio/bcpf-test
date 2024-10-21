import { Badge } from "@/components/ui/badge";
import { useAlertModal } from "@/hooks/use-alert-modal";
import StatusModal from "./status-modal";

interface StatusModalProps {
  status?: any;
  id?: any;
}

export const StatusComponent = ({
  status,
  id
}: StatusModalProps) => {
  const { isOpen, onClose, onOpen } = useAlertModal();

  const onClickStatus = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    onOpen();
  };

  return (
    <div>
      <button onClick={onClickStatus}>
        <Badge variant="secondary">
          {status}
        </Badge>
      </button>
      <StatusModal isOpen={isOpen} onClose={onClose} status={status} id={id} />
    </div>
  );
};
