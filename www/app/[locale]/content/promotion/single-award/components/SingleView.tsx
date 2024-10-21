"use client";
import "/public/assets/scss/master.scss";
import { isMobile } from "@/lib/utils";
import Image from "next/image";
import ArrowDown from "/public/assets/imgs/icon/arrows-down.png";
import ArrowRight from "/public/assets/imgs/icon/arrows-right.png";
import ArrowDownDark from "/public/assets/imgs/icon/arrows-down-dark.png";
import ArrowRightDark from "/public/assets/imgs/icon/arrows-right-dark.png";
import { useParams } from "next/navigation";

const SingleView = () => {
  const params = useParams();
  const locale = params?.locale;

  return (
    <>
      {locale == "ko" ? (
        <div className="lg:flex items-center justify-between pt-12 md:pb-24">
          <div className="w-full lg:w-1/2 lg:pr-24">
            <div className="sec-title-wrapper">
              <h2 className="sec-title title-anim">
                BCPF 대한민국 1인방송대상
              </h2>
              <p className="animate-slideup opacity-0">
                대중성·공공성·지역성을 갖춘 다양한 주제의 우수콘텐츠를 발굴 및
                시상함으로써 미디어의 한 축으로 자리잡은 크리에이터를 격려하고
                건전한 미디어 환경을 조성하고자 BCPF 대한민국 1인방송대상을
                개최합니다
              </p>
              <h3 className="sec-title title-anim">지원대상</h3>
              <ul className="mt-2 pl-6">
                <li
                  style={{ listStyleType: "disc" }}
                  className="animate-slideup opacity-0">
                  채널을 꾸준히 운영하는 대한민국 국적의 크리에이터
                  <br />
                  (개인 또는 팀)
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
              <h2 className="sec-title title-anim">
                BCPF Korea Individual Broadcasting Award
              </h2>
              <p className="animate-slideup opacity-0">
                By discovering and awarding outstanding content with popularity,
                public interest, and regional significance, we aim{" "}
                <strong>
                  to encourage creators who have become pillars of the media and
                  contribute to creating a healthy media environment.
                </strong>{" "}
                We will be hosting the BCPF Korea Independent Broadcasting
                Awards
              </p>
              <h3 className="sec-title title-anim">Eligibility</h3>
              <ul className="mt-2 pl-6">
                <li
                  style={{ listStyleType: "disc" }}
                  className="animate-slideup opacity-0">
                  Creators of Korean nationality who consistently manage their
                  channels
                  <br />
                  (Individual or team)
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
                Excellent
                <br />
                Content
                <br />
                Evaluation
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
                of
                <br />
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

export default SingleView;
