// export const APPLIER1_GENDER = [
//   { id: "남성", value: "남성", label: "남성" },
//   { id: "여성", value: "여성", label: "여성" },
// ];

import { SegmentRadioItem } from "./forms/components/fields/SegmentRadio";

// export const APPLIER2_GENDER = [
//   { id: "남성", value: "남성", label: "남성" },
//   { id: "여성", value: "여성", label: "여성" },
// ];

// export const HAS_TEAMMATE = [
//   { id: "예", value: "예", label: "예" },
//   { id: "아니오", value: "아니오", label: "아니오" },
// ];

// export const AGGREE_TO_TC = [
//   { id: "예", value: "예", label: "예" },
//   { id: "아니오", value: "아니오", label: "아니오" },
// ];

// export const FOUND_BY = [
//   { id: "재단", value: "재단", label: "재단" },
//   { id: "홈페이지", value: "홈페이지", label: "홈페이지" },
//   { id: "SNS", value: "SNS", label: "SNS" },
//   { id: "언론보도", value: "언론보도", label: "언론보도" },
//   { id: "주변소개", value: "주변소개", label: "주변소개" },
//   { id: "커뮤니티", value: "커뮤니티", label: "커뮤니티" },
// ];

// export const MEDIA_EDU = [
//   { id: "1", value: "예", label: "예" },
//   { id: "0", value: "아니오", label: "아니오" },
// ];

// export const CONTACT_WITH_COMPANY = [
//   { id: "1", value: "예", label: "예" },
//   { id: "0", value: "아니오", label: "아니오" },
// ];

export const APPLIER1_GENDER = [
  { value: "male", label: "forms_selection_male" },
  { value: "female", label: "forms_selection_female" },
];

export const APPLIER2_GENDER = [
  { value: "male", label: "forms_selection_male" },
  { value: "female", label: "forms_selection_female" },
];

export const HAS_TEAMMATE = [
  { value: "yes", label: "forms_selection_yes" },
  { value: "no", label: "forms_selection_no" },
];

export const AGGREE_TO_TC = [
  { value: "yes", label: "forms_selection_yes" },
  { value: "no", label: "forms_selection_no" },
];

export const FOUND_BY: SegmentRadioItem[] = [
  {
    value: "foundation",
    label: "forms_selection_foundation",
    type: "default",
  },
  { value: "sns", label: "forms_selection_sns", type: "default" },
  {
    value: "media_coverage",
    label: "forms_selection_media_coverage",
    type: "default",
  },

  { value: "website", label: "forms_selection_website", type: "default" },

  // MANUAL
  {
    value: "community",
    label: "forms_selection_community",
    type: "input",
  },
  {
    value: "referral",
    label: "forms_selection_referral",
    type: "input",
  },
];

export const MEDIA_EDU = [
  { value: 1, label: "forms_selection_yes" },
  { value: 0, label: "forms_selection_no" },
];

export const CONTACT_WITH_COMPANY = [
  { value: 1, label: "forms_selection_yes" },
  { value: 0, label: "forms_selection_no" },
];
