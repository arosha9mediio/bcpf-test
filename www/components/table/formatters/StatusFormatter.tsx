import { Badge, BadgeProps } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type StatusFormatterProps = {
  /**
   * example
   * { 1 : {... status props} }
   */
  status: StatusType;
  value: string | number;
  onStatusChange?: (status: string) => void;
};

type Status = {
  label: string;
  color?: string;
  variant: BadgeProps["variant"];
  className?: string;
  hideInDropDown?: boolean;
};

type StatusType = Record<string | number, Status>;

type StatusFormatterType = (props: StatusFormatterProps) => JSX.Element;

const StatusFormatter: StatusFormatterType = ({
  value,
  status,
  onStatusChange,
}) => {
  const props = status?.[value];

  return (
    <Select
      value={value.toString()}
      disabled={!onStatusChange}
      onValueChange={onStatusChange}>
      <SelectTrigger
        className="p-0 border-none data-[disabled]:opacity-100 data-[disabled]:cursor-text"
        showDropDown={false}>
        <SelectValue>
          <Badge variant="outline" {...props}>
            {props?.label}
          </Badge>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {Object.keys(status).map(statusKey => {
          const props = status?.[statusKey];
          if (props.hideInDropDown) return null;
          return (
            <SelectItem key={statusKey} value={statusKey}>
              <Badge variant="outline" {...props}>
                {props?.label}
              </Badge>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export { StatusFormatter };
export type { StatusType };
