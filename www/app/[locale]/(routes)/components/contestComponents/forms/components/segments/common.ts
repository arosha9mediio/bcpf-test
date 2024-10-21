import {
  CreateApplicantDto,
  UpdateApplicationDto,
} from "@/lib/__generated/sdk";
import { Path } from "react-hook-form";
import { Segment } from "../common";
import { PartialUnion } from "../tools/useSegmentTools";

type ApplicantUnionType = PartialUnion<
  CreateApplicantDto,
  UpdateApplicationDto
>;

type FormSegmentType<T> = {
  // formRef: MutableRefObject<HTMLFormElement>;

  form: Segment<T>["form"];
  type: ContestType;
  fields: Set<Path<T>>;
  readOnly: boolean;

  // callback: (event: FormEvent<HTMLFormElement>,) => void;
  callback: (payload: ApplicantUnionType) => void;
};

type ContestType =
  | "firstButton"
  | "mcn"
  | "drama"
  | "pbcs2"
  | "school"
  | "bcpf"
  | "safe";

export type { ApplicantUnionType, ContestType, FormSegmentType };
