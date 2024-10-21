"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import { SortingIcons, SortingIconsProps } from "./SortingIcons";
import { useTranslations } from "next-intl";

type HeaderSorterProps = {
  label: string;
  callback: () => void;
  variant?: ButtonProps["variant"];
  buttonProps?: ButtonProps;

  sortingProps: SortingIconsProps;
};

type HeaderSorterType = (props: HeaderSorterProps) => JSX.Element;

const HeaderSorter: HeaderSorterType = ({
  label = "add label here",
  sortingProps,
  callback,
  variant = "ghost",
  buttonProps,
}) => {
  const t = useTranslations();

  return (
    <Button variant={variant} onClick={callback} {...buttonProps} className={` text-nowrap ${buttonProps?.className}`}>
      {t(label)}
      <SortingIcons {...sortingProps} />
    </Button>
  );
};

export { HeaderSorter };
