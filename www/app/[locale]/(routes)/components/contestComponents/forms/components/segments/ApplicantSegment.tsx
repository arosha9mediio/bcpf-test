"use client";

import { Form } from "@/components/ui/form";
import { useTranslations } from "next-intl";
import { APPLIER1_GENDER, HAS_TEAMMATE } from "../../../common";
import { CommonSchema } from "../../../schema/common-schema";
import { SegmentDateField } from "../fields/SegmentDateField";
import { SegmentInputField } from "../fields/SegmentInputField";

import { SegmentRadio } from "../fields/SegmentRadio";
import { FormSegmentType } from "./common";

// COMPONENT
type ApplicantSegmentProps = {
  teamCallback: (state: boolean) => void;
} & FormSegmentType<CommonSchema>; // unable to scope loosing conditonal types ; ex : Applier1Schema

type ApplicantSegmentType = <T>(props: ApplicantSegmentProps) => JSX.Element;

const ApplicantSegment: ApplicantSegmentType = ({
  teamCallback,

  form,
  type,
  fields,
  callback,
  readOnly,
}) => {
  const t = useTranslations();

  return (
    <Form {...form}>
      <form
        // onSubmit={form.handleSubmit(a => handleSubmt(a))}
        className="space-y-[16px]">
        <h3 className="mt-8 sm:mt-12 text-xl font-bold">
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
            {/* <FormLabel>date</FormLabel> */}

            <SegmentInputField
              form={form}
              name="applier1Mobile"
              inputProps={{ placeholder: t("forms_ph_applier1Mobile") }}
              className="w-full mt-1"
              readOnly={readOnly}
            />
          </div>
        </div>
        <div className="w-full md:flex md:space-x-6 md:space-y-3 sm:space-y-0 space-y-3">
          <SegmentInputField
            form={form}
            name="applier1Email"
            inputProps={{
              type: "email",
              placeholder: t("forms_ph_applier1Email"),
              borderBottom: true,
            }}
            readOnly={readOnly}
          />

          <div className="w-full">
            <SegmentDateField
              form={form}
              name="applier1Birth"
              readOnly={readOnly}
            />
          </div>
        </div>

        {fields.has("applier1Etc") && (
          <div className="w-full">
            <SegmentInputField
              form={form}
              name={"applier1Etc"}
              inputProps={{
                placeholder: t("forms_ph_etc"),
                borderBottom: true,
              }}
              readOnly={readOnly}
            />
          </div>
        )}
        {fields.has("applier1Company") && (
          <SegmentInputField
            form={form}
            name={"applier1Company"}
            inputProps={{
              placeholder: t("forms_ph_applier1Company"),
              borderBottom: true,
            }}
            readOnly={readOnly}
          />
        )}

        <div className="flex flex-col gap-[16px]">
          <p className="text-black dark:text-white">{t("forms_lb_gender")}</p>
          <div className="sm:pt-0">
            <div className="w-full">
              <SegmentRadio
                form={form}
                name="applier1Gender"
                items={APPLIER1_GENDER}
                readOnly={readOnly}
              />
            </div>
          </div>
        </div>

        {fields?.has("applier1Address") && (
          <SegmentInputField
            form={form}
            name={"applier1Address"}
            inputProps={{
              placeholder: t("forms_ph_applier1Addresss"),
              borderBottom: true,
            }}
            readOnly={readOnly}
          />
        )}
        {fields.has("hasTeammate") && (
          <div className="flex flex-col gap-[16px] pt-8">
            <p className="text-black dark:text-white">
              {type === "firstButton"
                ? t("forms_lb_hasTeamMate_title")
                : t("forms_lb_hasTeamMate_title-2")}
            </p>
            <div className="w-full sm:pt-0">
              <SegmentRadio
                form={form}
                name="hasTeammate"
                items={HAS_TEAMMATE}
                readOnly={readOnly}
              />

              {/* <SelectButton
                isBorder={true}
                value="no"
                fields={HAS_TEAMMATE}
                readOnly={readOnly}
                onChange={a => {
                  if (String(a) === "yes") {
                    teamCallback(true);
                    return;
                  }

                  teamCallback(false);
                }}
              /> */}
            </div>
          </div>
        )}
      </form>
    </Form>
  );
};

export { ApplicantSegment };
