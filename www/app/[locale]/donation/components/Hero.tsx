"use client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { SplitText } from "../../(routes)/components/plugins";
import "./styles.css";

type HeroProps = {
  text: string;
  title: string;
  subtitle: string;
};

type HeroType = (props: HeroProps) => JSX.Element;

const Hero: HeroType = ({ text, title, subtitle }) => {
  const heroTitle = useRef();
  const heroSubTitle = useRef();
  useEffect(() => {
    gsap.config({ nullTargetWarn: false });
    if (typeof window !== "undefined") {
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

  return (
    <>
      <section className="broadcast__area-notice">
        <div className="container">
          <p className="hero__text-auth">{text}</p>
          <h1 className="hero__title" ref={heroTitle}>
            {title}
          </h1>
          <p className="notice__subtitle" ref={heroSubTitle}>
            {subtitle}
          </p>
        </div>
      </section>
    </>
  );
};

export default Hero;
