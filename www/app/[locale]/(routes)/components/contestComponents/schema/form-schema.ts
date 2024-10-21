import { object, string, date } from "zod";

const schoolschema = object({
  applier1Name: string().min(1, {
    message: "Name must be provided.",
  }),
  applier1Company: string().min(1, {
    message: "Company must be provided.",
  }),
  applier1Mobile: string().min(1, {
    message: "Phoneno must be provided.",
  }),
  applier1Email: string()
    .min(1, {
      message: "Email must be provided.",
    })
    .email({ message: "Invalid email format." }),
  applier1Birth: date({ message: "Date must be selected." }),
  companyName: string().min(1, {
    message: "Company Name must be provided.",
  }),
  companyAddress: string().min(1, {
    message: "Company Address Region must be provided.",
  }),
  companyIntroduce: string().min(1, {
    message: "Company Introduction must be provided.",
  }),
  companyParticipants: string().min(1, {
    message: "company Participants must be provided.",
  }),
  companyParticipantsAge: string().min(1, {
    message: "Company Participants Age must be provided.",
  }),
  companyAttWhy: string().min(1, {
    message: "Motivation for participation must be provided.",
  }),
  companyAttDate: date({
    message: "Desired training date must be selected.",
  }),
  companyAsk: string().min(1, {
    message: "Other / Request must be provided.",
  }),
  applyBCPFYn: string().min(1, {
    message: "yes no must be provided.",
  }),

  howToCome: string().min(1, {
    message: "type must be provided.",
  }),
});

const pbsc2Schema = object({
  applier1Name: string().min(1, {
    message: "Name must be provided.",
  }),
  applier1Mobile: string().min(1, {
    message: "Phoneno must be provided.",
  }),
  applier1Email: string()
    .min(1, {
      message: "Email must be provided.",
    })
    .email({ message: "Invalid email format." }),
  applier1Birth: date({ message: "Date must be selected." }),
  applier1Gender: string().min(1, {
    message: "Gender must be provided.",
  }),

  programChannel: string().min(1, {
    message: "Program Channel must be provided.",
  }),
  programRegion: string().min(1, {
    message: "Program Region must be provided.",
  }),
  programTitle: string().min(1, {
    message: "Program must be provided.",
  }),
  programGenre: string().min(1, {
    message: "Gene must be provided.",
  }),
  trailerUrl: string().min(1, {
    message: "Trailer Url must be provided.",
  }),
  applier1Carrier: string().min(1, {
    message: "Career must be provided.",
  }),
  applyBCPFYn: string().min(1, {
    message: "yes no must be provided.",
  }),

  howToCome: string().min(1, {
    message: "type must be provided.",
  }),
});

const mcnSchema = object({
  applier1Name: string().min(1, {
    message: "Name must be provided.",
  }),
  applier1Mobile: string().min(1, {
    message: "Phoneno must be provided.",
  }),
  applier1Email: string()
    .min(1, {
      message: "Email must be provided.",
    })
    .email({ message: "Invalid email format." }),
  applier1Birth: date({ message: "Date must be selected." }),
  applier1Company: string().min(1, {
    message: "Company must be provided.",
  }),
  applier1Gender: string().min(1, {
    message: "Gender must be provided.",
  }),
  applier1Address: string().min(1, {
    message: "Gender must be provided.",
  }),
  programGenre: string().min(1, {
    message: "Gene must be provided.",
  }),
  programTitle: string().min(1, {
    message: "Program must be provided.",
  }),

  channelLink: string().min(1, {
    message: "type must be provided.",
  }),
  experienceMediaEduYn: string().min(1, {
    message: "type must be provided.",
  }),

  applyBCPFYn: string().min(1, {
    message: "yes no must be provided.",
  }),

  howToCome: string().min(1, {
    message: "type must be provided.",
  }),
});

