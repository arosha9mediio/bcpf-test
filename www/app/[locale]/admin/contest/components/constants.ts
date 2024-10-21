import { SelectionItemType } from "@/components/search/SearchBar";

export const CONTEST_STATUS: SelectionItemType = {
  "-1": { label: "접수대기", value: "-1" },
  "0": { label: "접수중", value: "0" },
  "10": { label: "심사중", value: "10" },
  "11": { label: "1차 심사중", value: "11" },
  "12": { label: "2차 심사중", value: "12" },
  "1": { label: "1차 선정", value: "1" },
  "2": { label: "2차 선정", value: "2" },
  "99": { label: "선정", value: "99" },
  "100": { label: "종료", value: "100" },
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
