import { object, string, date } from "zod";
import { ContestType } from "../forms/components/segments/common";
import { commonSchema } from "./common-schema";

const consentSchema = (t: (arg: string) => string, type?: ContestType) => {
  const baseSchema = commonSchema(t);

  return baseSchema.pick({
    applyBCPFYn: true,
  });
};

const referralSchema = (t: (arg: string) => string, type?: ContestType) => {
  const baseSchema = commonSchema(t);

  return baseSchema.pick({
    howToCome: true,
  });
};

const teamSchema = (t: (arg: string) => string, type?: ContestType) => {
  const baseSchema = commonSchema(t);

  return baseSchema.pick({
    hasTeammate: true,
  });
};

const fileSchema = (t: (arg: string) => string, type?: ContestType) => {
  const baseSchema = commonSchema(t);

  return baseSchema.pick({
    file: true,
  });
};

type ConsentSchema = ReturnType<typeof consentSchema>;
type ReferralSchema = ReturnType<typeof referralSchema>;
type TeamSchema = ReturnType<typeof teamSchema>;

export { consentSchema, referralSchema, teamSchema, fileSchema };
export type { ConsentSchema, ReferralSchema, TeamSchema };
