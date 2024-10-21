// src/lib/youthData.ts
import Youth1_1_1 from "/public/assets/imgs/youth/1/youth1.jpg";
import Youth1_1_2 from "/public/assets/imgs/youth/1/youth2.jpg";
import Youth1_1_3 from "/public/assets/imgs/youth/1/youth3.jpg";
import Youth1_1_4 from "/public/assets/imgs/youth/1/youth4.jpg";
import Youth1_1_5 from "/public/assets/imgs/youth/1/youth5.jpg";
import Youth1_1_6 from "/public/assets/imgs/youth/1/youth6.jpg";
import Youth1_1_7 from "/public/assets/imgs/youth/1/youth7.jpg";
import Youth1_1_8 from "/public/assets/imgs/youth/1/youth8.jpg";
import Youth1_2_1 from "/public/assets/imgs/youth/2/youth1.jpg";
import Youth1_2_2 from "/public/assets/imgs/youth/2/youth2.jpg";
import Youth1_2_3 from "/public/assets/imgs/youth/2/youth3.jpg";
import Youth1_2_4 from "/public/assets/imgs/youth/2/youth4.jpg";
import Youth1_2_5 from "/public/assets/imgs/youth/2/youth5.jpg";
import Youth1_2_6 from "/public/assets/imgs/youth/2/youth6.jpg";
import Youth1_2_7 from "/public/assets/imgs/youth/2/youth7.jpg";
import Youth1_2_8 from "/public/assets/imgs/youth/2/youth8.jpg";
import Youth1_3_1 from "/public/assets/imgs/youth/3/youth1.jpg";
import Youth1_3_2 from "/public/assets/imgs/youth/3/youth2.jpg";
import Youth1_3_3 from "/public/assets/imgs/youth/3/youth3.jpg";
import Youth1_3_4 from "/public/assets/imgs/youth/3/youth4.jpg";
import { StaticImageData } from "next/image";

interface YouthData {
  id: string;
  title: string;
  description: string;
  image: StaticImageData;
}

const youthData1: YouthData[] = [
  {
    id: "1",
    title: "도민주 감독 <상상서울>",
    description:
      "`내 광주 친구들, 나 빼고 다 서울 갔드라? 나는 인자 결판 낼란다!` 광주살이 30년째, 이번엔 기필코 광주를 떠날 이유를 만들거다.",
    image: Youth1_1_1,
  },
  {
    id: "2",
    title: "조은솔 감독 <1963 부녀대탈출>",
    description:
      "1963년 비가 내리는 그날, 124명의 여자들이 서울 시립 부녀보호소를 탈출했다. 그 대탈출을 주도했던 김옥자, 나(감독)는 그녀를 찾아 나서기로 했다.",
    image: Youth1_1_2,
  },
  {
    id: "3",
    title: "김수민 감독 <블랙박스>",
    description:
      "수민은 2014년 연극과에 입학해 엄격한 위계질서 문화 속에서 학교를 다녔다. 이 문화를 없애보려 노력했지만 돌아온 것은 비난과 배척이었다. 10년이 지난 지금, 다들 대학 시절에 겪었던 일들을 어떻게 기억하고 있을까. 여전히 연극에 위계질서가 필요하다고 생각할까?",
    image: Youth1_1_3,
  },
  {
    id: "4",
    title: "이솜이 감독 <그 사람>",
    description:
      "군대를 다녀온 사람들은 하나같이 '그 사람'에 대해 말하기 시작한다. 그 사람이 갖고 있던 잔혹함의 굴레와 그 사람이 겪어낸 이름 없는 괴롭힘 그 사람은 도대체 어떤 사람일까?",
    image: Youth1_1_4,
  },
  {
    id: "5",
    title: "김석빈 감독 <귀신 생식기>",
    description:
      "시간의 규칙이 무너진 공간, 노년의 트랜스젠더 ‘색자’는 과거의 자신을 마주한다. 그녀는 처음으로 그에게 숨겨왔던 옛 이야기를 고백한다.",
    image: Youth1_1_5,
  },
  {
    id: "6",
    title: "이찬열 감독 <삼투압>",
    description:
      "독실한 기독교 신자인 부모님 아래에서 자란 ‘찬열’은 두 세계를 오고 가며 살아간다.",
    image: Youth1_1_6,
  },
  {
    id: "7",
    title: "류승진 감독 <다큐멘터리 손선이>",
    description:
      "동네에서 폐지 줍는 할머니와 서로를 돌보며 지내온 7년, 어느 날 할머니는 마지막을 부탁한다는 말과 평생 모아온 금반지 9개를 내민다.",
    image: Youth1_1_7,
  },
  {
    id: "8",
    title: "권세정×권동현 감독 <개의 나라, 안시객>",
    description:
      "한국의 근대화 과정에서 변화해 온 개와 인간의 관계를 살펴본다. 이를 통해 지금 이곳의 개와 인간의 관계를 되돌아본다.",
    image: Youth1_1_8,
  },
];

