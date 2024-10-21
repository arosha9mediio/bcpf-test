"use client";

import { useNextTableStore } from "@/store/useNextTableStore";

type DataCountProps = {};

type DataCountType = (props: DataCountProps) => JSX.Element;

const DataCount: DataCountType = () => {
  const { count } = useNextTableStore();
  return <p>{`[ ${count} ]`}</p>;
};

export { DataCount };
