"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputProps } from "@/components/ui/input";
import { Segment } from "../common";

type SegmentInputFieldProps<T> = {
  inputProps?: Partial<InputProps>;
  className?: string;
} & Segment<T>;

const SegmentInputField = <T,>({
  name,
  form,
  inputProps,
  className = "w-full",
  readOnly = false,
}: SegmentInputFieldProps<T>): JSX.Element => {
  const mergedInputProps = Object.assign({}, inputProps, {
    className: "p-0 placeholder:text-black dark:placeholder:text-white",
  });

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormControl>
            <Input
              readOnly={readOnly}
              placeholder="이름"
              {...field}
              borderBottom={true}
              {...mergedInputProps}
              value={field.value as string | number | readonly string[]}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { SegmentInputField };
