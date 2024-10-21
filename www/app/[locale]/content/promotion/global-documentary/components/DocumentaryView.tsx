"use client";
import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "../../../../(routes)/components/plugins";
import Feature41 from "/public/assets/imgs/feature/4/1.png";
import Feature42 from "/public/assets/imgs/feature/4/2.png";
import Feature43 from "/public/assets/imgs/feature/4/3.png";
import Image from "next/image";
import { documentaryData } from "./DocumentaryData";
import { useParams } from "next/navigation";
import { isMobile } from "@/lib/utils";
import { BroadcastCommonPartsFragment } from "@/lib/__generated/sdk";
import { getImagePath } from "@/utils/aws";
import Img1 from "/public/assets/imgs/content/global/global-1.jpg";
import { DateTimeFormatter } from "@/components/table/formatters/DateTimeFormatter";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  documentary: BroadcastCommonPartsFragment;
};

const DocumentaryView: React.FC<Props> = ({ documentary }) => {
  // const [documentary, setDocumentary] = useState(null);
  // const { documentaryId } = useParams();

  useEffect(() => {
    // if (!documentaryId) return;

    // Find the data for the specific documentary based on the id
    // const selectedDocumentary = documentaryData.find(
    //   doc => doc.id === documentaryId,
    // );

    // Set the selected documentary data in the state
    // setDocumentary(selectedDocumentary);

    // GSAP animation setup (runs only on the client-side)
    if (typeof window !== "undefined") {
      let device_width = window.innerWidth;
      let tHero = gsap.context(() => {
        gsap.set(".fade_bottom_4", { y: 30, opacity: 0 });

        if (device_width < 1023) {
          const fadeArray = gsap.utils.toArray(".fade_bottom_4");
          fadeArray.forEach((item, i) => {
            let fadeTl = gsap.timeline({
              scrollTrigger: {
                trigger: item as HTMLElement,
                start: "top center+=200",
              },
            });
            fadeTl.to(item as HTMLElement, {
              y: 0,
              opacity: 1,
              ease: "power2.out",
              duration: 1.5,
            });
          });
        } else {
          gsap.to(".fade_bottom_4", {
            scrollTrigger: {
              trigger: ".fade_bottom_4",
              start: "top center+=300",
              markers: false,
            },
            y: 0,
            opacity: 1,
            ease: "power2.out",
            duration: 1,
            stagger: {
              each: 0.2,
            },
          });
        }
      });
      return () => tHero.revert();
    }
  }, []);

  if (!documentary) {
    return <div>Documentary not found</div>;
  }

  return (
    <>
      <section className="broadcast__area">
        <div className="container line_4">
          <div className="lg:flex justify-between">
            <div className="lg:w-2/5">
              <div className="feature__content-left">
                <h1 className="broadcast__title">{documentary.title}</h1>
              </div>
              <div className="broadcast__area-text-wrapper">
                <h4>작품명</h4>
                <p>{documentary.title}</p>
              </div>
              <div className="broadcast__area-text-wrapper">
                <h4>요약정보</h4>
                <p>{documentary.summaryInfo}</p>
              </div>
              <div className="broadcast__area-text-wrapper">
                <h4>방송</h4>
                <p>{documentary.broadcast}</p>
              </div>
              <div className="broadcast__area-text-wrapper">
                <h4>극장개봉</h4>
                <p>
                  <DateTimeFormatter
                    date={documentary.theatersDate}
                    format="yyyy년 MM월 dd일"
                  />
                </p>
              </div>
              <div className="broadcast__area-text-wrapper">
                <h4>제작사</h4>
                <p>{documentary.producer}</p>
              </div>
            </div>
            <div className="lg:w-3/5">
              <div className="broadcast__right">
                <div className="broadcast__area-wrapper">
                  <div className="broadcast__line" />
                  <h4 className="broadcast__title-2">만든사람</h4>
                </div>
                <div className="broadcast__area-wrapper">
                  <h4>연출</h4>
                  <p>{documentary.production}</p>
                </div>
                <div className="broadcast__area-wrapper">
                  <h4>촬영</h4>
                  <p>{documentary.shooting}</p>
                </div>
                <div className="broadcast__area-wrapper">
                  <h4>구성</h4>
                  <p>{documentary.configuration}</p>
                </div>
                <div className="broadcast__area-wrapper">
                  <h4>편집</h4>
                  <p>{documentary.edit}</p>
                </div>
                <div className="broadcast__area-wrapper">
                  <h4>기획</h4>
                  <p>{documentary.plan}</p>
                </div>
                <div className="broadcast__area-wrapper">
                  <h4>프로듀서</h4>
                  <p>{documentary.producers}</p>
                </div>
                <Image
                  priority
                  width={130}
                  height={97}
                  className="feature__img-1"
                  src={Feature41}
                  alt="Icon"
                />
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
          <div className="lg:flex">
            <div className="lg:w-1/2">
              <div className="feature__content">
                <img
                  width={630}
                  style={{ height: "auto" }}
                  src={getImagePath(
                    `statics/web/contest/previews/${documentary?.previewUrl || "noimg.png"}`,
                  )}
                  alt="Features Image"
                />
              </div>
              <div className="broadcast__area-list lg:block hidden">
                <h5>영화제출품 및 수상 현황</h5>
                <ul>
                  {documentary.awards.length &&
                    documentary.awards.split(",").map((award, index) => (
                      <li
                        style={{ listStyleType: "disc" }}
                        className="ml-5"
                        key={index}
                        dangerouslySetInnerHTML={{
                          __html: award,
                        }}></li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="broadcast__area-bottom">
                <h5>시놉시스</h5>
                <p
                  dangerouslySetInnerHTML={{
                    __html: documentary.synopsis,
                  }}></p>
              </div>
            </div>
            <div className="broadcast__area-list lg:hidden">
              <h5>영화제출품 및 수상 현황</h5>
              <ul>
                {documentary.awards.length &&
                  documentary.awards.split(",").map((award, index) => (
                    <li
                      style={{ listStyleType: "disc" }}
                      className="ml-5"
                      key={index}
                      dangerouslySetInnerHTML={{
                        __html: award,
                      }}></li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DocumentaryView;
