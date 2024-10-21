"use client";

import { useEffect } from "react";
import { useWatch } from "react-hook-form";
import { DatePicker } from "./DatePicker";
import { DatePickerWithRange } from "./DatePickerWithRange";

type Types =
  | "DATE-RANGE"
  | "DATE-TIME-RANGE"
  | "DATE"
  | "DATE-TIME"

type DateTimeRangePickerProps = {
  type?: Types[];
  form:any;
  label?:string;
};

type DateTimeRangePickerType = (props: DateTimeRangePickerProps) => JSX.Element;


const DateTimeRangePicker: DateTimeRangePickerType = ({
  type = [],
  form,
  label
}) => {

  const watchedData = useWatch({
    control: form.control,
  });


  useEffect(() => {
  }, [watchedData]);
  

  return (
    
        <div className="flex space-x-2 sm:space-x-4 pb-4 sm:pb-8 w-full">
          {type.map((item, index) => {
            switch (item) {
              case "DATE":
                return (
                  <DatePicker key={index} form={form} mode="DATE" label={label}/>
                );

              case "DATE-TIME":
                return (
                  <DatePicker key={index} form={form} mode="DATETIME" label={label}/>
                );

              case "DATE-RANGE":
                return (
                  <DatePickerWithRange key={index} form={form} mode="DATE" label={label}/>
                );

              case "DATE-TIME-RANGE":
                return (
                  <DatePickerWithRange
                    key={index}
                    form={form}
                    mode="DATETIME"
                    label={label}
                  />
                );

              default:
                return null;
            }
          })}
        </div>
  );
};

export { DateTimeRangePicker };

