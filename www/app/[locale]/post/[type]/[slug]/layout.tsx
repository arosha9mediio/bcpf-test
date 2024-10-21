import { ReactNode } from "react";
import { CategoryTypes } from "../constants";
import { getDictionary } from "@/dictionaries";
import BottomDynamicTable from "./components/BottomDynamicTable";
import { PaginatedRequest } from "@/lib/__generated/sdk";

type DynamicViewPageLayoutProps = {
  children: ReactNode;
  params: { type: CategoryTypes; locale: "en" | "ko"; slug?: string };
};

type DynamicViewPageLayoutType = (
  props: DynamicViewPageLayoutProps,
) => Promise<JSX.Element>;

const DynamicViewPageLayout: DynamicViewPageLayoutType = async ({
  children,
}) => {
  return <>{children}</>;
};

export default DynamicViewPageLayout;
