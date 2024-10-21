import { Form } from "@/components/ui/form";
import { useTranslations } from "next-intl";
import { CommonSchema } from "../../../schema/common-schema";
import { SegmentDateField } from "../fields/SegmentDateField";

import { SegmentInputField } from "../fields/SegmentInputField";
import { FormSegmentType } from "./common";
import { SegmentInputAreaField } from "../fields/SegmentInputAreaField";

type SchoolSegmentProps = {} & FormSegmentType<CommonSchema>;

type SchoolSegmentType = (props: SchoolSegmentProps) => JSX.Element;

const SchoolSegment: SchoolSegmentType = ({ form, fields, readOnly }) => {
  const t = useTranslations();
  return (
    <Form {...form}>
      <form
        // onSubmit={form.handleSubmit(a => handleSubmt(a))}
        className="space-y-3 sm:space-y-4">
        <h3 className="mt-8 sm:mt-12 sm:pb-3 font-bold text-xl">
          {t("forms_lb_applicant")}
        </h3>

        <div className="w-full md:flex md:space-x-6 space-y-3 sm:space-y-0">
          <SegmentInputField
            form={form}
            name="applier1Name"
            inputProps={{ placeholder: t("forms_ph_applier1Name") }}
            className="w-full mt-1"
            readOnly={readOnly}
          />

          <div className="w-full">
            <SegmentInputField
              form={form}
              name="applier1Company"
              inputProps={{ placeholder: t("forms_ph_applier1Company") }}
              className="w-full mt-1"
              readOnly={readOnly}
            />
          </div>
        </div>

        <div className="w-full md:flex md:space-x-6 space-y-3 sm:space-y-0">
          <div className="w-full">
            <SegmentInputField
              form={form}
              name="applier1Mobile"
              inputProps={{ placeholder: t("forms_ph_mobile") }}
              readOnly={readOnly}
            />
          </div>

          <SegmentInputField
            form={form}
            name="applier1Email"
            className="w-full mt-1"
            inputProps={{
              type: "email",
              placeholder: t("forms_ph_applier1Email"),
              borderBottom: true,
            }}
            readOnly={readOnly}
          />
        </div>

        <div className="w-full md:flex md:space-x-6 space-y-3 sm:space-y-0">
          <div className="w-full">
            <SegmentDateField
              form={form}
              name="applier1Birth"
              readOnly={readOnly}
            />
          </div>
          <div className="w-full"></div>
        </div>

        <div className="w-full md:flex md:space-x-6 space-y-3 sm:space-y-0">
          <div className="w-full">
            <SegmentInputField
              form={form}
              name="companyName"
              inputProps={{ placeholder: t("forms_ph_companyName") }}
              readOnly={readOnly}
            />
          </div>

          <SegmentInputField
            form={form}
            name="companyAddress"
            inputProps={{ placeholder: t("forms_ph_companyAddress") }}
            readOnly={readOnly}
          />
        </div>

        <div className="w-full md:flex md:space-x-6 space-y-3 sm:space-y-0">
          <div className="w-full">
            <SegmentInputAreaField
              form={form}
              name="companyIntroduce"
              inputProps={{ placeholder: t("forms_ph_companyIntroduce") }}
              readOnly={readOnly}
            />
          </div>
        </div>

        <div className="w-full md:flex md:space-x-6 space-y-3 sm:space-y-0">
          <div className="w-full">
            <SegmentInputField
              form={form}
              name="companyParticipants"
              inputProps={{ placeholder: t("forms_ph_companyParticipants") }}
              readOnly={readOnly}
            />
          </div>
        </div>

        <div className="w-full md:flex md:space-x-6 space-y-3 sm:space-y-3">
          <div className="w-full">
            <SegmentInputField
              form={form}
              name="companyParticipantsAge"
              inputProps={{ placeholder: t("forms_ph_companyParticipantsAge") }}
              readOnly={readOnly}
            />
          </div>

          <div className="w-full">
            <SegmentDateField
              form={form}
              name="companyAttDate"
              readOnly={readOnly}
              placeHolder="forms_ph_start_date"
            />
          </div>
        </div>

        <div className="w-full md:flex md:space-x-6 space-y-3 sm:space-y-0">
          <div className="w-full">
            <SegmentInputAreaField
              form={form}
              name="companyAttWhy"
              inputProps={{ placeholder: t("forms_ph_companyAttWhy") }}
              readOnly={readOnly}
            />
          </div>
        </div>

        <div className="w-full md:flex md:space-x-6 space-y-3 sm:space-y-0">
          <div className="w-full">
            <SegmentInputAreaField
              form={form}
              name="companyAsk"
              inputProps={{ placeholder: t("forms_ph_companyAsk") }}
              readOnly={readOnly}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};

export { SchoolSegment };
