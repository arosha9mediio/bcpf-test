import { ColumnDefTemplate, HeaderContext } from "@tanstack/react-table";

type ProcessHeaderProps<T> = {
  header: ColumnDefTemplate<HeaderContext<T, unknown>>;
  t: (prop: any) => any;
};

type ProcessHeaderType = <T>(
  props: ProcessHeaderProps<T>,
) => ColumnDefTemplate<HeaderContext<T, unknown>>;

const processHeader: ProcessHeaderType = ({ header, t }) => {
  if (typeof header === "string") {
    return t(header);
  }

  return header;
};

export { processHeader };
