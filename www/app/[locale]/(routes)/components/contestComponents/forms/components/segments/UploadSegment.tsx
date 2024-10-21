"use client";
import { Form } from "@/components/ui/form";
import { CommonSchema } from "../../../schema/common-schema";

import { useTranslations } from "next-intl";
import { SegmentUploadField } from "../fields/SegmentUploadField";
import { FormSegmentType } from "./common";

type UploadSegmentProps = {} & FormSegmentType<CommonSchema>;

type UploadSegmentType = (props: UploadSegmentProps) => JSX.Element;

const UploadSegment: UploadSegmentType = ({ form, fields, readOnly }) => {
  const t = useTranslations();
  return (
    <Form {...form}>
      <form

      //onSubmit={form.handleSubmit(callback)}
      >
        <div className="flex flex-col space-y-[16px] w-full">
          <h3 className="pt-6 font-bold text-xl">
            {t("forms_lb_upload_title")}
          </h3>
          <div className="w-full pt-2 sm:pt-0">
            <div className="w-full">
              <SegmentUploadField
                form={form}
                name={"file"}
                className=""
                readOnly={readOnly}
              />
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export { UploadSegment };
