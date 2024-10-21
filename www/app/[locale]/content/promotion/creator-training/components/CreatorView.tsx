"use client";
import "/public/assets/scss/master.scss";
import { isMobile } from "@/lib/utils";
import Image from "next/image";
import ArrowDown from "/public/assets/imgs/icon/arrows-down.png";
import ArrowLeft from "/public/assets/imgs/icon/arrows-left.png";
import ArrowRight from "/public/assets/imgs/icon/arrows-right.png";
import ArrowDownDark from "/public/assets/imgs/icon/arrows-down-dark.png";
import ArrowLeftDark from "/public/assets/imgs/icon/arrows-left-dark.png";
import ArrowRightDark from "/public/assets/imgs/icon/arrows-right-dark.png";
import { useParams } from "next/navigation";

const CreatorView = () => {
  const params = useParams();
  const locale = params?.locale;

  return (
    <>
      {locale == "ko" ? (
        <div className="lg:flex items-center justify-between pt-12 sm:pb-24">
          <div className="w-full lg:w-1/2 lg:pr-24">
            <div className="sec-title-wrapper">
              <h2 className="sec-title title-anim">‘1인방송스쿨’</h2>
              <p className="animate-slideup opacity-0">
                <strong>급변하는 미디어 생태계</strong> 속에서{" "}
                <strong>유튜브와 SNS</strong>를 통해 미디어의 한 축으로 자리
                잡은 <strong>1인 크리에이터 발굴하고 육성</strong>하기 위해
                채널개설부터 콘텐츠 기획, 촬영, 편집, 마케팅, 저작권, 라이브
                커머스 등 다양한 크리에이터 교육을 운영하고 있습니다
              </p>
              <h3 className="sec-title title-anim">지원대상</h3>
              <ul className="mt-2 pl-6">
                <li
                  style={{ listStyleType: "disc" }}
                  className="animate-slideup opacity-0">
                  1인 미디어에 관심 있는 누구나(만 19세 이상)
                </li>
              </ul>
              <h3 className="sec-title title-anim mt-12">지원내용 </h3>
              <ul className="mt-2 pl-6 animate-slideup opacity-0">
                <li style={{ listStyleType: "disc" }}>
                  1인 크리에이터 교육(대면/비대면)
                </li>
                <li style={{ listStyleType: "disc" }}>
                  전문 코치진의 콘텐츠 코칭
                </li>
                <li style={{ listStyleType: "disc" }}>
                  콘텐츠 제작을 위한 방송장비 현물지원(50만원)
                </li>
                <li style={{ listStyleType: "disc" }}>
                  교육 기간 내 우수교육생으로 선정 시, 향후 콘텐츠 창작비
                  지원(100만원)
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:w-1/2">
            <ul className="career__benefits-list animate-slideup opacity-0">
              <li>
                신청서 <br />
                접수
                <Image
                  style={{ width: "24px", height: "24px" }}
                  src={isMobile() ? ArrowDownDark : ArrowRightDark}
                  alt="Arrow Right"
                  className="hidden dark:block"
                />
                <Image
                  style={{ width: "24px", height: "24px" }}
                  src={isMobile() ? ArrowDown : ArrowRight}
                  alt="Arrow Right"
                  className="dark:hidden"
                />
              </li>
              <li>
                교육생 <br /> 대면심사
                <Image
                  style={{ width: "24px", height: "24px" }}
                  src={isMobile() ? ArrowDownDark : ArrowRightDark}
                  alt="Arrow Right"
                  className="hidden dark:block"
                />
                <Image
                  style={{ width: "24px", height: "24px" }}
                  src={isMobile() ? ArrowDown : ArrowRight}
                  alt="Arrow Right"
                  className="dark:hidden"
                />
              </li>
              <li>
                크리에이터 전문교육 <br /> 및 전문가 코칭
                <Image
                  style={{ width: "24px", height: "24px" }}
                  src={ArrowDownDark}
                  alt="Arrow Right"
                  className="hidden dark:block"
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
                  교육수료 <br /> <br />
                  <Image
                    style={{ width: "24px", height: "24px" }}
                    src={ArrowDownDark}
                    alt="Arrow Right"
                    className="hidden dark:block"
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
                수상작 <br />
                발표
              </li>
              {!isMobile() && (
                <li>
                  최종심 <br /> <br />
                  <Image
                    style={{ width: "24px", height: "24px" }}
                    src={ArrowLeftDark}
                    alt="Arrow Right"
                    className="hidden dark:block"
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
      ) : (
        <div className="lg:flex items-center justify-between pt-12 sm:pb-24">
          <div className="w-full lg:w-1/2 lg:pr-24">
            <div className="sec-title-wrapper">
              <h2 className="sec-title title-anim">
                ‘Individual Broadcasting School’
              </h2>
              <p className="animate-slideup opacity-0">
                <strong>
                  In a rapidly changing media ecosystem, to discover and nurture
                  individual creators who have become a pillar of the media
                  through YouTube and SNS
                </strong>
                , training on channel opening, content planning, filming,
                editing, marketing, copyright, live commerce etc.
              </p>
              <h3 className="sec-title title-anim">Eligibility</h3>
              <ul className="mt-2 pl-6">
                <li
                  style={{ listStyleType: "disc" }}
                  className="animate-slideup opacity-0">
                  Open to anyone 19 years or older with an interest in
                  individual media creation
                </li>
              </ul>
              <h3 className="sec-title title-anim mt-12">Support Details</h3>
              <ul className="mt-2 pl-6 animate-slideup opacity-0">
                <li style={{ listStyleType: "disc" }}>
                  Training for individual creators (in-person/online)
                </li>
                <li style={{ listStyleType: "disc" }}>
                  Content coaching from professional experts
                </li>
                <li style={{ listStyleType: "disc" }}>
                  In-kind support for broadcasting equipment to help with
                  content production (500,000 KRW)
                </li>
                <li style={{ listStyleType: "disc" }}>
                  Additional content creation funding (1,000,000 KRW) for
                  top-performing trainees during the program
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:w-1/2">
            <ul className="career__benefits-list animate-slideup opacity-0">
              <li>
                Application <br />
                Submission
                <Image
                  style={{ width: "24px", height: "24px" }}
                  src={isMobile() ? ArrowDownDark : ArrowRightDark}
                  alt="Arrow Right"
                  className="hidden dark:block"
                />
                <Image
                  style={{ width: "24px", height: "24px" }}
                  src={isMobile() ? ArrowDown : ArrowRight}
                  alt="Arrow Right"
                  className="dark:hidden"
                />
              </li>
              <li>
                In-person
                <br />
                Interview
                <br />
                with Trainees
                <Image
                  style={{ width: "24px", height: "24px" }}
                  src={isMobile() ? ArrowDownDark : ArrowRightDark}
                  alt="Arrow Right"
                  className="hidden dark:block"
                />
                <Image
                  style={{ width: "24px", height: "24px" }}
                  src={isMobile() ? ArrowDown : ArrowRight}
                  alt="Arrow Right"
                  className="dark:hidden"
                />
              </li>
              <li>
                Specialized
                <br />
                Creator
                <br />
                Training and
                <br />
                Expert Coaching
                <Image
                  style={{ width: "24px", height: "24px" }}
                  src={ArrowDownDark}
                  alt="Arrow Right"
                  className="hidden dark:block"
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
                  Completion of Training <br /> <br />
                  <Image
                    style={{ width: "24px", height: "24px" }}
                    src={ArrowDownDark}
                    alt="Arrow Right"
                    className="hidden dark:block"
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
                Announcement
                <br />
                of
                <br />
                Award-Winning
                <br />
                Works
              </li>
              {!isMobile() && (
                <li>
                  Final Review <br /> <br />
                  <Image
                    style={{ width: "24px", height: "24px" }}
                    src={ArrowLeftDark}
                    alt="Arrow Right"
                    className="hidden dark:block"
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
      )}
    </>
  );
};

export default CreatorView;
