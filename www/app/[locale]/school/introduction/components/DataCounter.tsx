"use client";
import { useEffect } from "react";
import { Power1, gsap } from "gsap";
import { ScrollTrigger } from "../../../(routes)/components/plugins";
import { isMobile } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const DataCounter = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let device_width = window.innerWidth;
      gsap.config({ nullTargetWarn: false });
      let tHero = gsap.context(() => {
        gsap.set(".counter_animation .counter__anim", { y: -100, opacity: 0 });
        if (device_width < 1023) {
          const counterArray = gsap.utils.toArray(
            ".counter_animation .counter__anim",
          ) as HTMLElement[]; // Explicit type assertion

          counterArray.forEach((item, i) => {
            let counterTl = gsap.timeline({
              scrollTrigger: {
                trigger: item as HTMLElement, // Explicit type assertion
                start: "top center+=200",
              },
            });
            counterTl.to(item as HTMLElement, {
              // Explicit type assertion
              y: 0,
              opacity: 1,
              ease: "bounce",
              duration: 1.5,
            });
          });
        } else {
          gsap.to(".counter_animation .counter__anim", {
            scrollTrigger: {
              trigger: document.querySelector(
                ".counter_animation",
              ) as HTMLElement, // Explicit type assertion
              start: "top center+=300",
            },
            y: 0,
            opacity: 1,
            ease: "bounce",
            duration: 1.5,
            stagger: {
              each: 0.3,
            },
          });
        }
        for (let i = 1; i < 5; i++) {
          gsap.from(gsap.utils.toArray(`.count${i}`) as HTMLElement[], {
            textContent: 0,
            duration: 1,
            delay: 0.3,
            ease: Power1.easeIn,
            snap: { textContent: 1 },
            stagger: 1,
            scrollTrigger: {
              trigger: document.querySelector(`.count${i}`) as HTMLElement, // Explicit type assertion
            },
          });
        }
      });
      return () => tHero.revert();
    }
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="counter__wrapper counter_animation py-4 md:py-12">
        <div className="counter__item counter__anim w-full">
          <h2 className="counter__number count1 pt-[30px]">13</h2>
          <p className="text-slate-300 dark:text-slate-300">운영년수</p>
          <span className="counter__border"></span>
        </div>
        <div className="counter__item counter__anim w-full">
          <h2 className="counter__number count2 md:pt-[30px]">853</h2>
          <p className="text-slate-300 dark:text-slate-300">
            미디어 영상교육 횟수
          </p>
          <span className="counter__border"></span>
        </div>
        <div className="counter__item counter__anim w-full">
          <h2 className="counter__number count3 md:pt-[30px]">39647</h2>
          <p className="text-slate-300 dark:text-slate-300">교육수료인원</p>
          <span className="counter__border"></span>
        </div>
      </div>
    </>
  );
};

export default DataCounter;
