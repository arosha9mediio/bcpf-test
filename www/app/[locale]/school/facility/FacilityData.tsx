import { StaticImageData } from "next/image";
import Gallery1_1 from "/public/assets/imgs/content/edu/1-1.jpg";
import Gallery1_2 from "/public/assets/imgs/content/edu/1-2.jpg";
import Gallery1_3 from "/public/assets/imgs/content/edu/1-3.jpg";
import Gallery2_1 from "/public/assets/imgs/content/edu/2-1.jpg";
import Gallery2_2 from "/public/assets/imgs/content/edu/2-2.jpg";
import Gallery2_3 from "/public/assets/imgs/content/edu/2-3.jpg";
import Gallery2_4 from "/public/assets/imgs/content/edu/2-4.jpg";
import Gallery2_5 from "/public/assets/imgs/content/edu/2-5.jpg";
import Gallery3_1 from "/public/assets/imgs/content/edu/3-1.jpg";
import Gallery3_2 from "/public/assets/imgs/content/edu/3-2.jpg";
import Gallery3_3 from "/public/assets/imgs/content/edu/3-3.jpg";
import Gallery4_1 from "/public/assets/imgs/content/edu/4-1.jpg";
import Gallery4_2 from "/public/assets/imgs/content/edu/4-2.jpg";
import Gallery4_3 from "/public/assets/imgs/content/edu/4-2.jpg";

import Program1_1 from "/public/assets/imgs/content/program/1-1.jpg";
import Program1_2 from "/public/assets/imgs/content/program/1-2.jpg";
import Program1_3 from "/public/assets/imgs/content/program/1-3.jpg";
import Program1_4 from "/public/assets/imgs/content/program/1-4.jpg";
import Program1_5 from "/public/assets/imgs/content/program/1-5.jpg";
import Program1_6 from "/public/assets/imgs/content/program/1-6.jpg";
import Program1_7 from "/public/assets/imgs/content/program/1-7.jpg";
import Program1_8 from "/public/assets/imgs/content/program/1-8.jpg";
import Program1_9 from "/public/assets/imgs/content/program/1-9.jpg";
import Program1_10 from "/public/assets/imgs/content/program/1-10.jpg";
import Program1_11 from "/public/assets/imgs/content/program/1-11.jpg";
import Program2_1 from "/public/assets/imgs/content/program/2-1.jpg";
import Program2_2 from "/public/assets/imgs/content/program/2-2.jpg";
import Program2_3 from "/public/assets/imgs/content/program/2-3.jpg";
import Program2_4 from "/public/assets/imgs/content/program/2-4.jpg";
import Program2_5 from "/public/assets/imgs/content/program/2-5.jpg";
import Program2_6 from "/public/assets/imgs/content/program/2-6.jpg";
import Program2_7 from "/public/assets/imgs/content/program/2-7.jpg";
import Program2_8 from "/public/assets/imgs/content/program/2-8.jpg";
import Program2_9 from "/public/assets/imgs/content/program/2-9.jpg";
import Program3_1 from "/public/assets/imgs/content/program/3-2-1.jpg";
import Program3_2 from "/public/assets/imgs/content/program/3-2-2.jpg";
import Program3_3 from "/public/assets/imgs/content/program/3-2-3.jpg";
import Program3_4 from "/public/assets/imgs/content/program/3-2-4.jpg";
import Program3_5 from "/public/assets/imgs/content/program/3-2-5.jpg";
import Program3_6 from "/public/assets/imgs/content/program/3-2-6.jpg";
import Program4_1 from "/public/assets/imgs/content/program/3-1.jpg";
import Program4_2 from "/public/assets/imgs/content/program/3-2.jpg";
import Program4_3 from "/public/assets/imgs/content/program/3-3.jpg";
import Program4_4 from "/public/assets/imgs/content/program/3-4.jpg";
import Program4_5 from "/public/assets/imgs/content/program/3-5.jpg";
import Program4_6 from "/public/assets/imgs/content/program/3-6.jpg";
import Program4_7 from "/public/assets/imgs/content/program/3-7.jpg";
import Program4_8 from "/public/assets/imgs/content/program/3-8.jpg";
import Program4_9 from "/public/assets/imgs/content/program/3-9.jpg";
import Program6_1 from "/public/assets/imgs/content/program/5-1.jpg";
import Program6_2 from "/public/assets/imgs/content/program/5-2.jpg";
import Program6_3 from "/public/assets/imgs/content/program/5-3.jpg";
import Program6_4 from "/public/assets/imgs/content/program/5-4.jpg";
import Program6_5 from "/public/assets/imgs/content/program/5-5.jpg";
import Program6_6 from "/public/assets/imgs/content/program/5-6.jpg";
import Program6_7 from "/public/assets/imgs/content/program/5-7.jpg";
import Program6_8 from "/public/assets/imgs/content/program/5-8.jpg";
import Program6_9 from "/public/assets/imgs/content/program/5-9.jpg";
import Program6_10 from "/public/assets/imgs/content/program/5-10.jpg";
import Program7_1 from "/public/assets/imgs/content/program/6-1.jpg";
import Program7_2 from "/public/assets/imgs/content/program/6-2.jpg";
import Program7_3 from "/public/assets/imgs/content/program/6-3.jpg";
import Program8_1 from "/public/assets/imgs/content/program/7-1.jpg";
import Program8_2 from "/public/assets/imgs/content/program/7-2.jpg";
import Program8_3 from "/public/assets/imgs/content/program/7-3.jpg";
import Program8_4 from "/public/assets/imgs/content/program/7-4.jpg";
import Program8_5 from "/public/assets/imgs/content/program/7-5.jpg";
import Program8_6 from "/public/assets/imgs/content/program/7-6.jpg";
import Program8_7 from "/public/assets/imgs/content/program/7-7.jpg";
import Program8_8 from "/public/assets/imgs/content/program/7-8.jpg";
import Program8_9 from "/public/assets/imgs/content/program/7-9.jpg";
import Program8_10 from "/public/assets/imgs/content/program/7-10.jpg";
import ImgPlaceholder from "/public/assets/imgs/content/program/placeholder.jpg";

