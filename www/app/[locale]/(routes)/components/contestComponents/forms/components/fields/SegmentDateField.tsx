"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ThemeProvider, createTheme } from "@mui/material";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useMemo } from "react";
import { Segment } from "../common";

type SegmentDateFieldProps<T> = {
  className?: string;
  pickerProps?: DatePickerProps<Date>;
  placeHolder?: string;
} & Segment<T>;

const SegmentDateField = <T,>({
  form,
  name,
  className = "flex-1",
  readOnly = false,
  placeHolder = "forms_placeholders_dob",
  pickerProps,
}: SegmentDateFieldProps<T>) => {
  const t = useTranslations();
  const { resolvedTheme } = useTheme();

  const darkTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: resolvedTheme as any,
        },
      }),
    [resolvedTheme],
  );

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormControl>
            {/* why material :/ */}
            <ThemeProvider theme={darkTheme}>
              <DatePicker
                sx={{
                  "& .MuiInputBase-input": {
                    paddingLeft: 0,
                    paddingBottom: 0,
                    "&::placeholder": {
                      opacity: 1,
                    },
                  },
                }}
                readOnly={readOnly}
                {...field}
                format="yyyy-MM-dd"
                defaultValue={null}
                value={field.value ? new Date(field.value as string) : null}
                onChange={d => {
                  const date = format(d, "yyyy-MM-dd");
                  field.onChange(date);
                  return date;
                }}
                slotProps={{
                  textField: {
                    variant: "standard",
                    // need to hook focus..
                    placeholder: t(placeHolder),
                    className: "",
                    style: {
                      width: "100%",
                    },
                  },
                }}
                {...pickerProps}
              />
            </ThemeProvider>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { SegmentDateField };