const youthData2: YouthData[] = [
  {
    id: "1",
    title: "이은혜 감독 <이상한 레즈의 장례식>",
    description:
      "한국에서 레즈비언으로 살아가는건 고달픈 일이다. 결혼이나 행복한 미래, 제 죽음 따위는 아무래도 생각할 수 없다. 그래서 이 여성은 스물셋의 나이에 장례를 치르기로 한다!",
    image: Youth1_2_1,
  },
  {
    id: "2",
    title: "유소영 감독 <공순이>",
    description:
      "청각장애인 고흥댁은 공댁이라 불렸고, 면서기가 공댁의 딸이라고 ‘공순’이라 호적에 올렸다. 전 태화고무 노동자, 현 도배노동자 공순이의 노동을 중심으로 삶을 기록한다.",
    image: Youth1_2_2,
  },
  {
    id: "3",
    title: "부성필 감독 <철규, 번지점프를 하다>",
    description:
      "와상 장애인 선철규의 세 번째 버킷리스트는 ‘번지점프’ 성필은 철규의 번지점프를 영화로 만들기로 한다.",
    image: Youth1_2_3,
  },
  {
    id: "4",
    title: "장효봉 감독 <별의 순간>",
    description:
      '"방법은 필요 없다. 나는 어떻게든 권력을 손에 쥘 것이다!" 정치의 바다에 뛰어든 젊은 정치인이 권력을 낚아채기 위해 끊임없이 도전한다.',
    image: Youth1_2_4,
  },
  {
    id: "5",
    title: "이병기 감독 <오이 못먹습니다만>",
    description:
      "오이를 못 먹어 트라우마가 생긴 감독이 오이와 관계된 많은 사람을 만나며 겪게 되는 과정을 그린 영화",
    image: Youth1_2_5,
  },
  {
    id: "6",
    title: "임수빈 감독 <흔들리는 사람에게>",
    description:
      "정권의 탄압에 맞서 20대를 학생운동으로 보낸 나와 내 동료들. 그들은 지금 어떻게 살고 있을까?",
    image: Youth1_2_6,
  },
  {
    id: "7",
    title: "박소현 감독 <수국>",
    description:
      "옮겨 심어진 토양에 따라 다른 색으로 피어나는 수국처럼 한-일 사이 경계인으로 존재하는 ‘소현’이 자신의 정체성을 찾아 나선다.",
    image: Youth1_2_7,
  },
  {
    id: "8",
    title: "정수은 감독 <후아유>",
    description:
      "한국의 인천과 영국의 뉴몰든, 두 개의 접촉지대에서 함께 살아가고 있는 남북한 사람들의 이야기",
    image: Youth1_2_8,
  },
];

const youthData3: YouthData[] = [
  {
    id: "1",
    title: "조한나 감독 <퀸의 뜨개질>",
    description:
      "“뜨개질을 하며 자란 여자아이, 자신의 사연들을 뜨개질로 이어 붙여 이야기를 만들기로 한다.”",
    image: Youth1_3_1,
  },
  {
    id: "2",
    title: "이준용 감독 <땅과 꿈>",
    description:
      "평생 민통선 철책 너머 땅을 일궈온 이기인 할머니는 강제수용 당한 ‘후방 땅’을 되찾기 위한 싸움을 시작한다",
    image: Youth1_3_2,
  },
  {
    id: "3",
    title: "김혜이 감독 <낮에 뜨는 달>",
    description:
      "정상의 범위에 속하지 못하고 미친년이라 불려온 여성들이 있다. 특이할 것 같지만 나와 별반 다르지 않아 보이는, 하지만 같다고 말하기엔 무언가 특별해 보이는, 애써 들여다보려고 하지 않았던 여성 조현병 당사자들의 이야기가 시작된다.",
    image: Youth1_3_3,
  },
  {
    id: "4",
    title: "이소정 감독 <모든 점>",
    description:
      "디지털 신호인 ‘노이즈’에 대한 영화적 사유로 아날로그에서 디지털로 변화하는 과정 안에서 이미지가 존재하는 방식이 어떻게 달라졌는지, 그리고 우리가 이미지를 지각하는 방식은 어떻게 달라졌는지 질문을 던진다.",
    image: Youth1_3_4,
  },
];

export { youthData1, youthData2, youthData3 };
