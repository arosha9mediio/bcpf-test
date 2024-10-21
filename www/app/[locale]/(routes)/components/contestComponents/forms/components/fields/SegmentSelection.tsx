"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SelectButton } from "@/components/ui/selectButtons";
import { Segment } from "../common";

type SegmentSelectionProps<T> = {
  options: {
    id: string;
    value: string;
    label: string;
    manual?: boolean;
  }[];
  isNumber?: boolean;
} & Segment<T>;

const SegmentSelection = <T,>({
  form,
  name,
  options,
  readOnly = false,
  isNumber = false,
}: SegmentSelectionProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <SelectButton
              {...field}
              isBorder={true}
              fields={options}
              value={String(field.value)}
              onChange={v => {
                if (isNumber) {
                  field.onChange(Number(v));
                  return;
                }

                field.onChange(v);
              }}
              readOnly={readOnly}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { SegmentSelection };
