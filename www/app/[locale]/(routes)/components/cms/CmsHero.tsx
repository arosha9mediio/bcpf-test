"use client";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { SplitText } from "../plugins";
import "./styles.css";

type CmsHeroProps = {
  text?: string;
  title: string;
  subtitle?: string;
  variant?: string;
};

const CmsHero: React.FC<CmsHeroProps> = ({ text, title, subtitle }) => {
  const heroTitle = useRef(null);
  const heroSubTitle = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.config({ nullTargetWarn: false });
      let tHero = gsap.context(() => {
        let split_hero__title = new SplitText(heroTitle.current, {
          type: "chars",
        });
        let split_hero__subtitle = new SplitText(heroSubTitle.current, {
          type: "chars words",
        });

        gsap.from(split_hero__title.chars, {
          duration: 1,
          x: 70,
          autoAlpha: 0,
          stagger: 0.1,
        });
        gsap.from(
          split_hero__subtitle.words,
          //@ts-ignore
          { duration: 1, x: 50, autoAlpha: 0, stagger: 0.05 },
          "-=1",
        );
      });
      return () => tHero.revert();
    }
  }, []);

  // Array of class names
  const classNames = [
    "broadcast__area-cms1",
    "broadcast__area-cms2",
    "broadcast__area-cms3",
    "broadcast__area-cms4",
    "broadcast__area-cms5",
    "broadcast__area-cms6",
    "broadcast__area-cms7",
    "broadcast__area-cms8",
  ];

  // Randomly select one class name from the array
  const sectionClassName =
    classNames[Math.floor(Math.random() * classNames.length)];

  return (
    <section className={sectionClassName}>
      <div className="container">
        <div className="bg-black/20 backdrop-blur-sm w-fit p-3 rounded-md">
          {text && (
            <div className="flex gap-4 items-center">
              <p className="hero__text-auth">{text}</p>
              <div className="hero__text-auth-line" />
            </div>
          )}
          <h1 className="hero__title" ref={heroTitle}>
            {title}
          </h1>
          {subtitle && (
            <p className="notice__subtitle" ref={heroSubTitle}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CmsHero;
