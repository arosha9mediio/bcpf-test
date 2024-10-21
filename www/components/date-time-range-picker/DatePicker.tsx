"use client";

import { format, parseISO, set } from "date-fns";
import { useEffect, useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { TimePickerDemo } from "@/components/time-picker/TimePicker";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useTranslations } from "next-intl";
import {
  convertLocalToUtc,
  convertToISO,
  convertUTCToLocal,
} from "@/utils/date";

type DatePickerProps = {
  form: any;
  className?: string;
  mode?: "DATE" | "DATETIME";
  label?: string;
};

type Mode = DatePickerProps["mode"];

type IncomingType = "CALENDAR" | "TIME";

type DatePickerType = (props: DatePickerProps) => JSX.Element;

type FormatIncomingDateProps = {
  date: Date;
  type: IncomingType;
  prev?: Date;
  mode?: Mode;
};

type FormatIncomingDateType = (props: FormatIncomingDateProps) => string;

const formatIncomingDate: FormatIncomingDateType = ({
  date,
  prev,
  type,
  mode,
}) => {
  try {
    if (mode === "DATETIME") {
      switch (type) {
        case "CALENDAR":
          const outPut = set(date, {
            hours: prev?.getHours(),
            minutes: prev?.getMinutes(),
            seconds: prev?.getSeconds(),
          });
          return outPut ? format(outPut, "yyyy-MM-dd HH:mm:ss") : undefined;

        case "TIME":
          return date ? format(date, "yyyy-MM-dd HH:mm:ss") : undefined;
      }
    }

    return date ? format(date, "yyyy-MM-dd HH:mm:ss") : undefined;
  } catch (error) {
    return undefined;
  }
};

const DatePicker: DatePickerType = ({
  form,
  className,
  label,
  mode = "DATE",
}) => {
  const t = useTranslations();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const fromAsString = form.getValues("date");

  useEffect(() => {
    if (fromAsString && !selectedDate) {
      const convertedDate = convertUTCToLocal(fromAsString);
      console.error('form.getValues("date")', fromAsString, convertedDate);
      setSelectedDate(convertedDate);
    }
  }, [fromAsString, selectedDate]);

  return (
    <div className={cn("grid gap-2 w-full ", className)}>
      <FormField
        control={form.control}
        name="date"
        render={({ field }) => {
          const date = selectedDate || (fromAsString && parseISO(fromAsString));

          return (
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
                        !date && "text-muted-foreground",
                      )}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? (
                        mode === "DATETIME" ? (
                          format(date || undefined, "yyyy-MM-dd HH:mm")
                        ) : (
                          format(date || undefined, "yyyy-MM-dd")
                        )
                      ) : (
                        <span>{t(label && label)}</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    {/* TIME */}
                    {mode === "DATETIME" && (
                      <div className="px-3 pt-3 flex flex-row items-center gap-1 justify-between">
                        <div className="flex flex-row w-full">
                          <TimePickerDemo
                            date={date}
                            setDate={d => {
                              const formattedDate = formatIncomingDate({
                                date: d,
                                type: "TIME",
                                mode,
                              });
                              setSelectedDate(d);
                              field.onChange(convertLocalToUtc(formattedDate));
                            }}
                          />
                        </div>
                      </div>
                    )}
                    <Calendar
                      initialFocus
                      mode="single"
                      defaultMonth={date}
                      selected={date}
                      onSelect={d => {
                        const formattedDate = formatIncomingDate({
                          date: d,
                          prev: selectedDate,
                          type: "CALENDAR",
                          mode,
                        });
                        setSelectedDate(d);
                        field.onChange(convertLocalToUtc(formattedDate));
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
            </FormItem>
          );
        }}
      />
    </div>
  );
};

export { DatePicker };
