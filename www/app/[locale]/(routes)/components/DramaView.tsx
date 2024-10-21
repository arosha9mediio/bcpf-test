"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "./plugins";
import { isMobile } from "@/lib/utils";
import Image from "next/image";
import ArrowDown from "/public/assets/imgs/icon/arrows-down.png";
import ArrowLeft from "/public/assets/imgs/icon/arrows-left.png";
import ArrowRight from "/public/assets/imgs/icon/arrows-right.png";
import ArrowDownDark from "/public/assets/imgs/icon/arrows-down-dark.png";
import ArrowLeftDark from "/public/assets/imgs/icon/arrows-left-dark.png";
import ArrowRightDark from "/public/assets/imgs/icon/arrows-right-dark.png";
import { useParams } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

const DramaView = () => {
  const params = useParams();
  const locale = params?.locale;

  return (
    <>
      {locale == "ko" ? (
        <div className="lg:flex items-center justify-between pt-12 sm:pb-24">
          <div className="w-full lg:w-1/2 lg:pr-24">
            <div className="sec-title-wrapper">
              <h2 className="sec-title title-anim">‘사막의 별똥별 찾기’</h2>
              <p className="animate-slideup opacity-0">
                신인 작가와 작품성이 우수한 극본발굴을 통해 공모전 수상작이
                드라마로 제작 방영될 수 있도록 지원하며,
                <br />
                <strong>
                  신인 작가들의 등용문이자 K-드라마 콘텐츠 글로벌 진출의 마중물
                  역할
                </strong>
                을 하고자 합니다
              </p>
              <h3 className="sec-title title-anim">공모분야</h3>
              <ul className="mt-2 pl-6 animate-slideup opacity-0">
                <li style={{ listStyleType: "disc" }}>
                  8부작 ~ 16부작 미니시리즈(회당 70분 편성기준)
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:w-1/2 pt-10">
            <ul className="career__benefits-list animate-slideup opacity-0">
              <li className="bg-1">
                드라마극본 <br />
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
                예심심사 <br /> <br />
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
                본심심사 <br /> <br />
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
                  최종심 <br /> <br />
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
              <h2 className="sec-title animate-slideup opacity-0">
                ‘Finding a Shooting Star in the Desert’
              </h2>
              <p className="animate-slideup opacity-0">
                We aim to support the production and broadcast of award-winning
                scripts through the{" "}
                <strong>
                  discovery of new writers and high-quality scripts.
                </strong>{" "}
                By doing so, we{" "}
                <strong>
                  provide a platform for emerging writers, and act as a catalyst
                  for the global expansion of K-drama content
                </strong>
              </p>
              <h3 className="sec-title title-anim">Application Field</h3>
              <ul className="mt-2 pl-6 animate-slideup opacity-0">
                <li style={{ listStyleType: "disc" }}>
                  8 to 16 episode miniseries
                  <br />
                  (based on 70 minute episodes)
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:w-1/2 pt-10">
            <ul className="career__benefits-list animate-slideup opacity-0">
              <li className="bg-1">
                Drama Script <br />
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
                Preliminary <br />
                Screening
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
                Final <br />
                Screening
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
                  Final <br />
                  Review
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
                Announcement <br />
                of Winners
              </li>
              {!isMobile() && (
                <li>
                  Final <br />
                  Review
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

export default DramaView;
