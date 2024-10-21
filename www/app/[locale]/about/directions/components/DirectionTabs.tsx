"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import * as Tabs from "@radix-ui/react-tabs";
import DirectionContent from "./DirectionContent";
import DirectionContentSchool from "./DirectionContentSchool";

const DirectionTabs = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let tHero = gsap.context(() => {
        gsap.set(".fade_left", { x: -20, opacity: 0 });
        gsap.to(".fade_left", {
          scrollTrigger: {
            trigger: ".fade_left",
            start: "top center+=300",
          },
          x: 0,
          opacity: 1,
          ease: "power2.out",
          duration: 1,
          stagger: {
            each: 0.2,
          },
        });
      });
      return () => tHero.revert();
    }
  }, []);
  return (
    <>
      <section className="service__area-3">
        <div className="container g-0 line pt-140 pb-140">
          <div className="line-3"></div>

          <Tabs.Root defaultValue="tab1">
            <Tabs.List
              aria-label="Manage your account"
              className="my-page__tab-wrapper sticky top-0 bg-white z-10">
              <Tabs.Trigger value="tab1" className="my-page__tab">
                방송콘텐츠진흥재단위치
              </Tabs.Trigger>
              <Tabs.Trigger value="tab2" className="my-page__tab">
                학교위치
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="tab1">
              <DirectionContent />
            </Tabs.Content>
            <Tabs.Content value="tab2">
              <DirectionContentSchool />
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </section>
    </>
  );
};

export default DirectionTabs;
