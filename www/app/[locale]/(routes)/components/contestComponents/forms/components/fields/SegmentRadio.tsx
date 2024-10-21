"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputProps } from "@/components/ui/input";
import { Segment } from "../common";

import { FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTranslations } from "next-intl";
import { ControllerRenderProps, Path } from "react-hook-form/dist/types";
import { getAlwaysLeftSide, splitByDoubleColon } from "../tools/utils";

type SegmentRadioItemType = "default" | "input";

type SegmentRadioItemDataType = "string" | "number";

type SegmentRadioItem = {
  label: string;
  value: string | number;
  type?: SegmentRadioItemType;
};

type SegmentRadioProps<T> = {
  inputProps?: Partial<InputProps>;
  className?: string;

  items: SegmentRadioItem[];
  type?: SegmentRadioItemDataType;
} & Segment<T>;

type SegmentRadioType = <T>(props: SegmentRadioProps<T>) => JSX.Element;

const SegmentRadio: SegmentRadioType = ({
  name,
  form,
  readOnly,
  className,
  inputProps,

  items,
  type,
}) => {
  const mergedInputProps = Object.assign({}, inputProps, {
    className: "p-0 placeholder:text-black dark:placeholder:text-white",
  });

  const t = useTranslations();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const defaultValue = getAlwaysLeftSide(String(field.value));

        return (
          <FormItem className={className}>
            <FormControl>
              {/* RADIO */}

              <RadioGroup
                disabled={readOnly}
                ref={field.ref}
                onValueChange={v => {
                  if (type === "number") {
                    const fValue = Number(v);
                    field.onChange(fValue);
                    return;
                  }
                  field.onChange(v);
                }}
                defaultValue={defaultValue}
                value={defaultValue}
                onBlur={field.onBlur}
                className="flex flex-wrap">
                {items.map((item, key) => {
                  // INPUT
                  if (item?.type === "input") {
                    return (
                      <RadioItemWithInput
                        field={field}
                        label={t(item.label)}
                        value={String(item.value)}
                        key={key}
                        checked={String(item.value) === defaultValue}
                      />
                    );
                  }

                  // DEFAULT
                  return (
                    <RadioItem
                      key={key}
                      label={t(item.label)}
                      value={String(item.value)}
                      defaultValue={defaultValue}
                      checked={String(item.value) === defaultValue}
                    />
                  );
                })}
              </RadioGroup>
              {/* RADIO-ENDS */}
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

type RadioItemProps = {
  defaultValue: string; // shadcn BUG; honors checked
  label: string;
  value: string;
  checked: boolean;
};

type RadioItemType = (props: RadioItemProps) => JSX.Element;

const RadioItem: RadioItemType = ({ label, value, defaultValue, checked }) => {
  return (
    <FormItem>
      <FormControl>
        <RadioGroupItem value={value} label={label} checked={checked} />
      </FormControl>
    </FormItem>
  );
};

// EXTENSION

type RadioItemWithInputProps<T> = {
  field: ControllerRenderProps<T, Path<T>>;
  label: string;
  value: string;
  checked: boolean;
};

type RadioItemWithInputType = <T>(
  props: RadioItemWithInputProps<T>,
) => JSX.Element;

const RadioItemWithInput: RadioItemWithInputType = ({
  label,
  value,
  checked,

  field,
}) => {
  return (
    <FormItem>
      <FormControl>
        <RadioGroupItem value={value} label={label} checked={checked}>
          <RadioInputExtension
            field={value}
            onChange={field.onChange}
            originalValue={field?.value as string}
          />
        </RadioGroupItem>
      </FormControl>
    </FormItem>
  );
};

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
      className="border-dotted	p-0 h-5 dark:text-white"
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

export { RadioItem, RadioItemWithInput, SegmentRadio, RadioInputExtension };
export type { SegmentRadioItem };
