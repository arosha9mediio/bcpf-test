import clsx from "clsx";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";

type SortingIconsProps = {
  desc: boolean;
  state: boolean;
};

type SortingIconsType = (props: SortingIconsProps) => JSX.Element;

const SortingIcons: SortingIconsType = ({ desc, state }) => {
  if (!state) {
    return (
      <ChevronsUpDown
        className={clsx("ml-2 h-4 w-4", {
          "text-slate-700": state,
          "": !state,
        })}
      />
    );
  }

  if (!desc) {
    return (
      <ArrowUp
        className={clsx("ml-2 h-4 w-4", {
          "text-slate-700": state,
          "": !state,
        })}
      />
    );
  }

  return <ArrowDown className="ml-2 h-4 w-4" />;
};

export { SortingIcons };
export type { SortingIconsProps };
