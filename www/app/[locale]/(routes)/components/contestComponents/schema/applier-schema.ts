import { z } from "zod";
import { ContestType } from "../forms/components/segments/common";
import { commonSchema } from "./common-schema";

const applier1Schema = (t: (arg: string) => string, type?: ContestType) => {
  const baseSchema = commonSchema(t);

  switch (type) {
    case "firstButton":
      return baseSchema.pick({
        applier1Name: true,
        applier1Mobile: true,
        applier1Email: true,
        applier1Birth: true,
        applier1Gender: true,
        applier1Company: true,
        hasTeammate: true,
      });

    case "mcn":
      return baseSchema.pick({
        applier1Name: true,
        applier1Mobile: true,
        applier1Email: true,
        applier1Birth: true,
        applier1Gender: true,
        applier1Company: true,
        applier1Address: true,
      });
    case "drama":
      return baseSchema.pick({
        applier1Name: true,
        applier1Etc: true,
        applier1Mobile: true,
        applier1Email: true,
        applier1Birth: true,
        applier1Gender: true,
        hasTeammate: true,
      });
    case "pbcs2":
      return baseSchema.pick({
        applier1Name: true,
        applier1Mobile: true,
        applier1Email: true,
        applier1Birth: true,
        applier1Gender: true,
      });
    case "school":
      return null;

    case "bcpf":
    case "safe":
      return baseSchema.pick({
        applier1Name: true,
        applier1Mobile: true,
        applier1Email: true,
        applier1Birth: true,
        // applier1Company: true,
        applier1Gender: true,
        // applier1Address: true,
      });
    default:
      return baseSchema.pick({
        hasTeammate: true,
      });
  }
};

const applier2Schema = (t: (arg: string) => string, type?: ContestType) => {
  const baseSchema = commonSchema(t);

  switch (type) {
    case "firstButton":
      return baseSchema.pick({
        applier2Name: true,
        applier2Mobile: true,
        applier2Email: true,
        applier2Birth: true,
        applier2Gender: true,
        applier2Company: true,
      });

    case "mcn":
    case "drama":
      return baseSchema.pick({
        applier2Name: true,
        applier2Mobile: true,
        applier2Email: true,
        applier2Birth: true,
        applier2Gender: true,
      });
    case "pbcs2":
    case "school":
    case "bcpf":
    case "safe":
      return null;
  }
};

export { applier1Schema, applier2Schema };
