"use client";

import { convertUTCToLocal } from "@/utils/date";
import { format as fmt } from "date-fns";

type DateTimeFormatterProps = {
  date: string;
  format?: string;
};

type DateTimeFormatterType = (props: DateTimeFormatterProps) => JSX.Element;

const DateTimeFormatter: DateTimeFormatterType = ({
  date,
  format = "yyyy-MM-dd HH:mm",
}) => {
  if (!date) {
    return <div>{`-`}</div>;
  }

  try {
    const localDate = convertUTCToLocal(date);
    const apptDateTime = fmt(localDate, format);

    return <div className="  w-[8rem]">{`${apptDateTime}`}</div>;
  } catch (error) {
    return <div>{`-`}</div>;
  }
};

export { DateTimeFormatter };
