import { ZodSchema, z } from "zod";
import { ContestType } from "../forms/components/segments/common";
import { commonSchema } from "./common-schema";

const programSchema = (t: (arg: string) => string, type?: ContestType) => {
  const baseSchema = commonSchema(t, type);

  switch (type) {
    case "firstButton":
      return baseSchema.pick({
        programTitle: true,
        programGenre: true,
        applyOtherOrgYn: true,
        applier1Carrier: true,
      });

    case "mcn":
      return baseSchema.pick({
        programTitle: true,
        programGenre: true,
        channelLink: true,
        experienceMediaEduYn: true,
      });

    case "drama":
      return baseSchema.pick({
        programTitle: true,
        programGenre: true,
        programCount: true,
        programHasContractWithCompany: true,
        applier1Carrier: true,
        isSensitive: true,
      });
    case "pbcs2":
      return baseSchema.pick({
        programChannel: true,
        programRegion: true,
        programTitle: true,
        programGenre: true,
        trailerUrl: true,
        applier1Carrier: true,
      });
    case "school":
      return null;
    case "bcpf":
    case "safe":
      return baseSchema.pick({
        programChannel: true,
        programTitle: true,
        programGenre: true,
        trailerUrl: true,
        applier1Carrier: true,
      });

    default:
      return baseSchema;
  }

  return baseSchema;
};

type ProgramSchema = z.infer<ReturnType<typeof programSchema>>;

export { programSchema };
export type { ProgramSchema };
