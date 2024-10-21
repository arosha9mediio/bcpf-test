"use client";
import { gsap } from "gsap";
import Image from "next/image";
import { useEffect } from "react";
import { ScrollTrigger } from "../plugins";
import FeatureIcon1 from "/public/assets/imgs/feature/icon/Icon-1.svg";
import FeatureIcon2 from "/public/assets/imgs/feature/icon/Icon-2.svg";
import FeatureIcon3 from "/public/assets/imgs/feature/icon/Icon-3.svg";
import FeatureIcon4 from "/public/assets/imgs/feature/icon/Icon-4.svg";
import { useTranslations } from "next-intl";
import "./bcpf.css";

gsap.registerPlugin(ScrollTrigger);

const DesignStudioFeature = () => {
  const t = useTranslations();

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
          <div className="container containercc">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 xxl:grid-cols-2">
              <div className="col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 xxl:col-span-1">
                <div className="sec-title-wrapper">
                  <h2 className="sec-title title-anim">
                    <strong>{t("home_about_h1")}</strong> <br />{" "}
                    <strong>{t("home_about_h2")}</strong>
                  </h2>
                </div>
              </div>
              <div className="col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 xxl:col-span-1">
                <div className="feature__text text-anim text-2xl">
                  <div>
                    {t("home_about_description1")}{" "}
                    <b>{t("home_about_description2")}</b>
                    {t("home_about_description3")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="feature__btm">
          <div className="container containercc">
            <div className="row">
              <div className="col-xxl-12">
                <div className="feature__list animation__feature2">
                  <div className="feature__item">
                    <Image
                      priority
                      width={108}
                      height={108}
                      src={FeatureIcon1}
                      alt="Feature Icon"
                    />
                    <h3 className="feature__title">
                      <strong>{t("home_about_card_t1")}</strong>
                    </h3>
                    <ul
                      className="list-disc pl-5"
                      style={{ listStyleType: "disc" }}>
                      <li style={{ listStyleType: "disc" }}>
                        {t("home_about_card1_p1")}
                      </li>
                      <li style={{ listStyleType: "disc" }}>
                        {t("home_about_card1_p2")}
                      </li>
                      <li style={{ listStyleType: "disc" }}>
                        {t("home_about_card1_p3")}
                      </li>
                    </ul>
                  </div>
                  <div className="feature__item">
                    <Image
                      priority
                      width={108}
                      height={108}
                      src={FeatureIcon2}
                      alt="Feature Icon"
                    />
                    <h3 className="feature__title">
                      <strong>{t("home_about_card_t2")}</strong>
                    </h3>
                    <ul
                      className="list-disc pl-5"
                      style={{ listStyleType: "disc", wordBreak: "keep-all" }}>
                      <li style={{ listStyleType: "disc" }}>
                        {t("home_about_card2_p1")}
                      </li>
                      <li style={{ listStyleType: "disc" }}>
                        {t("home_about_card2_p2")}
                      </li>
                      <li style={{ listStyleType: "disc" }}>
                        {t("home_about_card2_p3")}
                      </li>
                      <li style={{ listStyleType: "disc" }}>
                        {t("home_about_card2_p4")}
                      </li>
                    </ul>
                  </div>
                  <div className="feature__item">
                    <Image
                      priority
                      width={108}
                      height={108}
                      className=""
                      src={FeatureIcon3}
                      alt="Feature Icon"
                    />
                    <h3 className="feature__title">
                      <strong>{t("home_about_card_t3")}</strong>
                    </h3>
                    <ul
                      className="list-disc pl-5"
                      style={{ listStyleType: "disc" }}>
                      <li style={{ listStyleType: "disc" }}>
                        {t("home_about_card3_p1")}
                      </li>
                    </ul>
                  </div>
                  <div className="feature__item">
                    <Image
                      priority
                      width={108}
                      height={108}
                      src={FeatureIcon4}
                      alt="Feature Icon"
                    />
                    <h3 className="feature__title">
                      <strong>{t("home_about_card_t4")}</strong>
                    </h3>
                    <ul
                      className="list-disc pl-5"
                      style={{ listStyleType: "disc" }}>
                      <li style={{ listStyleType: "disc" }}>
                        {t("home_about_card4_p1")}
                      </li>
                      <li style={{ listStyleType: "disc" }}>
                        {t("home_about_card4_p2")}
                      </li>
                    </ul>
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

export default DesignStudioFeature;
