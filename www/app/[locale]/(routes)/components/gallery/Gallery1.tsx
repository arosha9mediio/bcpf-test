"use client";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import Portfilio1 from "/public/assets/imgs/portfolio/1/7.jpg";
import Portfilio2 from "/public/assets/imgs/portfolio/1/6.jpg";
import Portfilio3 from "/public/assets/imgs/portfolio/1/5.jpg";
import Portfilio4 from "/public/assets/imgs/portfolio/1/4.jpg";
import Portfilio5 from "/public/assets/imgs/portfolio/1/3.jpg";
import Portfilio6 from "/public/assets/imgs/portfolio/1/2.jpg";
import Portfilio7 from "/public/assets/imgs/portfolio/1/1.jpg";
import OhDirector1 from "/public/assets/imgs/content/drama/oh-1.jpg";
import OhDirector2 from "/public/assets/imgs/content/drama/oh-2.jpg";
import HaDirector1 from "/public/assets/imgs/content/drama/ha-1.jpg";
import HaDirector2 from "/public/assets/imgs/content/drama/ha-2.jpg";
import HaDirector3 from "/public/assets/imgs/content/drama/ha-3.jpeg";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import animationCharCome from "../../lib/utils/animationCharCome";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImagePop } from "./ImagePop";

const GALLERY = [
  {
    id: 1,
    section: "제12회",
    header: "[대상] 수상작",
    description: `'진실이라 믿었던 것들이 깨진 뒤, 남은 것은 불행이었다' 진정한 나의 행복 을 되찾기 위해 외면해왔던 '나'를 마주하는 한 여자의 처절한 분투기.`,
    title: "해피엔드",
    author: "백선희",
    date: "2023. 12. ~ 2024. 2. TV조선 방영",
    image: Portfilio1,
  },
  {
    id: 2,
    section: "제10회",
    header: "<SBS플러스상> 수상작",
    description: `복수에 호기롭게 뛰어든 여자 '우주'와 복수의 대상이 된 남자 '동진', 만나 지 말았어야 할 두 남녀의 감성 로맨스`,
    title: "사랑이라말해요",
    author: "김가은",
    date: "2023. 2.. 디즈니+ 방영",
    image: Portfilio2,
  },
  {
    id: 3,
    section: "제10회",
    header: "<대상> 수상작",
    description: `취업 대신 출마를 선택한 취준생 구세라와 좌천당한 엘리트 사무관 서공명 이 불량 정치인들을 응징하는 오피스 로맨스 코미디 드라마`,
    title: "출사표",
    author: "문현경",
    date: "2020. 7. ~ 2020. 8. KBS2 방영",
    image: Portfilio3,
  },
  {
    id: 4,
    section: "제9회",
    header: "<대상> 수상작",
    description: `정통 왕조 이 씨가 아닌 자들에게 유일하게 허락된 조선 최고의 지위, '왕비'의 자리를 노리는 이들의 목숨 건 경합이 벌어지는 궁중 서바이벌 로맨스를 그린 이야기`,
    title: "간택사냥",
    author: "최수미",
    date: "2019. 12. ~ 2020. 2. TV조선 방영",
    image: Portfilio4,
  },
  {
    id: 5,
    section: "제7회",
    header: "<우수상> 수상작",
    description: `복잡한 소비의 도시, 서울 한복판에 떨어진 온실 기억상실남 '쇼핑왕 루이' 와 오대산 날다람쥐 넷맹녀 '고복실'의 파란만장 서바이벌 로맨틱 코미디`,
    title: "쇼핑왕 루이",
    author: "오지영",
    date: "2016. 9. ~ 2016. 11. MBC 방영",
    image: Portfilio5,
    directors: [
      { dirImage: OhDirector1, alt: "오지영작가_후속 집필작1" },
      { dirImage: OhDirector2, alt: "오지영작가_후속 집필작1" },
    ],
  },
  {
    id: 6,
    section: "제10회",
    header: "<SBS플러스상> 수상작",
    description:
      "과거의 상처를 딛고 의사가 된 두 남녀가 여러 인간 군상을 만나며 성장하고, 평생 단 한번뿐인 사랑을 시작하는 휴먼 메디컬 드라마",
    title: "여깡패 혜정",
    author: "하명희",
    date: "2016. 6. ~ 2016. 8. SBS 방영",
    image: Portfilio6,
    directors: [
      { dirImage: HaDirector1, alt: "하명희작가_후속 집필작1" },
      { dirImage: HaDirector2, alt: "하명희작가_후속 집필작2" },
      { dirImage: HaDirector3, alt: "하명희작가_후속 집필작3" },
    ],
  },
  {
    id: 7,
    section: "제2회",
    header: "<우수상> 수상작",
    description:
      "양.한방 협진병원 내 신경외과에서 벌어지는 천재 신경외과 전문의 김두현과 천재 한의사 김승현 형제의 운명적 대결과 함께, 양.한방 의사들의 뜨거운 열정과 치열한 자존심 대결을 그린 드라마",
    title: "제3의 병원",
    author: "성진미",
    date: "2012. 9. ~ 2012. 11. tvN 방영",
    image: Portfilio7,
  },
];

