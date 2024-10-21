import { Form } from "@/components/ui/form";
import { useTranslations } from "next-intl";
import { AGGREE_TO_TC } from "../../../common";

import { CommonSchema } from "../../../schema/common-schema";
import { SegmentRadio } from "../fields/SegmentRadio";
import { FormSegmentType } from "./common";

type COISegmentProps = {} & FormSegmentType<CommonSchema>;

type COISegmentType = (props: COISegmentProps) => JSX.Element;

const COISegment: COISegmentType = ({ form, callback, readOnly }) => {
  const t = useTranslations();

  return (
    <Form {...form}>
      <form

      //onSubmit={form.handleSubmit(callback)}
      >
        <div className="flex flex-col space-y-[16px] w-full">
          <h3 className="pt-6 font-bold text-xl">{t("forms_lb_coi_title")}</h3>
          <div className="w-full sm:pt-0">
            <div className="w-full">
              <SegmentRadio
                form={form}
                name="applyBCPFYn"
                items={AGGREE_TO_TC}
                readOnly={readOnly}
              />
              <p className="text-sm mt-4">❈ 개인정보 수집 및 이용 내용 설명</p>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export { COISegment };
