import { convertUTCToLocal } from "@/utils/date";
import { isWithinInterval, parseISO } from "date-fns";

const isCurrentDateWithinInterval = (start: any, end: any) => {
  const startDate = convertUTCToLocal(start);
  const endDate = convertUTCToLocal(end);
  const currentDate = new Date();

  const isIt = isWithinInterval(currentDate, {
    start: startDate,
    end: endDate,
  });

  return isIt;
};

export { isCurrentDateWithinInterval };
