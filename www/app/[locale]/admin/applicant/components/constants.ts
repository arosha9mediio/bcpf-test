import { SelectionItemType } from "@/components/search/SearchBar";

export const APPLICATION_STATUS: SelectionItemType = {
  1: { label: "접수처리중", value: "접수처리중" },
  2: { label: "접수완료", value: "접수완료" },
  3: { label: "미선정", value: "미선정" },
  4: { label: "1차선정", value: "1차선정" },
  5: { label: "2차선정", value: "2차선정" },
  6: { label: "최종선정", value: "최종선정" },
} as const;

export const CONTEST_TYPES: SelectionItemType = {
  drama: {
    label: "드라마극본공모전 '사막의별똥별'",
    value: "drama",
  },
  bcpf: {
    label: "BCPF 대한민국 1인 방송대상",
    value: "bcpf",
  },
  mcn: {
    label: "1인방송제작스쿨",
    value: "mcn",
  },
  firstButton: {
    label: "첫단추프로젝트",
    value: "firstButton",
  },
  school: {
    label: "BCPF콘텐츠학교",
    value: "school",
  },
  pbcs2: {
    label: "지역살리기프로젝트 '방방곳곡 : 지역이-음'",
    value: "pbcs2",
  },
  safe: {
    label: "안전드림공모전",
    value: "safe",
  },
} as const;
