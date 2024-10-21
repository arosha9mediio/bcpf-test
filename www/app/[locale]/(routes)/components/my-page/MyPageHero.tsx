"use client";
import { gsap } from "gsap";
import Image from "next/image.js";
import { useEffect, useRef, useState } from "react";
import { SplitText } from "../plugins";
import Hero31 from "/public/assets/imgs/hero/mypage.jpg";
import Hero32 from "/public/assets/imgs/hero/mypageMob.jpg";
import ArrowDownSm from "/public/assets/imgs/icon/arrow-down-sm.png";

const MyPageHero = () => {
  const titleLeft = useRef();
  const titleRight = useRef();
  const heroTextAnim = useRef();

  const [deviceWidth, setDeviceWidth] = useState(null);
  const heroArea = useRef();

  useEffect(() => {
    gsap.config({ nullTargetWarn: false });
    if (typeof window !== "undefined") {
      setDeviceWidth(window.innerWidth);
      let split_creatives = new SplitText(titleLeft.current, { type: "chars" });
      let split_solutions = new SplitText(titleRight.current, {
        type: "chars",
      });
      let split_text_animation = new SplitText(heroTextAnim.current, {
        type: "chars words",
      });
      let tHero = gsap.context(() => {
        let HomeDigital = gsap.timeline();

        HomeDigital.from(split_creatives.chars, {
          duration: 2,
          x: 100,
          autoAlpha: 0,
          stagger: 0.2,
        });
        HomeDigital.from(
          split_solutions.chars,
          { duration: 1, x: 100, autoAlpha: 0, stagger: 0.1 },
          "-=1",
        );
        HomeDigital.from(
          split_text_animation.words,
          { duration: 1, x: 50, autoAlpha: 0, stagger: 0.05 },
          "-=1",
        );
      });
      return () => tHero.revert();
    }
  }, []);

  return (
    <>
      <section className="hero__area-3" ref={heroArea}>
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="hero__inner-3">
                <div className="sec-title-wrapper">
                  <h2 className="sec-sub-title">프로필</h2>
                  <h3 className="sec-title title-left" ref={titleLeft}>
                    마이페이지
                  </h3>
                </div>
                <div className="hero__text-3">
                  <p className="hero__text-animation" ref={heroTextAnim}>
                    - My Page
                  </p>
                </div>
                <div className="scroll-down">
                  <button>
                    <Image
                      priority
                      style={{ width: "auto", height: "auto" }}
                      src={ArrowDownSm}
                      alt="arrow icon"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero3-img-ani">
          {deviceWidth !== null && deviceWidth < 450 ? (
            <Image
              priority
              // width={1195}
              style={{ height: "auto" }}
              src={Hero32}
              alt="Hero Image"
              className="hero3-img"
            />
          ) : (
            <Image
              priority
              width={1195}
              style={{ height: "auto" }}
              src={Hero31}
              alt="Hero Image"
              className="hero3-img"
            />
          )}
        </div>
      </section>
    </>
  );
};

export default MyPageHero;
