import { format as fmt, format, parse, parseISO } from "date-fns";

export function convertUTCToLocal(utcDateString: string): Date {
  try {
    if (utcDateString) {
      const utcDate = parseISO(utcDateString);
      const localDate = new Date(
        utcDate.getTime() - utcDate.getTimezoneOffset() * 60000,
      );
      return localDate;
    }
    return undefined;
  } catch (error) {
    return undefined;
  }
}

export const convertToISO = (dateString?: string) =>
  dateString ? new Date(dateString).toISOString() : undefined;

export const convertLocalToUtc = (date: string, formatter?: string) => {
  try {
    // console.error("selectedDate", date, parseISO(date));
    const dateParsed = parseISO(date);
    const utc = new Date(
      dateParsed.getTime() + dateParsed.getTimezoneOffset() * 60000,
    );

    // return utc;
    return format(utc, "yyyy-MM-dd HH:mm:ss");
  } catch (error) {
    return null;
  }
};
