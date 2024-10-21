"use client";
import { gsap } from "gsap";
import Image from "next/image";
import { useRef } from "react";
import ArrowDown from "../../../../public/assets/imgs/icon/arrows-down.png";
import ArrowLeft from "../../../../public/assets/imgs/icon/arrows-left.png";
import ArrowRight from "../../../../public/assets/imgs/icon/arrows-right.png";
import Scale from "../../../../public/assets/imgs/icon/balance.png";
import Bank from "../../../../public/assets/imgs/icon/bank.png";
import Contract from "../../../../public/assets/imgs/icon/contract.png";
import Speak from "../../../../public/assets/imgs/icon/speak.png";
import Video from "../../../../public/assets/imgs/icon/video.png";
import { ScrollTrigger } from "./plugins";

gsap.registerPlugin(ScrollTrigger);

const CommonCMS = () => {
  const serviceList = useRef();

  return (
    <>
      <section className="service__area-3 pb-150 pt-150">
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="sec-title-wrapper">
                <h2 className="sec-title title-anim">사업목적</h2>
                <li>
                  <p className="text-anim">
                    공공성, 대중성을 겸한 지역특화 콘텐츠를 제작 지원하여 우수한
                    지역 콘텐츠를 발굴·시상하고 지역균형 발전에 기여
                  </p>
                </li>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xx-12">
              <div className="service__list-3" ref={serviceList}>
                <div className="sec-title-wrapper">
                  <h2 className="sec-title-2 title-anim">사업개요</h2>
                  <li>
                    <p className="text-anim">
                      미디어미래연구소와 공동사업으로 진행 (2010~2013년 계간지
                      발행)
                    </p>
                  </li>
                </div>

                <div className="service__item-3 service_animation">
                  <p className="text-anim">01 지원대상</p>
                  <div className="service__content-table w-full mt-4">
                    <p className="text-anim">
                      채널을 꾸준히 운영 중인 크리에이터 (개인 또는 팀)
                    </p>
                    <ul className="w-full">
                      <div className="service__item-table service_animation">
                        <h3 className="tm-name">지원방법</h3>
                        <h3 className="tm-role">제출내용</h3>
                      </div>

                      <div className="service__item-table service_animation">
                        <p className="tm-name">개인 신청</p>
                        <p className="tm-role">
                          신청서(온라인 작성) <br /> 방송기획서 및 3개월이내
                          방송한 베스트 영상 3개 접수
                        </p>
                      </div>

                      <div className="service__item-table service_animation">
                        <p className="tm-name">
                          * 전년도 수상자는 참여할 수 없음. <br /> *
                          방송통신위원회 등 관련 기관의 방송심의 경고 및 방송
                          제재를 받은 자.
                        </p>
                      </div>
                    </ul>
                  </div>
                </div>

                <div className="service__item-3 service_animation">
                  <h3 className="text-anim">02 시상내역</h3>
                  <div className="service__content-table w-full pt-0">
                    <ul className="w-full">
                      <div className="service__item-table service_animation">
                        <h3 className="tm-name">시상내역</h3>
                        <h3 className="tm-role">상금</h3>
                        <h3 className="text-right">비고</h3>
                      </div>

                      <div className="service__item-table service_animation">
                        <p className="tm-name">대상</p>
                        <p className="tm-role">5,000,000</p>
                        <p className="text-right">방송통신위원장상</p>
                      </div>

                      <div className="service__item-table service_animation">
                        <p className="tm-name">기획상</p>
                        <p className="tm-role">3,000,000</p>
                        <p className="text-right">100,000</p>
                      </div>

                      <div className="service__item-table service_animation">
                        <p className="tm-name">제작상</p>
                        <p className="tm-role">3,000,000</p>
                        <p className="text-right">800,000</p>
                      </div>

                      <div className="service__item-table service_animation">
                        <p className="tm-name">특별상</p>
                        <p className="tm-role">2,000,000</p>
                        <p className="text-right">50,000</p>
                      </div>

                      <div className="service__item-table service_animation">
                        <p className="tm-name">
                          * 적합한 콘텐츠가 없는 경우 선정하지 않을 수 있습니다.
                        </p>
                      </div>
                    </ul>
                  </div>
                </div>

                <div className="service__item-3 service_animation">
                  <p className="text-anim">03 지원내용</p>
                  <div className="service__content-table w-full">
                    <ul className="w-full">
                      <li>
                        + 공공성, 대중성을 겸한 지역특화 콘텐츠 14편 제작지원
                      </li>
                      <li>+ 우수콘텐츠 4편 시상</li>
                    </ul>
                  </div>
                </div>

                <div className="service__item-3 service_animation">
                  <p className="text-anim">04 지원절차</p>
                  <div>
                    <div className="service__item-card-wrapper">
                      <div className="service__item-table-card">
                        <Image
                          style={{ width: "40px", height: "40px" }}
                          src={Scale}
                          alt="Video Image"
                        />
                        <p className="text-anim">
                          기획안 <br /> 심사
                        </p>
                      </div>
                      <Image
                        style={{ width: "24px", height: "24px" }}
                        src={ArrowRight}
                        alt="Arrow Right"
                      />
                      <div className="service__item-table-card">
                        <Image
                          style={{ width: "40px", height: "40px" }}
                          src={Contract}
                          alt="Contract Image"
                        />
                        <p className="text-anim">협 약체결</p>
                      </div>
                      <Image
                        style={{ width: "24px", height: "24px" }}
                        src={ArrowRight}
                        alt="Arrow Right"
                      />
                      <div className="service__item-table-card">
                        <Image
                          style={{ width: "40px", height: "40px" }}
                          src={Bank}
                          alt="Bank Image"
                        />
                        <p className="text-anim">
                          1차 <br /> 지원금지급
                        </p>
                      </div>
                      <Image
                        style={{ width: "24px", height: "24px" }}
                        src={ArrowRight}
                        alt="Arrow Right"
                      />
                      <div className="service__item-table-card">
                        <Image
                          style={{ width: "40px", height: "40px" }}
                          src={Speak}
                          alt="Speak Image"
                        />
                        <p className="text-anim">
                          콘텐츠 제작 및 <br /> 코칭프로그램 운영
                        </p>
                      </div>
                      <Image
                        style={{ width: "24px", height: "24px" }}
                        src={ArrowRight}
                        alt="Arrow Right"
                      />
                      <div className="service__item-table-card">
                        <Image
                          style={{ width: "40px", height: "40px" }}
                          src={Scale}
                          alt="Video Image"
                        />
                        <p className="text-anim">
                          우수 콘텐츠 <br /> 심사
                        </p>
                      </div>
                    </div>
                    <div className="w-full flex gap-3 items-center justify-end">
                      <Image
                        style={{
                          width: "24px",
                          height: "24px",
                          marginRight: "48px",
                          marginTop: "12px",
                        }}
                        src={ArrowDown}
                        alt="Arrow Right"
                      />
                    </div>
                    <div className="w-full flex gap-3 items-center justify-end">
                      <div className="flex flex-col bg-stone-200 p-5 w-fit justify-center align-center">
                        <Image
                          style={{ width: "40px", height: "40px" }}
                          src={Scale}
                          alt="Video Image"
                        />
                        <p className="text-anim">
                          기획안 <br /> 심사
                        </p>
                      </div>
                      <Image
                        style={{ width: "24px", height: "24px" }}
                        src={ArrowLeft}
                        alt="Arrow Left"
                      />
                      <div className="service__item-table-card">
                        <Image
                          style={{ width: "40px", height: "40px" }}
                          src={Bank}
                          alt="Bank Image"
                        />
                        <p className="text-anim">
                          2차 지원금 <br /> 지급
                        </p>
                      </div>
                      <Image
                        style={{ width: "24px", height: "24px" }}
                        src={ArrowLeft}
                        alt="Arrow Left"
                      />
                      <div className="service__item-table-card">
                        <Image
                          style={{ width: "40px", height: "40px" }}
                          src={Video}
                          alt="Video Image"
                        />
                        <p className="text-anim">
                          우수콘텐츠 시상 <br /> 및 시사회
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="service3__img-wrap">
                  <div className="service3__img"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CommonCMS;
