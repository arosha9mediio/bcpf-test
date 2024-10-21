import { Form } from "@/components/ui/form";
import { useTranslations } from "next-intl";
import { APPLIER2_GENDER } from "../../../common";
import { CommonSchema } from "../../../schema/common-schema";
import { SegmentDateField } from "../fields/SegmentDateField";

import { SegmentInputField } from "../fields/SegmentInputField";
import { SegmentRadio } from "../fields/SegmentRadio";
import { FormSegmentType } from "./common";

// COMPONENT
type Applicant2SegmentProps = {} & FormSegmentType<CommonSchema>;

type Applicant2SegmentType = (props: Applicant2SegmentProps) => JSX.Element;

const Applicant2Segment: Applicant2SegmentType = ({
  form,
  type,
  callback,
  readOnly,
  fields,
}) => {
  const t = useTranslations();

  return (
    <Form {...form}>
      <form
        // onSubmit={form.handleSubmit(callback)}
        className="space-y-3 sm:space-y-4">
        <div className="md:space-y-[16px] space-y-3">
          <h3 className="mt-4 pt-3 font-bold text-xl">
            {type === "firstButton"
              ? t("forms_lb_applicant-first")
              : type === "drama"
                ? t("forms_lb_applicant-drama")
                : null}
            {t("forms_lb_applicant2")}
          </h3>
          <div className="w-full md:flex md:space-x-6 space-y-3 sm:space-y-0">
            <SegmentInputField
              form={form}
              name="applier2Name"
              className="w-full mt-1"
              inputProps={{
                placeholder: t("forms_ph_applier2Name"),
                borderBottom: true,
              }}
              readOnly={readOnly}
            />

            <div className="w-full ">
              {/* <FormLabel>date</FormLabel> */}

              <SegmentInputField
                form={form}
                name="applier2Mobile"
                className="w-full mt-1"
                inputProps={{
                  placeholder: t("forms_ph_applier2Mobile"),
                  borderBottom: true,
                }}
                readOnly={readOnly}
              />
            </div>
          </div>
          <div className="w-full md:flex md:space-x-6 md:space-y-3 sm:space-y-0 space-y-3">
            <SegmentInputField
              form={form}
              name="applier2Email"
              inputProps={{
                placeholder: t("forms_ph_applier2Email"),
                borderBottom: true,
                type: "email",
              }}
              readOnly={readOnly}
            />
            <div className="w-full">
              {/* <FormLabel>date</FormLabel> */}

              <SegmentDateField
                form={form}
                name="applier2Birth"
                // pickerProps={{ label: t("forms_ph_dob") }}
                readOnly={readOnly}
              />
            </div>
          </div>

          {fields?.has("applier2Company") && (
            <SegmentInputField
              form={form}
              name="applier2Company"
              inputProps={{
                placeholder: t("forms_ph_applier2Company"),
                borderBottom: true,
              }}
              readOnly={readOnly}
            />
          )}

          <div>
            <div className="flex flex-col w-full gap-[16px]">
              <p className="text-black dark:text-white">
                {t("forms_lb_gender")}
              </p>
              <div>
                <SegmentRadio
                  form={form}
                  name="applier2Gender"
                  items={APPLIER2_GENDER}
                  readOnly={readOnly}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export { Applicant2Segment };
