import { Form } from "@/components/ui/form";
import { useTranslations } from "next-intl";
import { AGGREE_TO_TC, CONTACT_WITH_COMPANY, MEDIA_EDU } from "../../../common";
import { CommonSchema } from "../../../schema/common-schema";
import { SegmentInputAreaField } from "../fields/SegmentInputAreaField";
import { SegmentInputField } from "../fields/SegmentInputField";
import { SegmentRadio } from "../fields/SegmentRadio";
import { FormSegmentType } from "./common";

type ProgramSegmentProps = {
  topic?: string;
} & FormSegmentType<CommonSchema>;

type ProgramSegmentType = (props: ProgramSegmentProps) => JSX.Element;

const ProgramSegment: ProgramSegmentType = ({
  form,
  callback,
  type,
  fields,
  readOnly,
  topic,
}) => {
  const t = useTranslations();

  return (
    <Form {...form}>
      <form

      // onSubmit={form.handleSubmit(callback)}
      >
        <div className="space-y-[16px]">
          <h3 className="mt-8 sm:mt-12 font-bold text-xl">
            {topic} {t("forms_lb_program_title")}
          </h3>

          {fields.has("programChannel") && (
            <SegmentInputField
              form={form}
              name="programChannel"
              inputProps={{
                placeholder:
                  type === "bcpf" || "safe"
                    ? t("forms_ph_channelName")
                    : t("forms_ph_programChannel"),
                borderBottom: true,
              }}
              readOnly={readOnly}
            />
          )}

          {fields.has("programRegion") && (
            <SegmentInputField
              form={form}
              name="programRegion"
              inputProps={{
                placeholder: t("forms_ph_programRegion"),
                borderBottom: true,
              }}
              readOnly={readOnly}
            />
          )}

          <div className="w-full md:flex md:space-x-6 space-y-3 sm:space-y-0">
            <SegmentInputField
              form={form}
              name={"programTitle"}
              inputProps={{
                placeholder:
                  type === "mcn"
                    ? t("forms_ph_programTitle-mcn")
                    : type === "bcpf" || type === "safe" || type === "pbcs2"
                      ? t("forms_ph_contentTitle")
                      : t("forms_ph_programTitle"),
                borderBottom: true,
              }}
              readOnly={readOnly}
            />
          </div>

          <div className="w-full md:flex md:space-x-6 space-y-3 sm:space-y-0">
            <div className="w-full">
              <SegmentInputField
                form={form}
                name="programGenre"
                inputProps={{
                  placeholder:
                    type === "mcn" || "bcpf" || "safe"
                      ? t("forms_ph_contentGenre")
                      : t("forms_ph_programGenre"),
                  borderBottom: true,
                }}
                readOnly={readOnly}
              />
            </div>
            {fields.has("channelLink") && (
              <div className="w-full">
                <SegmentInputField
                  form={form}
                  name="channelLink"
                  inputProps={{
                    placeholder: t("forms_ph_channelLink"),
                    borderBottom: true,
                  }}
                  readOnly={readOnly}
                />
              </div>
            )}
          </div>

          {fields.has("programCount") && (
            <div className="w-full">
              <SegmentInputField
                form={form}
                name="programCount"
                inputProps={{
                  placeholder: t("forms_ph_programCount"),
                  borderBottom: true,
                }}
                readOnly={readOnly}
              />
            </div>
          )}

          {fields?.has("experienceMediaEduYn") && (
            <div className="pt-4">
              <div>
                {t("Media training for one person from another institution")}
              </div>
              <div className="w-full pt-2">
                <SegmentRadio
                  form={form}
                  name="experienceMediaEduYn"
                  items={MEDIA_EDU}
                  type="number"
                  readOnly={readOnly}
                />
              </div>
            </div>
          )}

          {fields?.has("applyOtherOrgYn") && (
            <SegmentInputField
              form={form}
              name="applyOtherOrgYn"
              inputProps={{
                placeholder: t("forms_ph_applyOtherOrgYn"),
                borderBottom: true,
              }}
              readOnly={readOnly}
            />
          )}

          {fields.has("programHasContractWithCompany") && (
            <div className=" flex flex-col gap-[16px] w-full ">
              <p className="text-black dark:text-white">
                {t("forms_lb_contact_with_company")}
              </p>

              <SegmentRadio
                form={form}
                name="programHasContractWithCompany"
                items={CONTACT_WITH_COMPANY}
                type="number"
                readOnly={readOnly}
              />
            </div>
          )}

          {fields.has("trailerUrl") && (
            <SegmentInputField
              form={form}
              name="trailerUrl"
              inputProps={{
                placeholder: t("forms_ph_contentUrl"),
                borderBottom: true,
              }}
              readOnly={readOnly}
            />
          )}

          {fields.has("applier1Carrier") && (
            <SegmentInputAreaField
              form={form}
              name="applier1Carrier"
              inputProps={{
                placeholder:
                  type === "firstButton"
                    ? t("forms_ph_applier1Carrier-first")
                    : t("forms_ph_applier1Carrier"),
              }}
              readOnly={readOnly}
            />
          )}

          {fields.has("isSensitive") && (
            <div className="flex flex-col gap-[16px] w-full pt-8 font-medium">
              <p className="text-black dark:text-white">
                {t("forms_lb_private_info")}
              </p>
              {/* <SegmentSelection
                form={form}
                name="isSensitive"
                options={AGGREE_TO_TC}
                readOnly={readOnly}
              /> */}

              <SegmentRadio
                form={form}
                name="isSensitive"
                items={AGGREE_TO_TC}
                readOnly={readOnly}
              />
              <div>
                <p className="text-sm">
                  ❈ 극본 내 개인정보 기재 불가 (이름, 연락처, 이메일 등)
                </p>
                <p className="text-sm">
                  ❈ 극본 내 개인정보 기재 시 서류심사가 불가하다는 공지
                </p>
              </div>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
};

export { ProgramSegment };
