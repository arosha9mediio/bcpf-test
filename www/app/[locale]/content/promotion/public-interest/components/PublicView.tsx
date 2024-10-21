"use client";
import "/public/assets/scss/master.scss";
import { isMobile } from "@/lib/utils";
import Image from "next/image";
import ArrowDown from "/public/assets/imgs/icon/arrows-down.png";
import ArrowRight from "/public/assets/imgs/icon/arrows-right.png";
import ArrowDownDark from "/public/assets/imgs/icon/arrows-down-dark.png";
import ArrowRightDark from "/public/assets/imgs/icon/arrows-right-dark.png";
import { useParams } from "next/navigation";

const PublicView = () => {
  const params = useParams();
  const locale = params?.locale;

  return (
    <>
      {locale == "ko" ? (
        <div className="lg:flex items-center justify-between pt-12 md:pb-24">
          <div className="w-full lg:w-1/2 lg:pr-24">
            <div className="sec-title-wrapper">
              <h2 className="sec-title title-anim">‘공익 영상공모전’</h2>
              <p className="animate-slideup opacity-0">
                환경, 업사이클링, 안전 등 공익적인 주제의 다양한 아이디어
                영상공모전을 개최합니다
              </p>

              <h3 className="sec-title title-anim">공모대상</h3>
              <ul
                className="mt-2 pl-6 animate-slideup opacity-0"
                style={{ wordBreak: "keep-all" }}>
                <li style={{ listStyleType: "disc" }}>
                  영상제작에 관심 있는 대한민국 국적의 누구나(개인 또는 팀)
                </li>
                <li style={{ listStyleType: "disc" }}>
                  2023년 공익 영상공모전 ‘안전드림’
                </li>
                <li style={{ listStyleType: "disc" }}>
                  2022년 대학생 창작 영상공모전 ‘Eco 기록’
                </li>
                <li style={{ listStyleType: "disc" }}>
                  2021년 그린뉴딜, 자원 새활용을 위한 ‘업사이클링 크리에이터’
                </li>
                <li style={{ listStyleType: "disc" }}>
                  2013년 ~ 2014년 대학생 창작 영상공모전 ‘오만가지’
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:w-1/2">
            <ul className="career__benefits-list animate-slideup opacity-0">
              <li>
                영상 콘텐츠 <br />
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
                우수콘텐츠 <br /> 심사
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
                수상작 <br /> 발표
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="lg:flex items-center justify-between pt-12 md:pb-24">
          <div className="w-full lg:w-1/2 lg:pr-24">
            <div className="sec-title-wrapper">
              <h2 className="sec-title title-anim">‘Public video contest’</h2>
              <p className="animate-slideup opacity-0">
                We host video contests on various public interest topics, such
                as the environment, upcycling, and safety
              </p>

              <h3 className="sec-title title-anim">Eligibility</h3>
              <ul
                className="mt-2 pl-6 animate-slideup opacity-0"
                style={{ wordBreak: "keep-all" }}>
                <li style={{ listStyleType: "disc" }}>
                  Open to any Korean nationals interested in video production
                  (individuals or teams)
                </li>
                <li style={{ listStyleType: "disc" }}>
                  {`2023 Public Interest Video Contest: "Safety Dream"`}
                </li>
                <li style={{ listStyleType: "disc" }}>
                  {`2022 University Student Creative Video Contest: "Eco Record"`}
                </li>
                <li style={{ listStyleType: "disc" }}>
                  {`2021 Green New Deal and Resource Recycling: "Upcycling
                  Creator"`}
                </li>
                <li style={{ listStyleType: "disc" }}>
                  {`2013-2014 University Student Creative Video Contest: "Oman
                  Gaji"`}
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:w-1/2">
            <ul className="career__benefits-list animate-slideup opacity-0">
              <li>
                Video Content <br />
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
                Review of
                <br />
                Excellent
                <br />
                Content
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
                Announcement
                <br />
                of <br />
                Award-Winning
                <br />
                Works
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default PublicView;
