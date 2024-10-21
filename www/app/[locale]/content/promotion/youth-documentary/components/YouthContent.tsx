"use client";
import React, { useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { useRef } from "react";
import ArrowDown from "/public/assets/imgs/icon/arrows-down.png";
import ArrowLeft from "/public/assets/imgs/icon/arrows-left.png";
import ArrowRight from "/public/assets/imgs/icon/arrows-right.png";
import ArrowDownDark from "/public/assets/imgs/icon/arrows-down-dark.png";
import ArrowLeftDark from "/public/assets/imgs/icon/arrows-left-dark.png";
import ArrowRightDark from "/public/assets/imgs/icon/arrows-right-dark.png";
import { ScrollTrigger } from "../../../../(routes)/components/plugins";
import * as Tabs from "@radix-ui/react-tabs";
import YouthThird from "./YouthThird";
import { isMobile } from "@/lib/utils";
import { youthData1, youthData2, youthData3 } from "./YouthStaticData";
import Link from "next/link";
import TableData from "./TableData";
import { useParams } from "next/navigation";
import TableDataEn from "./TableDataEn";

gsap.registerPlugin(ScrollTrigger);
const YouthContent = () => {
  const serviceList = useRef();
  const [showModal, setShowModal] = useState(false);
  const [showModalEn, setShowModalEn] = useState(false);
  const params = useParams();
  const locale = params?.locale;

  return (
    <>
      <section className="service__area-3 pb-150">
        <div className="container">
          {locale == "ko" ? (
            <>
              <div className="lg:flex items-center justify-between pt-12">
                <div className="w-full lg:w-1/2 lg:pr-24">
                  <div className="sec-title-wrapper">
                    <h2 className="sec-title title-anim">‘첫 단추 프로젝트’</h2>
                    <p className="animate-slideup opacity-0">
                      기획 초기 단계에 있는 청년 다큐멘터리감독의 작품 제작
                      실현이 가능하도록 ‘첫 단추’ 를 지원하는{" "}
                      <strong>트레일러 제작지원</strong>으로 다큐멘터리 역량
                      강화 <strong>워크숍</strong>, 대한민국 대표 다큐멘터리
                      감독의 <strong>개별 멘토링, </strong>
                      국제다큐멘터리영화제 출품 지원 등{" "}
                      <strong>
                        새로운 시선과 실험, 영상 문법의 스토리텔러인 청년
                        다큐멘터리필름메이커를 양성
                      </strong>
                      하고 있습니다
                    </p>
                    <h3 className="sec-title title-anim">지원내용</h3>
                    <ul className="mt-2 pl-6 animate-slideup opacity-0">
                      <li style={{ listStyleType: "disc" }}>
                        트레일러 제작지원 (편당 5백만원)
                      </li>
                      <li style={{ listStyleType: "disc" }}>
                        트레일러 Pitching Day 피칭심사를 통한 최우수 작품 선정
                        <br />
                        (다큐멘터리 제작지원비 지급)
                      </li>
                      <li style={{ listStyleType: "disc" }}>
                        Docs 역량 강화 워크숍, 개별 멘토링, 국제다큐멘터리
                        영화제 출품 지원 등
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="lg:w-1/2">
                  <ul className="career__benefits-list animate-slideup opacity-0">
                    <li>
                      기획안 <br />
                      접수
                      <Image
                        style={{ width: "24px", height: "24px" }}
                        src={isMobile() ? ArrowDownDark : ArrowRightDark}
                        alt="Arrow Right"
                        className="lg:w-1/2 hidden dark:block"
                      />
                      <Image
                        style={{ width: "24px", height: "24px" }}
                        src={isMobile() ? ArrowDown : ArrowRight}
                        alt="Arrow Right"
                        className="dark:hidden"
                      />
                    </li>
                    <li>
                      선발심사 <br /> <br />
                      <Image
                        style={{ width: "24px", height: "24px" }}
                        src={isMobile() ? ArrowDownDark : ArrowRightDark}
                        alt="Arrow Right"
                        className="lg:w-1/2 hidden dark:block"
                      />
                      <Image
                        style={{ width: "24px", height: "24px" }}
                        src={isMobile() ? ArrowDown : ArrowRight}
                        alt="Arrow Right"
                        className="dark:hidden"
                      />
                    </li>
                    <li>
                      트레일러 <br />
                      제작지원
                      <Image
                        style={{ width: "24px", height: "24px" }}
                        src={ArrowDownDark}
                        alt="Arrow Right"
                        className="lg:w-1/2 hidden dark:block"
                      />
                      <Image
                        style={{ width: "24px", height: "24px" }}
                        src={ArrowDown}
                        alt="Arrow Right"
                        className="dark:hidden"
                      />
                    </li>
                    {isMobile() && (
                      <li>
                        Docs Camp <br /> 워크숍, <br /> 개별 멘토링
                        <Image
                          style={{ width: "24px", height: "24px" }}
                          src={ArrowDownDark}
                          alt="Arrow Right"
                          className="lg:w-1/2 hidden dark:block"
                        />
                        <Image
                          style={{ width: "24px", height: "24px" }}
                          src={ArrowDown}
                          alt="Arrow Right"
                          className="dark:hidden"
                        />
                      </li>
                    )}
                    <li>
                      트레일러 <br />
                      Pitching Day
                    </li>
                    {!isMobile() && (
                      <li>
                        Docs Camp <br /> 워크숍, <br /> 개별 멘토링
                        <Image
                          style={{ width: "24px", height: "24px" }}
                          src={ArrowLeftDark}
                          alt="Arrow Right"
                          className="lg:w-1/2 hidden dark:block"
                        />
                        <Image
                          style={{ width: "24px", height: "24px" }}
                          src={ArrowLeft}
                          alt="Arrow Right"
                          className="dark:hidden"
                        />
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <div
                className="portfolio__btn btn_wrapper cursor-pointer mb-24"
                onClick={() => setShowModal(true)}
                data-speed="1"
                data-lag="0.2">
                <div className="wc-btn-pink btn-hover btn-item">
                  <span></span>연도별 <br /> 제작지원자 <br />
                  성과 <i className="fa-solid fa-arrow-right"></i>
                </div>
              </div>
              <TableData showModal={showModal} setShowModal={setShowModal} />
            </>
          ) : (
            <>
              <div className="lg:flex items-center justify-between pt-12">
                <div className="w-full lg:w-1/2 lg:pr-24">
                  <div className="sec-title-wrapper">
                    <h2 className="sec-title title-anim">
                      ‘First Step Project’
                    </h2>
                    <p className="animate-slideup opacity-0">
                      We provide ‘first step‘ trailer production support to help
                      young documentary filmmakers in the early stages of
                      planning bring their projects to life. Through documentary{" "}
                      <strong>
                        capacity-building workshops, individual mentoring from
                        leading Korean documentary directors, and support for
                        submissions to international documentary film festivals,
                      </strong>
                      we are fostering young filmmakers who bring{" "}
                      <strong>
                        fresh perspectives, experimentation, and innovative
                        storytelling techniques
                      </strong>{" "}
                      to documentary filmmaking
                    </p>
                    <h3 className="sec-title title-anim">Support Details</h3>
                    <ul className="mt-2 pl-6 animate-slideup opacity-0">
                      <li style={{ listStyleType: "disc" }}>
                        Trailer production support (5 million KRW per trailer)
                      </li>
                      <li style={{ listStyleType: "disc" }}>
                        Best work selected through pitching evaluation on
                        Trailer Pitching Day (documentary production support
                        fund awarded)
                      </li>
                      <li style={{ listStyleType: "disc" }}>
                        Support for Docs workshops, individual mentoring, and
                        submissions to international documentary film festivals
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="lg:w-1/2">
                  <ul className="career__benefits-list animate-slideup opacity-0">
                    <li>
                      Proposal <br />
                      Submission
                      <Image
                        style={{ width: "24px", height: "24px" }}
                        src={isMobile() ? ArrowDownDark : ArrowRightDark}
                        alt="Arrow Right"
                        className="lg:w-1/2 hidden dark:block"
                      />
                      <Image
                        style={{ width: "24px", height: "24px" }}
                        src={isMobile() ? ArrowDown : ArrowRight}
                        alt="Arrow Right"
                        className="dark:hidden"
                      />
                    </li>
                    <li>
                      Selection <br />
                      Screening
                      <Image
                        style={{ width: "24px", height: "24px" }}
                        src={isMobile() ? ArrowDownDark : ArrowRightDark}
                        alt="Arrow Right"
                        className="lg:w-1/2 hidden dark:block"
                      />
                      <Image
                        style={{ width: "24px", height: "24px" }}
                        src={isMobile() ? ArrowDown : ArrowRight}
                        alt="Arrow Right"
                        className="dark:hidden"
                      />
                    </li>
                    <li>
                      Trailer Production <br />
                      Support
                      <Image
                        style={{ width: "24px", height: "24px" }}
                        src={ArrowDownDark}
                        alt="Arrow Right"
                        className="lg:w-1/2 hidden dark:block"
                      />
                      <Image
                        style={{ width: "24px", height: "24px" }}
                        src={ArrowDown}
                        alt="Arrow Right"
                        className="dark:hidden"
                      />
                    </li>
                    {isMobile() && (
                      <li>
                        Docs Camp <br /> Workshop and <br /> Individual
                        Mentoring
                        <Image
                          style={{ width: "24px", height: "24px" }}
                          src={ArrowDownDark}
                          alt="Arrow Right"
                          className="lg:w-1/2 hidden dark:block"
                        />
                        <Image
                          style={{ width: "24px", height: "24px" }}
                          src={ArrowDown}
                          alt="Arrow Right"
                          className="dark:hidden"
                        />
                      </li>
                    )}
                    <li>
                      Trailer <br />
                      Pitching Day
                    </li>
                    {!isMobile() && (
                      <li>
                        Docs Camp <br /> Workshop and <br /> Individual <br />{" "}
                        Mentoring
                        <Image
                          style={{ width: "24px", height: "24px" }}
                          src={ArrowLeftDark}
                          alt="Arrow Right"
                          className="lg:w-1/2 hidden dark:block"
                        />
                        <Image
                          style={{ width: "24px", height: "24px" }}
                          src={ArrowLeft}
                          alt="Arrow Right"
                          className="dark:hidden"
                        />
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <div
                className="portfolio__btn btn_wrapper cursor-pointer mb-24"
                onClick={() => setShowModalEn(true)}
                data-speed="1"
                data-lag="0.2">
                <div className="wc-btn-pink btn-hover btn-item">
                  <span></span>Previous <br /> Production <br /> Support <br />
                  Recipients <i className="fa-solid fa-arrow-right"></i>
                </div>
              </div>
              <TableDataEn
                showModal={showModalEn}
                setShowModal={setShowModalEn}
              />
            </>
          )}

          <Tabs.Root defaultValue="tab1">
            <Tabs.List
              aria-label="Manage your account"
              className="my-page__tab-wrapper sticky top-0 bg-white z-10">
              <Tabs.Trigger value="tab1" className="my-page__tab">
                제3회 제작지원작
              </Tabs.Trigger>
              <Tabs.Trigger value="tab2" className="my-page__tab">
                제2회 제작지원작
              </Tabs.Trigger>
              <Tabs.Trigger value="tab3" className="my-page__tab">
                제1회 제작지원작
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="tab1">
              <YouthThird youthData={youthData1} />
            </Tabs.Content>
            <Tabs.Content value="tab2">
              <YouthThird youthData={youthData2} />
            </Tabs.Content>
            <Tabs.Content value="tab3">
              <YouthThird youthData={youthData3} />
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </section>
    </>
  );
};

export default YouthContent;
