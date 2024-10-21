import * as RadioGroup from "@radix-ui/react-radio-group";
import React from "react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Circle } from "lucide-react";
import "./styles.css";
import { useTranslations } from "next-intl";
import { Input } from "./input";
import {
  getAlwaysLeftSide,
  splitByDoubleColon,
} from "@/app/[locale]/(routes)/components/contestComponents/forms/components/tools/utils";

interface RadioButtonProps {
  className?: string;
  fields: { id?: string; value: string; label: string; manual?: boolean }[]; // Assuming fields is a string array
  value: string;
  onChange: (checked: boolean) => void;
  isBorder?: Boolean;
  isSmall?: Boolean;
  readOnly?: boolean;
}

const SelectButton = React.forwardRef<
  React.ElementRef<typeof RadioGroup.Root>,
  RadioButtonProps
>(
  (
    {
      className,
      fields,
      value,
      isBorder,
      isSmall,
      onChange,
      readOnly = false,
      ...props
    },
    ref,
  ) => {
    const { register, setValue } = useForm();

    const t = useTranslations();

    const handleRadioChange = value => {
      onChange(value);
    };

    return (
      <div>
        {isSmall ? (
          <div className="space-y-4">
            <RadioGroup.Root
              ref={ref}
              defaultValue={value}
              aria-label="View density"
              onValueChange={handleRadioChange}>
              <div className={"flex flex-wrap gap-4"}>
                {fields?.map((field, index) => {
                  return (
                    <div
                      key={index}
                      className={`flex items-center p-3 rounded-md border-2 ${
                        value === field.id
                          ? "border-slate-600"
                          : "border-gray-400"
                      } hover:border-gray-600 cursor-pointer`}>
                      <RadioGroup.Item
                        disabled={readOnly}
                        value={field.id}
                        id={field.id}
                        className="w-6 h-6 rounded-full border-2 border-gray-400 hover:border-gray-600 focus:border-slate-600 data-[state=checked]:outline-slate-600 peer-aria-checked:outline-slate-600 peer outline outline-gray-400 outline-2 outline-offset-2"
                        {...register("radioGroupValue")}>
                        <RadioGroup.Indicator className="flex items-center justify-center">
                          <Circle className="h-2.5 w-2.5 fill-current text-current dark:text-white dark:color-white" />
                        </RadioGroup.Indicator>
                      </RadioGroup.Item>
                      <label
                        className="text-[15px] leading-none pl-[15px]"
                        htmlFor={field.id}>
                        {t(field.label)}
                      </label>
                    </div>
                  );
                })}
              </div>
            </RadioGroup.Root>
          </div>
        ) : (
          <div className="space-y-4">
            <RadioGroup.Root
              ref={ref}
              defaultValue={getAlwaysLeftSide(value)}
              aria-label="View density"
              onValueChange={handleRadioChange}
              className="flex flex-wrap gap-4">
              {fields?.map((field, index) => (
                <div
                  key={index}
                  className={`flex items-center p-3 rounded-md border-2 ${
                    getAlwaysLeftSide(value) === field.id
                      ? "border-slate-600 dark:border-white"
                      : "border-gray-400 dark:border-slate-600"
                  } hover:border-gray-600 cursor-pointer`}>
                  <RadioGroup.Item
                    value={field.id}
                    disabled={readOnly}
                    id={field.id}
                    className="
                    w-6 h-6 rounded-full border-2 border-gray-400 outline-2 outline-offset-2
                    hover:border-gray-600 focus:border-slate-600 
                    data-[state=checked]:outline-slate-600 peer-aria-checked:outline-slate-600 peer outline outline-gray-400 
                    dark:outline-slate-600 dark:data-[state=checked]:outline-white dark:peer-aria-checked:outline-white dark:data-[state=checked]:outline-white dark:focus:border-white dark:border-slate-600
                    "
                    {...register("radioGroupValue")}>
                    <RadioGroup.Indicator className="flex items-center justify-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-slate-600 dark:bg-white" />
                    </RadioGroup.Indicator>
                  </RadioGroup.Item>
                  <div className="flex flex-row items-center gap-1">
                    <label
                      className="text-[15px] leading-none pl-[15px] text-nowrap	"
                      htmlFor={field.id}>
                      {`${t(field.label)}${field?.manual ? ":" : ""}`}
                    </label>
                    {field?.manual && (
                      <RadioInputExtension
                        field={field?.value}
                        onChange={onChange}
                        originalValue={value}
                      />
                    )}
                  </div>
                </div>
              ))}
            </RadioGroup.Root>
          </div>
        )}
      </div>
    );
  },
);

SelectButton.displayName = "SelectButton";

type RadioInputExtensionProps = {
  originalValue: string;
  field: string;
  onChange: (value: string | boolean) => void;
};

type RadioInputExtensionType = (props: RadioInputExtensionProps) => JSX.Element;

const RadioInputExtension: RadioInputExtensionType = ({
  originalValue,
  field,
  onChange,
}) => {
  if (!originalValue) {
    return;
  }

  const [left = "", right = ""] = splitByDoubleColon(originalValue);

  const isOnCorrectTrack = left === field;

  return (
    <Input
      className="border-dotted	p-0"
      defaultValue={isOnCorrectTrack ? right : null}
      disabled={!isOnCorrectTrack}
      onChange={v => {
        const fValue = v.currentTarget.value;
        const invoked = left + "::" + fValue;

        if (!isOnCorrectTrack) {
          return;
        }

        onChange(invoked as any);
      }}
    />
  );
};

export { RadioInputExtension };

export { SelectButton };