export interface GalleryItem {
  text: string;
  subText: string;
  image: StaticImageData;
}

export interface SchoolFacilityData {
  id: string;
  title: string;
  gallery: GalleryItem[];
}

export interface ProgramData {
  id: string;
  image: StaticImageData;
  title: string;
  description: string;
  subject: string;
  staff: string;
  images: StaticImageData[];
  link?: string;
}

export const facility1: SchoolFacilityData = {
  id: "01",
  title: "본관",
  gallery: [
    { text: "제1강의실", subText: "(대강의실)", image: Gallery1_1 },
    { text: "제2·3강의실", subText: "(소강의실)", image: Gallery1_2 },
    { text: "분장·소품실", subText: " ", image: Gallery1_3 },
  ],
};

export const facility2: SchoolFacilityData = {
  id: "02",
  title: "블루빌",
  gallery: [
    { text: "영상편집실", subText: " ", image: Gallery2_1 },
    { text: "제1스튜디오", subText: " ", image: Gallery2_2 },
    { text: "스튜디오조정실", subText: " ", image: Gallery2_3 },
    { text: "코워킹스페이스", subText: " ", image: Gallery2_4 },
    { text: "일상책반사(독서공간)", subText: " ", image: Gallery2_5 },
  ],
};

export const facility3: SchoolFacilityData = {
  id: "03",
  title: "누리관",
  gallery: [
    { text: "제2스튜디오", subText: " ", image: Gallery3_1 },
    { text: "메이커스페이스", subText: "(DIY창작소)", image: Gallery3_2 },
    { text: "숙소동", subText: " ", image: Gallery3_3 },
  ],
};

export const facility4: SchoolFacilityData = {
  id: "04",
  title: "기타시설",
  gallery: [
    { text: "메이커제작스튜디오", subText: " ", image: Gallery4_1 },
    { text: "야외수업장", subText: " ", image: Gallery4_2 },
    { text: "운동장", subText: " ", image: Gallery4_3 },
  ],
};

