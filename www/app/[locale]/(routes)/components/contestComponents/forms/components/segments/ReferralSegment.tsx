import { Form } from "@/components/ui/form";
import { useTranslations } from "next-intl";
import { FOUND_BY } from "../../../common";
import { CommonSchema } from "../../../schema/common-schema";

import { SegmentRadio } from "../fields/SegmentRadio";
import { FormSegmentType } from "./common";

type ReferralSegmentProps = {} & FormSegmentType<CommonSchema>;

type ReferralSegmentType = (props: ReferralSegmentProps) => JSX.Element;

const ReferralSegment: ReferralSegmentType = ({ form, callback, readOnly }) => {
  const t = useTranslations();

  return (
    <Form {...form}>
      <form

      // onSubmit={form.handleSubmit(callback)}
      >
        <div className="flex flex-col space-y-[16px] w-full">
          <h3 className="pt-6 font-bold text-xl">{t("forms_lb_ref_title")}</h3>
          <div>
            <div className="w-full">
              {/* <SegmentSelection
                form={form}
                name="howToCome"
                options={FOUND_BY}
                readOnly={readOnly}
              /> */}

              <SegmentRadio
                form={form}
                name="howToCome"
                items={FOUND_BY}
                readOnly={readOnly}
              />
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export { ReferralSegment };
