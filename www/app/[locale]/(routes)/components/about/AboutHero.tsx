"use client";
import { gsap } from "gsap";
import Image from "next/image.js";
import { useEffect, useRef } from "react";
import About1 from "../../../../../public/assets/imgs/about/1/about1.png";
import About2 from "../../../../../public/assets/imgs/about/1/about2.png";
import About3 from "../../../../../public/assets/imgs/about/1/about3.png";
import About4 from "../../../../../public/assets/imgs/about/1/about4.png";
import Home7scroll from "../../../../../public/assets/imgs/home-7/scroll.png";
import Home7shape6 from "../../../../../public/assets/imgs/home-7/shape-6.png";
import { SplitText } from "../plugins";
import "./styles.css";

const AboutHero = () => {
  const creativeSection = useRef();
  const solutionSection = useRef();
  const heroContentSection = useRef();
  const heroThumAnim = useRef();

  useEffect(() => {
    if (typeof window !== "undefined") {
      let tHero = gsap.context(() => {
        let hero7_thum_anim = heroThumAnim.current;
        if (hero7_thum_anim) {
          gsap.from(".image-1", {
            x: 65,
            yPercent: 100,
            opacity: 0,
            duration: 2,
            delay: 1,
          });

          gsap.from(".image-2", {
            delay: 1.5,
            scale: 0,
            duration: 1.5,
          });

          gsap.from(".image-3", {
            x: 65,
            yPercent: -100,
            duration: 2,
            opacity: 0,
            delay: 1,
          });
          gsap.from(".image-4", {
            xPercent: -100,
            yPercent: -100,
            duration: 2,
            opacity: 0,
            delay: 1,
          });
        }

        let split_creative = new SplitText(creativeSection.current, {
          type: "chars",
        });
        let split_solution = new SplitText(solutionSection.current, {
          type: "chars",
        });
        let split_herocontent = new SplitText(heroContentSection.current, {
          type: "chars words",
        });

        gsap.from(split_creative.chars, {
          duration: 1,
          x: 70,
          autoAlpha: 0,
          stagger: 0.1,
        });
        gsap.from(split_solution.chars, {
          duration: 1,
          x: 70,
          autoAlpha: 0,
          stagger: 0.1,
        });
        gsap.from(split_herocontent.words, {
          duration: 1,
          x: 50,
          autoAlpha: 0,
          stagger: 0.05,
        });
      });
      return () => tHero.revert();
    }
  }, []);
  return (
    <>
      <section className="service__hero-2">
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="service__hero-inner-2">
                <div className="service__hero-left-2">
                  <Image
                    priority
                    width={240}
                    style={{ height: "auto" }}
                    src={About1}
                    alt="Image"
                    className="image-1"
                  />
                  <Image
                    priority
                    width={240}
                    style={{ height: "auto" }}
                    src={About2}
                    alt="Image"
                    className="image-2"
                  />
                  <Image
                    priority
                    width={240}
                    style={{ height: "auto" }}
                    src={About3}
                    alt="Image"
                    className="image-3"
                  />
                  <Image
                    priority
                    width={240}
                    style={{ height: "auto" }}
                    src={About4}
                    alt="Image"
                    className="image-4"
                  />
                </div>
                <div
                  className="service__hero-right-2 hero7__thum-anim"
                  ref={heroThumAnim}>
                  <h4>재단소개</h4>
                  <h1 className="title creative" ref={creativeSection}>
                    인사말
                  </h1>
                  <p className="animate_content" ref={heroContentSection}>
                    -Greetings
                  </p>
                  <Image
                    priority
                    style={{ width: "auto", height: "auto" }}
                    src={Home7scroll}
                    alt="scroll Image"
                    className="scroll"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Image
          priority
          width={132}
          height={132}
          src={Home7shape6}
          alt="Shape Image"
          className="shape-1"
        />
      </section>
    </>
  );
};

export default AboutHero;
