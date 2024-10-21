"use client";
import { gsap } from "gsap";
import Image from "next/image";
import { useEffect } from "react";
import { ScrollTrigger } from "../plugins";
import FeatureIcon1 from "/public/assets/imgs/feature/icon/Icon-1.png";
import FeatureIcon2 from "/public/assets/imgs/feature/icon/Icon-2.png";
import FeatureIcon3 from "/public/assets/imgs/feature/icon/Icon-3.png";
import FeatureIcon4 from "/public/assets/imgs/feature/icon/Icon-4.png";

gsap.registerPlugin(ScrollTrigger);

const HomeFeature = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let device_width = window.innerWidth;
      setTimeout(() => {
        let tHero = gsap.context(() => {
          let animation__feature2 = gsap.utils.toArray(
            ".animation__feature2 .feature__item",
          );
          if (device_width < 1023) {
            animation__feature2.forEach((item, i) => {
              gsap.set(item as any, { opacity: 0, y: 60 });
              let featured2Timeline = gsap.timeline({
                scrollTrigger: {
                  trigger: item as any,
                  start: "top center+=200",
                },
              });
              featured2Timeline.to(item as any, {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "power4.out",
              });
            });
          } else {
            gsap.set(".animation__feature2 .feature__item", {
              opacity: 0,
              y: 40,
            });
            gsap.to(".animation__feature2 .feature__item", {
              scrollTrigger: {
                trigger: ".animation__feature2",
                start: "top center+=200",
              },
              opacity: 1,
              y: 0,
              duration: 2,
              ease: "power4.out",
              stagger: 0.3,
            });
          }
        });
        return () => tHero.revert();
      }, 1000);
    }
  }, []);
  return (
    <>
      <section className="feature__area-2 pt-130">
        <div className="feature__top">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 xxl:grid-cols-2">
              <div className="col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 xxl:col-span-1">
                <div className="sec-title-wrapper">
                  <h2 className="sec-title title-anim">
                    <strong>방송콘텐츠</strong> <br />{" "}
                    <strong>진흥재단은?</strong>
                  </h2>
                </div>
              </div>
              <div className="col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 xxl:col-span-1">
                <div className="feature__text text-anim">
                  <p>
                    방송통신위원회 설립허가를 받은비영리공익재단으로 방송의
                    공익성, 다양성, 대중화를 위해방송콘텐츠
                    제작지원·1인크리에이터 육성·미디어 교육·국내외 조사연구사업
                    등 콘텐츠 기획자들의 놀이터이자 플랫폼으로
                    우수한방송콘텐츠를 발굴하여 세상과 이어주는 역할을 하고
                    있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="feature__btm2">
          <div className="sm:container">
            <div className="row">
              <div className="col-xxl-12">
                <div className="feature__list animation__feature2">
                  <div className="feature__item1">
                    <Image
                      priority
                      width={108}
                      height={108}
                      src={FeatureIcon1}
                      alt="Feature Icon"
                    />
                    <h3 className="feature__title">
                      <strong>BCPF콘텐츠학교</strong>
                    </h3>
                    <p>
                      방송 콘텐츠에 소외된 이들에게 콘텐츠에 대한 기본 개념을
                      이해시키고, 활용, 제작할 수 있도록 체험의 기회 제공
                    </p>
                  </div>
                  <div className="feature__item2">
                    <Image
                      priority
                      width={108}
                      height={108}
                      src={FeatureIcon2}
                      alt="Feature Icon"
                    />
                    <h3 className="feature__title">
                      <strong>드라마극본공모전</strong>
                    </h3>
                    <p>
                      작품성과 완성도 높은 드라마 제작을 위해 우수한 작가와
                      양질의 극본을 발굴하여 드라마 발전에 기여
                    </p>
                  </div>
                  <div className="feature__item3">
                    <Image
                      priority
                      width={108}
                      height={108}
                      className=""
                      src={FeatureIcon3}
                      alt="Feature Icon"
                    />
                    <h3 className="feature__title">
                      <strong>1인방송제작스쿨</strong>
                    </h3>
                    <p>
                      1인 크리에이터 인재 발굴을 통한 청년창업 지원 및 다양한
                      분야의 창의적 콘텐츠 발굴 육성
                    </p>
                  </div>
                  <div className="feature__item4">
                    <Image
                      priority
                      width={108}
                      height={108}
                      src={FeatureIcon4}
                      alt="Feature Icon"
                    />
                    <h3 className="feature__title">
                      <strong> BCPF 대한민국 1인방송대상</strong>
                    </h3>
                    <p>
                      대중성과 공공성을 겸한 우수콘텐츠를 발굴 시상함으로써 1인
                      방송 발전과 청년창업 진흥 및 건전 콘텐츠 육성에 기여
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeFeature;
