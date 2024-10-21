"use client";

import { format, formatISO, parseISO, set } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { useTranslations } from "next-intl";
import { TimePickerDemo } from "@/components/time-picker/TimePicker";

const VALIDATION_ERRORS = {
  TITLE: "admin_ticker_title_error",
  LINK: "admin_ticker_link_error",
  PAT: "admin_ticker_pat_error",
} as const;

const TICKER_FORM_SCHEMA = (t: (arg: string) => string) =>
  z.object({
    title: z
      .string({
        message: t(VALIDATION_ERRORS.TITLE),
      })
      .min(1, t(VALIDATION_ERRORS.TITLE)),

    body: z
      .string({ message: t(VALIDATION_ERRORS.LINK) })
      .min(1, t(VALIDATION_ERRORS.LINK)), // link

    publishedAt: z.string({ message: t(VALIDATION_ERRORS.PAT) }),
    unpublishedAt: z.string(),
  });

type TickerSchemaType = z.infer<ReturnType<typeof TICKER_FORM_SCHEMA>>;

type TickerDatePickerWithRangeProps = {
  form: UseFormReturn<TickerSchemaType>;
  className?: string;
  mode?: "DATE" | "DATETIME";
  label?: string;
};

type Mode = TickerDatePickerWithRangeProps["mode"];

type IncomingType = "CALENDAR" | "TIME";

type TickerDatePickerWithRangeType = (
  props: TickerDatePickerWithRangeProps,
) => JSX.Element;

const parseIncomingDate = (dateString: string) => {
  try {
    return dateString ? parseISO(dateString) : undefined;
  } catch (error) {
    return undefined;
  }
};

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

          return outPut ? formatISO(outPut) : undefined;

        case "TIME":
          return date ? formatISO(date) : undefined;
      }
    }

    return date ? formatISO(date) : undefined;
  } catch (error) {
    return undefined;
  }
};

const TickerDatePickerWithRange: TickerDatePickerWithRangeType = ({
  form,
  className,
  label = "search_bar_date_picker_placeholder",
  mode = "DATE",
}) => {
  const toAsString = form.getValues("unpublishedAt");
  const to = parseIncomingDate(toAsString);

  const t = useTranslations();

  const formatDate = "yyyy-MM-dd";
  const formatDateTime = "yyyy-MM-dd HH:mm";
  return (
    <div className={cn("grid gap-2", className)}>
      <FormField
        control={form.control}
        name="publishedAt"
        render={({ field }) => {
          const fromAsString = field.value;
          const from = parseIncomingDate(fromAsString);

          return (
            <FormItem className="w-full">
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "flex w-full justify-start text-left font-normal",
                        !from && !to && "text-muted-foreground",
                      )}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {from ? (
                        to ? (
                          <>
                            {format(from || undefined, formatDateTime)} -{" "}
                            {format(to || undefined, formatDateTime)}
                          </>
                        ) : (
                          format(from || undefined, formatDateTime)
                        )
                      ) : (
                        <span>{t(label)}</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    {/* TIME */}
                    {mode === "DATETIME" && (
                      <div className=" px-3 pt-3 flex flex-row items-center gap-1 justify-between ">
                        <div className="flex flex-row w-full">
                          <TimePickerDemo
                            date={from}
                            label="time_start_picker"
                            setDate={d => {
                              field.onChange(
                                formatIncomingDate({
                                  date: d,
                                  type: "TIME",
                                  mode,
                                }),
                              );
                            }}
                          />
                        </div>

                        <div className="flex flex-row w-full">
                          <TimePickerDemo
                            date={to}
                            label="time_end_picker"
                            setDate={d => {
                              form.setValue(
                                "unpublishedAt",
                                formatIncomingDate({
                                  date: d,
                                  type: "TIME",
                                  mode,
                                }),
                              );
                              form.trigger("unpublishedAt");
                            }}
                          />
                        </div>
                      </div>
                    )}
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={from}
                      selected={{ from, to }}
                      onSelect={d => {
                        field.onChange(
                          formatIncomingDate({
                            date: d.from,
                            prev: from,
                            type: "CALENDAR",
                            mode,
                          }),
                        );

                        form.setValue(
                          "unpublishedAt",
                          formatIncomingDate({
                            date: d.to,
                            prev: to,
                            type: "CALENDAR",
                            mode,
                          }),
                        );
                        form.trigger("unpublishedAt");
                      }}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
};

export { TickerDatePickerWithRange };
