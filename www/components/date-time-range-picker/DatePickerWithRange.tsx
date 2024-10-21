"use client";

import { format, parseISO, set } from "date-fns";
import { useEffect, useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { TimePickerDemo } from "@/components/time-picker/TimePicker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { UseFormReturn } from "react-hook-form";
import { convertLocalToUtc, convertUTCToLocal } from "@/utils/date";

type DatePickerWithRangeProps = {
  form: UseFormReturn<{
    date: {
      from: string | null;
      to: string | null;
    };
  }>;
  className?: string;
  mode?: "DATE" | "DATETIME";
  label?: string;
};

const formatIncomingDate = ({
  date,
  prev,
  type,
  mode,
}: {
  date: Date;
  prev?: Date;
  type: "CALENDAR" | "TIME";
  mode?: "DATE" | "DATETIME";
}) => {
  try {
    if (mode === "DATETIME") {
      if (type === "CALENDAR") {
        const output = set(date, {
          hours: prev?.getHours() || 0,
          minutes: prev?.getMinutes() || 0,
          seconds: prev?.getSeconds() || 0,
        });
        return format(output, "yyyy-MM-dd HH:mm:ss");
      } else if (type === "TIME") {
        return format(date, "yyyy-MM-dd HH:mm:ss");
      }
    } else {
      return format(date, "yyyy-MM-dd");
    }
  } catch (error) {
    return undefined;
  }
};

const DatePickerWithRange: React.FC<DatePickerWithRangeProps> = ({
  form,
  className,
  label,
  mode = "DATE",
}) => {
  const { control, getValues, setValue } = form;

  const [convertedFrom, setConvertedFrom] = useState<Date | undefined>(
    undefined,
  );
  const [convertedTo, setConvertedTo] = useState<Date | undefined>(undefined);

  const date = getValues("date");
  const fromRaw = date?.from || null;
  const toRaw = date?.to || null;

  useEffect(() => {
    if (fromRaw && !convertedFrom) {
      setConvertedFrom(convertUTCToLocal(fromRaw));
    }
    if (toRaw && !convertedTo) {
      setConvertedTo(convertUTCToLocal(toRaw));
    }
  }, [fromRaw, toRaw, convertedFrom, convertedTo]);

  const t = useTranslations();

  return (
    <div className={cn("grid gap-2 w-full", className)}>
      <FormField
        control={control}
        name="date"
        render={() => (
          <FormItem className="w-full">
            <FormLabel>{label && label}</FormLabel>
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !convertedFrom && !convertedTo && "text-muted-foreground",
                    )}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {convertedFrom ? (
                      convertedTo ? (
                        mode === "DATETIME" ? (
                          <>
                            {format(convertedFrom, "yyyy-MM-dd HH:mm")} ~{" "}
                            {format(convertedTo, "yyyy-MM-dd HH:mm")}
                          </>
                        ) : (
                          <>
                            {format(convertedFrom, "yyyy-MM-dd")} ~{" "}
                            {format(convertedTo, "yyyy-MM-dd")}
                          </>
                        )
                      ) : (
                        format(convertedFrom, "yyyy-MM-dd HH:mm")
                      )
                    ) : (
                      <span>{t(label && label)}</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  {mode === "DATETIME" && (
                    <div className="px-3 pt-3 flex flex-row items-center gap-1 justify-between">
                      <div className="flex flex-row w-full">
                        <TimePickerDemo
                          date={convertedFrom}
                          setDate={d => {
                            const formattedDate = formatIncomingDate({
                              date: d,
                              type: "TIME",
                              mode,
                            });
                            setConvertedFrom(d);
                            setValue(
                              "date.from",
                              convertLocalToUtc(formattedDate),
                            );
                          }}
                        />
                      </div>
                      <div className="flex flex-row w-full">
                        <TimePickerDemo
                          date={convertedTo}
                          setDate={d => {
                            const formattedDate = formatIncomingDate({
                              date: d,
                              type: "TIME",
                              mode,
                            });
                            setConvertedTo(d);
                            setValue(
                              "date.to",
                              convertLocalToUtc(formattedDate),
                            );
                          }}
                        />
                      </div>
                    </div>
                  )}
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={convertedFrom}
                    selected={{ from: convertedFrom, to: convertedTo }}
                    onSelect={d => {
                      setConvertedFrom(d?.from || undefined);
                      setConvertedTo(d?.to || undefined);
                      setValue(
                        "date.from",
                        convertLocalToUtc(
                          formatIncomingDate({
                            date: d?.from!,
                            prev: convertedFrom,
                            type: "CALENDAR",
                            mode,
                          }),
                        ),
                      );
                      setValue(
                        "date.to",
                        convertLocalToUtc(
                          formatIncomingDate({
                            date: d?.to!,
                            prev: convertedTo,
                            type: "CALENDAR",
                            mode,
                          }),
                        ),
                      );
                    }}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export { DatePickerWithRange };
