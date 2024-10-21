"use client";
import "/public/assets/scss/master.scss";
import { isMobile } from "@/lib/utils";
import Image from "next/image";
import ArrowDown from "/public/assets/imgs/icon/arrows-down.png";
import ArrowRight from "/public/assets/imgs/icon/arrows-right.png";
import ArrowDownDark from "/public/assets/imgs/icon/arrows-down-dark.png";
import ArrowRightDark from "/public/assets/imgs/icon/arrows-right-dark.png";
import { useParams } from "next/navigation";

const CommunityView = () => {
  const params = useParams();
  const locale = params?.locale;

  return (
    <>
      {locale == "ko" ? (
        <div className="lg:flex items-center justify-between pt-12 md:pb-12">
          <div className="w-full lg:w-1/2 lg:pr-24">
            <div className="sec-title-wrapper">
              <h2 className="sec-title title-anim">‘방방곳곡:지역이-음’</h2>
              <p className="animate-slideup opacity-0">
                지역사회 소상공인의 이야기와 가치 있는 지역 콘텐츠를 발굴하여
                지역경제를 활성화하고, 지역의 이야기가 확산될 수 있도록 지원하는
                콘텐츠 중심의 크리에이터 제작지원 사업입니다
              </p>
              <h3 className="sec-title title-anim">지원대상</h3>
              <ul className="mt-2 pl-6 animate-slideup opacity-0">
                <li style={{ listStyleType: "disc" }}>
                  플랫폼 채널을 꾸준히 운영하는 대한민국 국적의 크리에이터 (개인
                  또는 팀)
                </li>
              </ul>
              <h3 className="sec-title title-anim mt-12">지원내용 </h3>
              <ul className="mt-2 pl-6 animate-slideup opacity-0">
                <li style={{ listStyleType: "disc" }}>
                  팀별 콘텐츠 3편씩 제작지원 (400만원)
                </li>
                <li style={{ listStyleType: "disc" }}>
                  전문가 온·오프라인 콘텐츠 코칭
                </li>
                <li style={{ listStyleType: "disc" }}>
                  우수콘텐츠 3편 선정(총 1,800만원)
                </li>
              </ul>
            </div>
          </div>
          <div className="lg:w-1/2">
            <ul className="career__benefits-list justify-end animate-slideup opacity-0">
              <li>
                콘텐츠 기획(안) <br />
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
                선발심사 <br /> <br />
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
                텐츠 제작지원 <br /> 및 콘텐츠 <br /> 온·오프라인 코칭
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
              <li>
                제작지원작 <br /> 중 우수콘텐츠 선정
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="lg:flex items-center justify-between pt-12 md:pb-12">
          <div className="w-full lg:w-1/2 lg:pr-24">
            <div className="sec-title-wrapper">
              <h2 className="sec-title title-anim">
                ‘Bangbang-Gokgot:Local-Eum’
              </h2>
              <p className="animate-slideup opacity-0">
                Though discovering stories of local small business owners and
                valuable local content Revitalizing the local economy. and it is
                a content-oriented creator production supporting project that
                supports the spread of local stories
              </p>
              <h3 className="sec-title title-anim">Eligibility</h3>
              <ul className="mt-2 pl-6 animate-slideup opacity-0">
                <li style={{ listStyleType: "disc" }}>
                  Creators of Korean nationality who consistently manage a
                  platform channel (individuals or teams)
                </li>
              </ul>
              <h3 className="sec-title mt-12 animate-slideup opacity-0">
                Support Details
              </h3>
              <ul className="mt-2 pl-6 animate-slideup opacity-0">
                <li style={{ listStyleType: "disc" }}>
                  Support for the production of 3 pieces of content per team (4
                  million KRW)
                </li>
                <li style={{ listStyleType: "disc" }}>
                  Expert content coaching (online/offline)
                </li>
                <li style={{ listStyleType: "disc" }}>
                  Selection of 3 outstanding pieces of content (total prize: 18
                  million KRW)
                </li>
              </ul>
            </div>
          </div>
          <div className="lg:w-1/2">
            <ul className="career__benefits-list justify-end animate-slideup opacity-0">
              <li>
                Submission of
                <br />
                Content Plans
                <br />
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
                Selection
                <br />
                Process
                <br />
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
                Content Production Support <br /> and Coaching <br />{" "}
                (Online/Offline)
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
              <li>
                Selection of Outstanding Content <br /> from Supported
                Productions
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default CommunityView;