export const program: ProgramData[] = [
  {
    id: "1",
    image: Program1_1,
    title: "BCPF영상콘텐츠캠프",
    description:
      "콘텐츠 기획, 촬영, 편집, 코딩, 드론, VR, AI영상제작 등 전반적인 영상제작과정을 체험해보는 콘텐츠캠프 교육(1박 2일)",
    subject: "초·중·고등학교, 기관, 단체 등",
    staff: "20명 내외",
    images: [
      Program1_1,
      Program1_2,
      Program1_3,
      Program1_4,
      Program1_5,
      Program1_6,
      Program1_7,
      Program1_8,
      Program1_9,
      Program1_10,
      Program1_11,
    ],
    link: "https://www.youtube.com/playlist?list=PL6F8atnDer1X6hQCFNtE4vHeDF-pz4D-o",
  },
  {
    id: "2",
    image: Program2_1,
    title: "찾아가는 교육 ‘꿈이음콘텐츠캠프’",
    description:
      "도서산간 지역 내 미디어를 접하기 어려운 아동·청소년을 위해 ‘찾아가는 교육’으로 영상 콘텐츠 제작, 유튜브 업로드 등의 영상제작체험 교육(2박 3일)",
    subject: "도서산간 지역 내 아동·청소년",
    staff: "20명 내외",
    images: [
      Program2_1,
      Program2_2,
      Program2_3,
      Program2_4,
      Program2_5,
      Program2_6,
      Program2_7,
      Program2_8,
      Program2_9,
    ],
    link: "https://www.youtube.com/playlist?list=PL6F8atnDer1Whar1n5NJ5Ht5t_j5qMCMh",
  },
  {
    id: "3",
    image: Program3_1,
    title: "함께 떠나는 ‘콘텐츠 소풍’",
    description:
      "미디어 체험기회가 적은 아동·청소년들이 영상을 통해 자기표현 능력을 키우고, 콘텐츠를 이해하고 활용할 수 있도록 돕는 '콘텐츠 소풍' 미디어 교육",
    subject: "도서산간 지역 내 아동· 청소년",
    staff: "20명 내외",
    images: [
      Program3_1,
      Program3_2,
      Program3_3,
      Program3_4,
      Program3_5,
      Program3_6,
    ],
    link: "https://www.youtube.com/playlist?list=PL6F8atnDer1W4jSiTG3v5kgWo3AKdfYfK",
  },
  {
    id: "4",
    image: Program4_1,
    title: "지역민과 함께하는 미디어 놀이터 ‘도고팡’",
    description:
      "지역 농산물 + 콘텐츠를 결합한 ‘아산맑은 도고쪽파축제’ 개최로 지역민과 함께하는 문화공간",
    subject: "지역주민",
    staff: "15명 내외",
    images: [
      Program4_1,
      Program4_2,
      Program4_3,
      Program4_4,
      Program4_5,
      Program4_6,
      Program4_7,
      Program4_8,
      Program4_9,
    ],
    link: "https://www.youtube.com/playlist?list=PL6F8atnDer1X6Bm0WFSyDrgzfQf3WOZph",
  },
  {
    id: "5",
    image: ImgPlaceholder,
    title: "콘텐츠여행 ‘동행+ 플러스’",
    description:
      "지역 내 문화, 역사, 핫플레이스, 여행 등을 주제로 한 로컬콘텐츠 영상교육",
    subject: "청년 · 크리에이터 등",
    staff: "20명 내외",
    images: [ImgPlaceholder],
    link: "https://www.youtube.com/playlist?list=PL6F8atnDer1W57Np04eTsGdk-JNscxW_0",
  },
  {
    id: "6",
    image: Program6_1,
    title: "로컬 On Air 스튜디오",
    description:
      "콘텐츠학교 내 다양한 스튜디오를 활용하여 제품 영상, 셀프 스튜디오 사진 등 콘텐츠 제작 교육",
    subject: "개인, 1인 창업자(소상공인), 크리에이터 등",
    staff: "5명 내외",
    images: [
      Program6_1,
      Program6_2,
      Program6_3,
      Program6_4,
      Program6_5,
      Program6_6,
      Program6_7,
      Program6_8,
      Program6_9,
      Program6_10,
    ],
    link: "https://youtube.com/playlist?list=PL6F8atnDer1UBAjKcNcSDSNu_PzkCY8o_&si=gDYeFEEywNtU6KQe",
  },
  {
    id: "7",
    image: Program7_1,
    title: "AI 영상제작 교육 ‘속전속결’",
    description:
      "뉴미디어 시대의 흐름에 따라 AI를 활용하여 영상제작을 경험하고 창의적인 콘텐츠 제작 교육",
    subject: "개인, 크리에이터, 기관, 단체 등",
    staff: "10명 내외",
    images: [Program7_1, Program7_2, Program7_3],
  },
  {
    id: "8",
    image: Program8_1,
    title: "메이커프로그램 ‘단 하나뿐’",
    description:
      "콘텐츠 + 메이커 융합 교육으로 코딩, AI, 3D프린터, 목공 등 메이커 체험프로그램 교육",
    subject: "개인, 소모임, 기관, 단체 등",
    staff: "5명 내외",
    images: [
      Program8_1,
      Program8_2,
      Program8_3,
      Program8_4,
      Program8_5,
      Program8_6,
      Program8_7,
      Program8_8,
      Program8_9,
      Program8_10,
    ],
  },
];
