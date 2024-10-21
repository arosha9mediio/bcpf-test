"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Segment } from "../common";
import { InputProps } from "@/components/ui/input";

type SegmentInputAreaFieldProps<T> = {
  inputProps?: Partial<InputProps>;
  className?: string;
} & Segment<T>;

type SegmentInputAreaFieldType = <T>(
  props: SegmentInputAreaFieldProps<T>,
) => JSX.Element;

const SegmentInputAreaField: SegmentInputAreaFieldType = ({
  name,
  form,
  className,
  inputProps,
  readOnly = false,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormControl>
            <Textarea
              variant="underline"
              readOnly={readOnly}
              {...field}
              placeholder={inputProps?.placeholder}
              className="placeholder:text-black dark:placeholder:text-white pl-0"
              value={field.value as string | number | readonly string[]}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { SegmentInputAreaField };
