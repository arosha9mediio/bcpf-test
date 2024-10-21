"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import UploadContestFile from "../../../../upload/uploadContestFile";
import { Segment } from "../common";

type SegmentUploadFieldProps<T> = {
  className?: string;
} & Segment<T>;

type SegmentUploadFieldType = <T>(
  props: SegmentUploadFieldProps<T>,
) => JSX.Element;

const SegmentUploadField: SegmentUploadFieldType = ({
  name,
  form,
  className,
  readOnly = false,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        type Updater = (prevFiles: File[]) => any[];
        type UpdateCallback = (callback: Updater) => void;

        const updateCallback: UpdateCallback = callback => {
          if (Array.isArray(callback)) {
            field.onChange(callback);
            return;
          }

          const values = callback(field?.value as []);
          field.onChange(values);
        };

        return (
          <FormItem className={className}>
            <FormControl>
              <UploadContestFile
                value={field.value}
                onChange={updateCallback}
                sx={{ mb: 0, mt: 0 }}
                maxFiles={1}
                readOnly={readOnly}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export { SegmentUploadField };
