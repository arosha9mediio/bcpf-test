"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import OrgChart from "/public/assets/imgs/about/org/organization_chart.svg";

const AboutOrganization = () => {
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
      <section className="workflow__area">
        <div className="container g-0 line pt-140 pb-140">
          <div className="workflow__slide fade_left">
            <div>
              <Image alt="Organization Structure" src={OrgChart} />
            </div>
          </div>
          <div className="line-3"></div>
        </div>
      </section>
    </>
  );
};

export default AboutOrganization;
