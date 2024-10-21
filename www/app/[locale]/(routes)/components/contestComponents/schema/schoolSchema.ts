import { ContestType } from "../forms/components/segments/common";
import { commonSchema } from "./common-schema";

const schoolSchema = (t: (arg: string) => string, type?: ContestType) => {
  const baseSchema = commonSchema(t);
  return baseSchema.pick({
    applier1Name: true,
    applier1Company: true,
    applier1Mobile: true,
    applier1Email: true,
    applier1Birth: true,
    companyName: true,
    companyAddress: true,
    companyIntroduce: true,
    companyParticipants: true,
    companyParticipantsAge: true,
    companyAttWhy: true,
    companyAttDate: true,
    companyAsk: true,
  });
};

export { schoolSchema };