const Gallery1 = () => {
  const charAnim = useRef();
  useEffect(() => {
    animationCharCome(charAnim.current);
  }, []);
  const [showModal, setShowModal] = useState(false);

  const swiperRef = useRef<SwiperRef>(null);

  return (
    <>
      <section className="portfolio__area-3 portfolio-v4">
        <div className="container pt-20 sm:pt-100 pb-150">
          <div className="row pb-8 sm:pb-20">
            <div className="flex justify-center">
              <div className="sec-title-wrapper">
                <h2 className="sec-title-9 animation__char_come" ref={charAnim}>
                  &apos;사막의 별똥별 찾기&apos; 주요 수상작
                </h2>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xxl-12 portfolio__slider-3">
              <Swiper
                ref={swiperRef}
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                // effectfade="true"
                loop={true}
                speed={1500}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                navigation={{
                  prevEl: ".pp-prev",
                  nextEl: ".pp-next",
                }}
                pagination={{ el: ".swiper-pagination", type: "fraction" }}>
                <div className="swiper-wrapper">
                  {GALLERY.map((content, index) => (
                    <SwiperSlide key={index}>
                      <div className="portfolio__slide-3">
                        <div className="portfolio__title-3 animate-slideup opacity-0">
                          <h3>{content.section}</h3>
                          <h4>{content.header}</h4>
                          <p>{content.description}</p>

                          <ul className="list-disc pl-5">
                            <li style={{ listStyleType: "disc" }}>
                              <strong>원제:</strong> {content.title}
                            </li>
                            <li style={{ listStyleType: "disc" }}>
                              <strong>작가:</strong> {content.author}
                            </li>
                            <li style={{ listStyleType: "disc" }}>
                              {content.date}
                            </li>
                          </ul>
                          <div className="mt-4 flex w-full gap-4">
                            {content?.directors && (
                              <ImagePop
                                onClose={() =>
                                  swiperRef?.current?.swiper.autoplay.resume()
                                }
                                onOpen={() =>
                                  swiperRef?.current?.swiper.autoplay.pause()
                                }
                                items={content.directors}
                              />
                            )}
                          </div>
                        </div>
                        <Image
                          priority
                          width={520}
                          style={{ height: "auto" }}
                          src={content.image}
                          alt="Portfolio Image"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </div>

                <div className="swiper-pagination"></div>

                <div className="swiper-btn">
                  <div style={{ cursor: "pointer" }} className="pp-prev">
                    <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                  </div>
                  <div style={{ cursor: "pointer" }} className="pp-next">
                    <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
                  </div>
                </div>
              </Swiper>
            </div>
          </div>
          <div className="col-xxl-12" onClick={() => setShowModal(true)}>
            <div
              className="portfolio__btn btn_wrapper"
              data-speed="1"
              data-lag="0.2">
              <div className="wc-btn-secondary btn-hover btn-item">
                <span></span>수상작 연도별 <br />
                리스트업 <i className="fa-solid fa-arrow-right"></i>
              </div>
            </div>
          </div>
          <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent className="max-w-[90%] sm:max-w-[70%]">
              <DialogHeader>
                <DialogTitle>수상작 연도별 리스트업</DialogTitle>
              </DialogHeader>
              <div className="w-full">
                <div className="service__table-2">
                  <ScrollArea className="h-[70vh] relative">
                    <table className="service__table-2-head fade_bottom_3">
                      <thead>
                        <tr>
                          <th>회차</th>
                          <th className="text-center">수상내역</th>
                          <th className="text-center">작가</th>
                          <th>작품명</th>
                          <th>방영실적</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td rowSpan={2}>1회</td>
                          <td className="text-center">대상</td>
                          <td className="text-center">설경은</td>
                          <td className="text-center">용가리통뼈</td>
                          <td className="text-center">
                            - SBS 일일드라마 &apos;두여자의방&apos;(2012) <br />
                            - MBC 주말드라마 &apos;숨바꼭질&apos;(2018)
                          </td>
                        </tr>
                        <tr>
                          <td className="text-center">우수상</td>
                          <td className="text-center">강태성</td>
                          <td className="text-center">청운</td>
                          <td className="text-center">
                            - tvN 미니시리즈 &apos;신분을 숨겨라&apos;(2015){" "}
                            <br />- JTBC 미니시리즈 &apos;스케치&apos;(2018)
                          </td>
                        </tr>
                        <tr>
                          <td rowSpan={2}>2회</td>
                          <td className="text-center">대상</td>
                          <td className="text-center">이희숙</td>
                          <td className="text-center">워커홀릭</td>
                          <td className="text-center"></td>
                        </tr>
                        <tr>
                          <td className="text-center">우수상</td>
                          <td className="text-center">성진미</td>
                          <td className="text-center">제3의 병원</td>
                          <td className="text-center">
                            - tvN 미니시리즈 &apos;제3의 병원&apos; 수상작
                            제작방영(2013)
                          </td>
                        </tr>
                        <tr>
                          <td rowSpan={3}>3회</td>
                          <td className="text-center">우수상</td>
                          <td className="text-center">황여름</td>
                          <td className="text-center">기프트</td>
                          <td className="text-center">
                            - MBN 시트콤 &apos;왔어왔어, 제대로 왔어&apos;(2012)
                          </td>
                        </tr>
                        <tr>
                          <td className="text-center">우수상</td>
                          <td className="text-center">하명희</td>
                          <td className="text-center">여깡패 혜정</td>
                          <td className="text-center">
                            - Jtbc 미니시리즈 &apos;우리 결혼할 수
                            있을까&apos;(2012) <br />- SBS 미니시리즈
                            &apos;따뜻한 말 한마디&apos;(2014) <br />
                            - SBS 미니시리즈 &apos;상류사회&apos;(2015) <br />
                            - SBS 미니시리즈 &apos;닥터스&apos;
                            수상작&apos;여깡패혜정&apos; 제작방영(2016) <br />-
                            SBS 미니시리즈 &apos;사랑의 온도&apos;(2017) <br />
                            - tvN 미니시리즈 &apos;청춘기록&apos;(2020) <br />-
                            KBS 주말드라마 &apos;현재는 아름다워&apos;(2022){" "}
                            <br />
                          </td>
                        </tr>
                        <tr>
                          <td className="text-center">우수상</td>
                          <td className="text-center">남선혜</td>
                          <td className="text-center">디바디바</td>
                          <td className="text-center">
                            - 한중합작드라마 &apos;오로라를 찾아서&apos;
                          </td>
                        </tr>
                        <tr>
                          <td rowSpan={3}>4회</td>
                          <td className="text-center">대상</td>
                          <td className="text-center">박가연</td>
                          <td className="text-center">필도춘몽</td>
                          <td className="text-center">
                            - OCN &apos;애간장&apos;(2018) <br />- OCN
                            &apos;트레인&apos;(2020)
                          </td>
                        </tr>
                        <tr>
                          <td className="text-center">우수상</td>
                          <td className="text-center">이수현</td>
                          <td className="text-center">심안형사</td>
                          <td className="text-center"> </td>
                        </tr>
                        <tr>
                          <td className="text-center">SBS플러스상</td>
                          <td className="text-center">유승연 외</td>
                          <td className="text-center">에드워드 국 순식</td>
                          <td className="text-center"> </td>
                        </tr>
                        <tr>
                          <td rowSpan={3}>5회</td>
                          <td className="text-center">우수상</td>
                          <td className="text-center">노은주</td>
                          <td className="text-center">그 하늘에 태양</td>
                          <td className="text-center"></td>
                        </tr>
                        <tr>
                          <td className="text-center">우수상</td>
                          <td className="text-center">조은숙</td>
                          <td className="text-center">죽기 살기로, 연애</td>
                          <td className="text-center"> </td>
                        </tr>
                        <tr>
                          <td className="text-center">SBS플러스상</td>
                          <td className="text-center">임상춘</td>
                          <td className="text-center">삼춘기</td>
                          <td className="text-center">
                            - SBS플러스 웹드라마 &apos;도도하라&apos;(2014){" "}
                            <br />
                            - MBC 단막극 &apos;내 인생의 혹&apos;(2014) <br />-
                            KBS 단만극 &apos;백희가 돌아왔다&apos;(2016) <br />-
                            KBS 월화드라마 &apos;쌈, 마이웨이&apos;(2017) <br />
                            - KBS 월화드라마 &apos;동백꽃 필 무렵&apos;(2019)
                          </td>
                        </tr>
                        <tr>
                          <td rowSpan={3}>6회</td>
                          <td className="text-center">우수상</td>
                          <td className="text-center">강선우</td>
                          <td className="text-center">열녀 명은전</td>
                          <td className="text-center"></td>
                        </tr>
                        <tr>
                          <td className="text-center">우수상</td>
                          <td className="text-center">김필진</td>
                          <td className="text-center">ROOT</td>
                          <td className="text-center"> </td>
                        </tr>
                        <tr>
                          <td className="text-center">SBS플러스상</td>
                          <td className="text-center">김화정</td>
                          <td className="text-center">연애킹</td>
                          <td className="text-center"> </td>
                        </tr>
                        <tr>
                          <td rowSpan={3}>7회</td>
                          <td className="text-center">대상</td>
                          <td className="text-center">안재훈</td>
                          <td className="text-center">운명</td>
                          <td className="text-center"></td>
                        </tr>
                        <tr>
                          <td className="text-center">우수상</td>
                          <td className="text-center">오지영</td>
                          <td className="text-center">쇼핑왕 루이</td>
                          <td className="text-center">
                            - MBC 미니시리즈 &apos;쇼핑왕 루이&apos; 수상작
                            제작방영(2016) <br />- MBC 미니시리즈 &apos;내 뒤에
                            테리우스&apos;(2018) <br />- KBS 미니시리즈
                            &apos;도도솔솔라라솔&apos;(2020)
                          </td>
                        </tr>
                        <tr>
                          <td className="text-center">SBS플러스상</td>
                          <td className="text-center">안호경</td>
                          <td className="text-center">지독한 행운</td>
                          <td className="text-center">
                            - 채널A 미니시리즈 &apos;터치&apos;(2020)
                          </td>
                        </tr>
                        <tr>
                          <td rowSpan={3}>8회</td>
                          <td className="text-center">대상</td>
                          <td className="text-center">최민서,정동윤</td>
                          <td className="text-center">체크메이트 </td>
                          <td className="text-center"></td>
                        </tr>
                        <tr>
                          <td className="text-center">우수상</td>
                          <td className="text-center">이미희</td>
                          <td className="text-center">사라진 증거</td>
                          <td className="text-center"> </td>
                        </tr>
                        <tr>
                          <td className="text-center">SBS플러스상</td>
                          <td className="text-center">문정민</td>
                          <td className="text-center"></td>
                          <td className="text-center">도너, 들 </td>
                        </tr>
                        <tr>
                          <td rowSpan={5}>9회</td>
                          <td className="text-center">대상</td>
                          <td className="text-center">최수미</td>
                          <td className="text-center">간택사냥</td>
                          <td className="text-center">
                            - TV조선 특별기획드라마 &apos;간택:여인들의
                            전쟁&apos; 수상작 제작방영(2019)
                          </td>
                        </tr>
                        <tr>
                          <td className="text-center">우수상</td>
                          <td className="text-center">백은경</td>
                          <td className="text-center">독신자 육바</td>
                          <td className="text-center"> </td>
                        </tr>
                        <tr>
                          <td className="text-center">SBS플러스상</td>
                          <td className="text-center">최민호</td>
                          <td className="text-center">셰프캅</td>
                          <td className="text-center"> </td>
                        </tr>
                        <tr>
                          <td className="text-center">대상(웹드라마)</td>
                          <td className="text-center">남궁원</td>
                          <td className="text-center">떴다, 그녀!</td>
                          <td className="text-center"></td>
                        </tr>
                        <tr>
                          <td className="text-center">우수상 (웹드라마)</td>
                          <td className="text-center">조유미</td>
                          <td className="text-center">데스페라도</td>
                          <td className="text-center"> </td>
                        </tr>
                        <tr>
                          <td rowSpan={4}>10회</td>
                          <td className="text-center">대상</td>
                          <td className="text-center">문현경</td>
                          <td className="text-center">출사표</td>
                          <td className="text-center">
                            - KBS 미니시리즈 &apos;출사표&apos; 수상작
                            제작방영(2020)
                          </td>
                        </tr>
                        <tr>
                          <td className="text-center">우수상</td>
                          <td className="text-center">이주연</td>
                          <td className="text-center">하이에나</td>
                          <td className="text-center"> </td>
                        </tr>
                        <tr>
                          <td className="text-center">SBS플러스상</td>
                          <td className="text-center">김가은</td>
                          <td className="text-center">사랑이라말해요</td>
                          <td className="text-center">
                            - 디즈니+ &apos;사랑이라말해요&apos; 수상작 제작방영
                            (2023)
                          </td>
                        </tr>
                        <tr>
                          <td className="text-center">장려상</td>
                          <td className="text-center">김정미</td>
                          <td className="text-center">규수탐정 장계향</td>
                          <td className="text-center"></td>
                        </tr>
                        <tr>
                          <td rowSpan={3}>11회</td>
                          <td className="text-center">우수상</td>
                          <td className="text-center">김자현</td>
                          <td className="text-center">
                            북촌 반선비의 출세가도
                          </td>
                          <td className="text-center">
                            - SBS 월화드라마 &apos;꽃선비 열애사&apos; (2023)
                          </td>
                        </tr>
                        <tr>
                          <td className="text-center">SBS미디어넷상</td>
                          <td className="text-center">성소현</td>
                          <td className="text-center">굿 보이</td>
                          <td className="text-center"> </td>
                        </tr>
                        <tr>
                          <td className="text-center">메가몬스터상</td>
                          <td className="text-center">장영선</td>
                          <td className="text-center">마인드 헌터</td>
                          <td className="text-center"> </td>
                        </tr>
                        <tr>
                          <td rowSpan={5}>12회</td>
                          <td className="text-center">대상</td>
                          <td className="text-center">백선희</td>
                          <td className="text-center">해피엔드</td>
                          <td className="text-center">
                            - TV조선 미니시리즈 &apos;나의 해피엔드&apos; 수상작
                            제작방영 (2023)
                          </td>
                        </tr>
                        <tr>
                          <td className="text-center">우수상</td>
                          <td className="text-center">조창신</td>
                          <td className="text-center">포도</td>
                          <td className="text-center"> </td>
                        </tr>
                        <tr>
                          <td className="text-center">우수상</td>
                          <td className="text-center">장치선</td>
                          <td className="text-center">닥터스캔들</td>
                          <td className="text-center"> </td>
                        </tr>
                        <tr>
                          <td className="text-center">SBS미디어넷상</td>
                          <td className="text-center">홍진희</td>
                          <td className="text-center">야누스들</td>
                          <td className="text-center"></td>
                        </tr>
                        <tr>
                          <td className="text-center">메가몬스터상</td>
                          <td className="text-center">임보라</td>
                          <td className="text-center">은혜로운 그대</td>
                          <td className="text-center"> </td>
                        </tr>
                        <tr>
                          <td rowSpan={4}>13회</td>
                          <td className="text-center">우수상</td>
                          <td className="text-center">임유진,하나</td>
                          <td className="text-center">해가 지고 달이 뜨면</td>
                          <td className="text-center"> </td>
                        </tr>
                        <tr>
                          <td className="text-center">우수상</td>
                          <td className="text-center">성주현</td>
                          <td className="text-center">헝그리 파이터</td>
                          <td className="text-center"> </td>
                        </tr>
                        <tr>
                          <td className="text-center">SBS미디어넷상</td>
                          <td className="text-center">정려주</td>
                          <td className="text-center">디케</td>
                          <td className="text-center"></td>
                        </tr>
                        <tr>
                          <td className="text-center">메가몬스터상</td>
                          <td className="text-center">김형석</td>
                          <td className="text-center">마더스</td>
                          <td className="text-center"></td>
                        </tr>
                        <tr>
                          <td rowSpan={5}>14회</td>
                          <td className="text-center">우수상</td>
                          <td className="text-center">정미현</td>
                          <td className="text-center">반유진에게</td>
                          <td className="text-center"></td>
                        </tr>
                        <tr>
                          <td className="text-center">우수상</td>
                          <td className="text-center">한연화</td>
                          <td className="text-center">마법처럼 악몽처럼</td>
                          <td className="text-center"> </td>
                        </tr>
                        <tr>
                          <td className="text-center">우수상</td>
                          <td className="text-center">조하나</td>
                          <td className="text-center">뜨겁게 복수하마</td>
                          <td className="text-center"> </td>
                        </tr>
                        <tr>
                          <td className="text-center">SBS미디어넷상</td>
                          <td className="text-center">김아름</td>
                          <td className="text-center">기브 어 찬스</td>
                          <td className="text-center"></td>
                        </tr>
                        <tr>
                          <td className="text-center">메가몬스터상</td>
                          <td className="text-center">이효진</td>
                          <td className="text-center">적대적</td>
                          <td className="text-center"> </td>
                        </tr>
                      </tbody>
                    </table>
                  </ScrollArea>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </>
  );
};

export default Gallery1;
