import { array, z } from "zod";
import { ContestType } from "../forms/components/segments/common";
const string = z.string;
const date = z.date;
const number = z.number;
const object = z.object;

const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

const getProgramTitleError = (
  t: (arg: string) => string,
  type?: ContestType,
) => {
  switch (type) {
    case "firstButton":
    case "drama":
      return t("schema_workTitle");
    case "mcn":
      return t("schema_channelTitle");
    default:
      return t("schema_program");
  }
};

// Define the `commonSchema` function
const commonSchema = (t: (arg: string) => string, type?: ContestType) => {
  const fileSchema = z.instanceof(File);

  const base = object({
    // Applier 1 fields
    applier1Name: string({
      required_error: t("schema_name"),
    }).min(1, {
      message: t("schema_name"),
    }),
    applier1Mobile: string({
      required_error: t("schema_phoneNumber"),
    }).min(1, {
      message: t("schema_phoneNumber"),
    }),
    applier1Email: string({
      required_error: t("schema_email"),
    })
      .min(1, {
        message: t("schema_email"),
      })
      .email({ message: t("schema_invalidEmailFormat") }),

    applier1Birth: string({
      required_error: t("schema_dateSelection"),
    }).refine(isValidDate, {
      message: t("schema_dateSelection"),
    }),

    applier1Gender: string({
      required_error: t("schema_gender"),
    }).min(1, {
      message: t("schema_gender"),
    }),
    applier1Company: string({
      required_error: t("schema_company"),
    }).min(1, {
      message: t("schema_company"),
    }),
    applier1Carrier: string({
      required_error: t("schema_career"),
    }).min(1, {
      message: t("schema_career"),
    }),
    applier1Address: string({
      required_error: t("schema_address"),
    }).min(1, {
      message: t("schema_address"),
    }),
    applier1Etc: z
      .string({
        required_error: t("schema_penName"),
      })
      .min(1, {
        message: t("schema_penName"),
      }),

    // Applier 2 fields
    applier2Name: string({
      required_error: t("schema_nameApplier2"),
    }).min(1, {
      message: t("schema_nameApplier2"),
    }),
    applier2Mobile: string({
      required_error: t("schema_phoneNumber"),
    }).min(1, {
      message: t("schema_phoneNumber"),
    }),
    applier2Email: string({
      required_error: t("schema_email"),
    })
      .min(1, {
        message: t("schema_email"),
      })
      .email({ message: t("schema_invalidEmailFormatApplier2") }),
    applier2Birth: string({
      required_error: t("schema_dateSelection"),
    }).refine(isValidDate, {
      message: t("schema_dateSelection"),
    }),
    applier2Gender: string({
      required_error: t("schema_gender"),
    }).min(1, {
      message: t("schema_gender"),
    }),
    applier2Company: string({
      required_error: t("schema_company"),
    }).min(1, {
      message: t("schema_company"),
    }),

    // Company fields
    companyName: string({
      required_error: t("schema_companyName"),
    }).min(1, {
      message: t("schema_companyName"),
    }),
    companyAddress: string({
      required_error: t("schema_companyAddressRegion"),
    }).min(1, {
      message: t("schema_companyAddressRegion"),
    }),
    companyIntroduce: string({
      required_error: t("schema_companyIntroduction"),
    }).min(1, {
      message: t("schema_companyIntroduction"),
    }),
    companyParticipants: string({
      required_error: t("schema_companyParticipants"),
    }).min(1, {
      message: t("schema_companyParticipants"),
    }),
    companyParticipantsAge: string({
      required_error: t("schema_companyParticipantsAge"),
    }).min(1, {
      message: t("schema_companyParticipantsAge"),
    }),
    companyAttWhy: string({
      required_error: t("schema_motivationForParticipation"),
    }).min(1, {
      message: t("schema_motivationForParticipation"),
    }),
    companyAttDate: string({
      required_error: t("schema_desiredTrainingDate"),
    }).date(t("schema_desiredTrainingDate")),
    companyAsk: string({
      required_error: t("schema_otherRequest"),
    }).min(1, {
      message: t("schema_otherRequest"),
    }),

    // Consent fields
    applyBCPFYn: string({
      required_error: t("schema_yesNo"),
    }).min(1, {
      message: t("schema_yesNo"),
    }),

    // Referral fields
    howToCome: string({
      required_error: t("schema_type"),
    }).min(1, {
      message: t("schema_type"),
    }),

    // Team fields
    hasTeammate: z
      .enum(["yes", "no"], {
        required_error: t("schema_hasTeammate"),
      })
      // .min(1, {
      //   message: t("schema_hasTeammate"),
      // })
      .optional(),

    isSensitive: z.enum(["yes", "no"], {
      required_error: t("schema_selectSensitivity"),
    }),

    // Program fields
    programChannel: string({
      required_error: t("schema_programChannel"),
    }).min(1, {
      message: t("schema_programChannel"),
    }),
    programRegion: string({
      required_error: t("schema_programRegion"),
    }).min(1, {
      message: t("schema_programRegion"),
    }),
    programTitle: string({
      required_error: getProgramTitleError(t, type),
    }).min(1, {
      message: getProgramTitleError(t, type),
    }),
    programGenre: string({
      required_error: t("schema_gene"),
    }).min(1, {
      message: t("schema_gene"),
    }),
    programCount: string({
      required_error: t("schema_programCount"),
    }).min(1, {
      message: t("schema_programCount"),
    }),
    programHasContractWithCompany: number({
      required_error: t("schema_contractStatus"),
    }),

    // .min(1, {
    //   message: t("schema_contractStatus"),
    // })
    // .transform(val => {
    //   const intVal = parseInt(val, 10);

    //   if (isNaN(intVal)) {
    //     throw new Error(t("schema_invalidIntegerValue"));
    //   }

    //   return intVal;
    // }),

    channelLink: string({
      required_error: t("schema_channelLink"),
    }).min(1, {
      message: t("schema_channelLink"),
    }),

    trailerUrl: string({
      required_error: t("schema_trailerUrl"),
    }).min(1, {
      message: t("schema_trailerUrl"),
    }),

    experienceMediaEduYn: number({
      required_error: t("schema_experienceMediaEduYn"),
    }),
    // .min(1, {
    //   message: t("schema_experienceMediaEduYn"),
    // })
    // .transform(val => {
    //   return Number(val);
    // }),
    applier2Carrier: string({
      required_error: t("schema_careerApplier2"),
    }).min(1, {
      message: t("schema_careerApplier2"),
    }),
    applyOtherOrgYn: string({
      required_error: t("schema_otherOrg"),
    }).min(1, {
      message: t("schema_otherOrg"),
    }),

    file: array(fileSchema).min(1, {
      message: t("schema_arrayMinOne"),
    }),
  });

  return base;
};

type CommonSchema = z.infer<ReturnType<typeof commonSchema>>;

export { commonSchema };
export type { CommonSchema };