const firstSchema = object({
  applier1Name: string().min(1, {
    message: "Name must be provided.",
  }),
  applier1Mobile: string().min(1, {
    message: "Phoneno must be provided.",
  }),
  applier1Email: string()
    .min(1, {
      message: "Email must be provided.",
    })
    .email({ message: "Invalid email format." }),
  applier1Birth: date({ message: "Date must be selected." }),
  applier1Company: string().min(1, {
    message: "Company must be provided.",
  }),
  applier1Gender: string().min(1, {
    message: "Gender must be provided.",
  }),
  hasTeammate: string().min(1, {
    message: "hasTeammate must be provided.",
  }),

  applier2Name: string().optional(),
  applier2Mobile: string().optional(),
  applier2Email: string().optional(),
  applier2Birth: date({ message: "Date must be selected." }).optional(),
  applier2Company: string().optional(),
  applier2Gender: string().optional(),

  programTitle: string().min(1, {
    message: "Program must be provided.",
  }),
  programGenre: string().min(1, {
    message: "Gene must be provided.",
  }),
  applyOtherOrgYn: string().min(1, {
    message: "Other Org must be provided.",
  }),
  applier1Carrier: string().min(1, {
    message: "Career must be provided.",
  }),
  applyBCPFYn: string().min(1, {
    message: "yes no must be provided.",
  }),

  howToCome: string().min(1, {
    message: "type must be provided.",
  }),
});

const dramaSchema = object({
  applier1Name: string().min(1, {
    message: "Name must be provided.",
  }),
  applier1SchoolEtc: string().min(1, {
    message: "description must be provided.",
  }),
  applier1Mobile: string().min(1, {
    message: "Phoneno must be provided.",
  }),
  applier1Email: string()
    .min(1, {
      message: "Email must be provided.",
    })
    .email({ message: "Invalid email format." }),
  applier1Birth: date({ message: "Date must be selected." }),
  applier1Gender: string().min(1, {
    message: "Gender must be provided.",
  }),
  // ---------
  hasTeammate: string().min(1, {
    message: "hasTeammate must be provided.",
  }),
  // ---------

  // applier1Company: z.string().min(1, {
  //   message: "Company must be provided.",
  // }),

  applier2Name: string().optional(),
  applier2Mobile: string().optional(),
  applier2Email: string().optional(),
  applier2Birth: date({ message: "Date must be selected." }).optional(),
  applier2Gender: string().optional(),
  //------------
  programTitle: string().min(1, {
    message: "Program must be provided.",
  }),
  programGenre: string().min(1, {
    message: "Gene must be provided.",
  }),
  programCount: string().min(1, {
    message: "Gene must be provided.",
  }),
  programHasContractWithCompany: string().min(1, {
    message: "Gene must be provided.",
  }),
  //------------
  applier1Carrier: string().min(1, {
    message: "Career must be provided.",
  }),
  //-----------------

  applyBCPFYn: string().min(1, {
    message: "yes no must be provided.",
  }),

  howToCome: string().min(1, {
    message: "type must be provided.",
  }),
});

const bcpfSafeSchema = object({
  applier1Name: string().min(1, {
    message: "Name must be provided.",
  }),
  applier1Mobile: string().min(1, {
    message: "Phoneno must be provided.",
  }),
  applier1Email: string()
    .min(1, {
      message: "Email must be provided.",
    })
    .email({ message: "Invalid email format." }),
  applier1Birth: date({ message: "Date must be selected." }),
  applier1Gender: string().min(1, {
    message: "Gender must be provided.",
  }),

  programChannel: string().min(1, {
    message: "Program Channel must be provided.",
  }),
  programTitle: string().min(1, {
    message: "Program must be provided.",
  }),
  programGenre: string().min(1, {
    message: "Gene must be provided.",
  }),
  trailerUrl: string().min(1, {
    message: "Trailer Url must be provided.",
  }),
  applier1Carrier: string().min(1, {
    message: "Career must be provided.",
  }),
  applyBCPFYn: string().min(1, {
    message: "yes no must be provided.",
  }),

  howToCome: string().min(1, {
    message: "type must be provided.",
  }),
});
