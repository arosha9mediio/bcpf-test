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
    { text: "분장·소품실", subText: " ", image: Gallery3_3 },
  ],
};

export const facility4: SchoolFacilityData = {
  id: "04",
  title: "숙소동",
  gallery: [
    { text: "메이커제작스튜디오", subText: " ", image: Gallery4_1 },
    { text: "야외수업장", subText: " ", image: Gallery4_2 },
    { text: "운동장", subText: " ", image: Gallery4_3 },
  ],
};

export const program: ProgramData[] = [
  {
    id: "1",
    image: Gallery2_1,
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
  },
  {
    id: "2",
    image: Gallery2_1,
    title: "찾아가는 교육 ‘꿈이음콘텐츠캠프’",
    description:
      "도서산간 지역 내 미디어를 접하기 어려운 아동·청소년을 위해 ‘찾아가는 교육’으로 영상 콘텐츠 제작, 유튜브 업로드 등의 영상제작체험 교육(2박 3일)",
    subject: "도서산간 지역 내 아동·청소년",
    staff: "20명 내외",
    images: [Gallery2_1, Gallery2_2, Gallery2_3],
  },
  {
    id: "3",
    image: Gallery2_1,
    title: "BCPF영상콘텐츠캠프",
    description:
      "콘텐츠 기획, 촬영, 편집, 코딩, 드론, VR, AI영상제작 등 전반적인 영상제작과정을 체험해보는 콘텐츠캠프 교육(1박 2일)",
    subject: "초·중·고등학교, 기관, 단체 등",
    staff: "20명 내외",
    images: [Gallery1_1, Gallery1_2, Gallery1_3],
  },
];
