"use client";
import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Feature41 from "/public/assets/imgs/feature/4/1.png";
import Feature42 from "/public/assets/imgs/feature/4/2.png";
import Feature43 from "/public/assets/imgs/feature/4/3.png";
import Image from "next/image";
import { useParams } from "next/navigation";

import "../homepage/bcpf.css";
const AboutIntro = () => {
  const params = useParams();
  const locale = params?.locale;

  return (
    <>
      <section className="broadcast__area-introduce">
        <div className="container line_4 containercc">
          <div className="md:flex">
            <div className="md:bg-white/50 md:w-1/2 md:pl-12 backdrop-blur-sm dark:bg-black/50">
              {locale == "ko" ? (
                <div className="feature__content-left">
                  <h2 className="sec-subtile-6">방송콘텐츠진흥재단 소개</h2>
                  <h3 className="sec-title-6 title-anim">
                    콘텐츠와세상을, <br /> 콘텐츠의 가치를 잇-다
                  </h3>
                </div>
              ) : (
                <div className="feature__content-left">
                  <h2 className="sec-subtile-6">About BCPF</h2>
                  <h3 className="sec-title-8 animate-slidein opacity-0">
                    Connecting Content
                    <br />
                    to the World and Bridging its Value
                  </h3>
                </div>
              )}
            </div>
            <div className="md:w-1/2">
              <div
                className={
                  locale == "ko"
                    ? "feature__content-right2 backdrop-blur-sm"
                    : "feature__content-right backdrop-blur-sm"
                }>
                <div>
                  <Image
                    priority
                    width={130}
                    height={97}
                    className="hidden md:block md:pb-8"
                    src={Feature41}
                    alt="Icon"
                  />
                  {locale == "ko" ? (
                    <p className="animate-slidein opacity-0">
                      방송콘텐츠진흥재단은 2007년 방송통신위원회의 설립허가를
                      <br />
                      받은 비영리공익재단으로{" "}
                      <span>
                        방송의 공익성 · 다양성 · 대중화를
                        <br />
                        위해 방송콘텐츠제작지원 · 1인크리에이터 육성 · 미디어
                        교육 ·<br />
                        국내외 조사연구사업
                      </span>{" "}
                      등 콘텐츠 기획자와 창작자들
                      <br />
                      (Planners and Creators)의 놀이터(Playground)이자
                      <br />
                      플랫폼(Platform)으로 우수한 방송콘텐츠를 발굴하여 세상과
                      <br />
                      이어주는 역할을 하고 있습니다
                    </p>
                  ) : (
                    <p className="animate-slidein opacity-0">
                      The Broadcasting Content Promotion Foundation is a
                      non-profit public foundation, established in 2007 with the
                      approval of the Korea Communications Commission.{" "}
                      <span>
                        To promote the public interest, diversity, and
                        popularization of broadcasting, it supports broadcasting
                        content production, nurtures independent creators,
                        provides media education, and conducts domestic and
                        international research projects.
                      </span>{" "}
                      It serves as a playground and platform for content
                      planners and creators, playing a vital role in discovering
                      excellent broadcasting content and connecting it with the
                      world
                    </p>
                  )}
                </div>

                <Image
                  priority
                  width={99}
                  height={131}
                  className="feature__img-2"
                  src={Feature42}
                  alt="Icon"
                />
                <Image
                  priority
                  width={38}
                  height={38}
                  className="feature__img-3"
                  src={Feature43}
                  alt="Icon"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutIntro;
