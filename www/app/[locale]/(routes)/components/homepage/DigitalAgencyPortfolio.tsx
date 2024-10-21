"use client";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { ScrollTrigger } from "../plugins";
import Portfilio11 from "/public/assets/imgs/portfolio/1/1.jpg";
import Portfilio12 from "/public/assets/imgs/portfolio/1/2.jpg";
import Portfilio13 from "/public/assets/imgs/portfolio/1/3.jpg";
import Portfilio14 from "/public/assets/imgs/portfolio/1/4.jpg";
import Portfilio15 from "/public/assets/imgs/portfolio/1/5.jpg";
import Portfilio16 from "/public/assets/imgs/portfolio/1/6.jpg";

gsap.registerPlugin(ScrollTrigger);

const DigitalAgencyPortfolio = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let device_width = window.innerWidth;
      let tHero = gsap.context(() => {
        if (device_width > 767) {
          let portfolioline = gsap.timeline({
            scrollTrigger: {
              trigger: ".portfolio__area",
              start: "top center-=200",
              pin: ".portfolio__text",
              end: "bottom bottom+=80",
              markers: false,
              pinSpacing: false,
              scrub: 1,
            },
          });

          portfolioline.to(".portfolio__text", {
            scale: 2.5,
            duration: 1,
          });
          portfolioline.to(".portfolio__text", {
            scale: 2.5,
            duration: 1,
          });
          portfolioline.to(
            ".portfolio__text",
            {
              scale: 1,
              duration: 1,
            },
            "+=2",
          );
        }

        let portfolio_lists = gsap.utils.toArray(".portfolio__item");
        portfolio_lists.forEach((portfolio, i) => {
          //@ts-ignore
          gsap.set(portfolio, { opacity: 0.7 });
          let t1 = gsap.timeline();
          //@ts-ignore
          t1.set(portfolio, {
            position: "relative",
          });
          //@ts-ignore
          t1.to(portfolio, {
            scrollTrigger: {
              trigger: portfolio,
              scrub: 2,
              duration: 1.5,
              start: "top bottom+=100",
              end: "bottom center",
              markers: false,
            },
            scale: 1,
            opacity: 1,
            rotateX: 0,
          });
        });
      });
      return () => tHero.revert();
    }
  }, []);
  return (
    <>
      <section className="portfolio__area pb-140">
        <div className="container">
          <div className="row top_row">
            <h2 className="portfolio__text">주요 당선작</h2>
            <div className="portfolio__list-1">
              <div className="portfolio__item">
                <Link href="portfolio-details">
                  <Image
                    priority
                    style={{ width: "100%", height: "auto" }}
                    className="mover"
                    src={Portfilio11}
                    alt="Portfolio Image"
                  />
                </Link>
                <div className="portfolio__info">
                  <h3 className="portfolio__title">제3병원</h3>
                  <p>
                    2009년 <br />
                    제2회드라마극본공모전 <br />
                    우수상 당선작
                  </p>
                </div>
              </div>
              <div className="portfolio__item">
                <Link href="/portfolio-details">
                  <Image
                    priority
                    style={{ width: "100%", height: "auto" }}
                    src={Portfilio12}
                    alt="Portfolio Image"
                  />
                </Link>
                <div className="portfolio__info">
                  <h3 className="portfolio__title">닥터스</h3>
                  <p>
                    2010년 <br />
                    제3회드라마극본공모전 <br />
                    SBS플러스상 당선작
                  </p>
                </div>
              </div>
              <div className="portfolio__item">
                <Link href="/portfolio-details">
                  <Image
                    priority
                    style={{ width: "100%", height: "auto" }}
                    src={Portfilio13}
                    alt="Portfolio Image"
                  />
                </Link>
                <div className="portfolio__info">
                  <h3 className="portfolio__title">쇼핑왕루이</h3>
                  <p>
                    2015년 <br />
                    제7회드라마극본공모전 <br />
                    우수상 당선작
                  </p>
                </div>
              </div>
              <div className="portfolio__item">
                <Link href="/portfolio-details">
                  <Image
                    priority
                    style={{ width: "100%", height: "auto" }}
                    src={Portfilio14}
                    alt="Portfolio Image"
                  />
                </Link>
                <div className="portfolio__info">
                  <h3 className="portfolio__title">간택: 여인들의 전쟁</h3>
                  <p>
                    2017년 <br />
                    제9회드라마극본공모전 <br />
                    대상 당선작
                  </p>
                </div>
              </div>
              <div className="portfolio__item">
                <Link href="/portfolio-details">
                  <Image
                    priority
                    style={{ width: "100%", height: "auto" }}
                    src={Portfilio15}
                    alt="Portfolio Image"
                  />
                </Link>
                <div className="portfolio__info">
                  <h3 className="portfolio__title">출사표</h3>
                  <p>
                    2018년 <br />
                    제10회 드라마극본공모전 <br />
                    대상 당선작
                  </p>
                </div>
              </div>
              <div className="portfolio__item">
                <Link href="/portfolio-details">
                  <Image
                    priority
                    style={{ width: "100%", height: "auto" }}
                    src={Portfilio16}
                    alt="Portfolio Image"
                  />
                </Link>
                <div className="portfolio__info">
                  <h3 className="portfolio__title">사랑이라 말해요</h3>
                  <p>
                    2018년 <br />
                    제10회 드라마극본공모전 <br />
                    SBS플러스상 당선작
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row row_bottom">
            <div className="col-xxl-12">
              <div
                className="portfolio__btn btn_wrapper"
                data-speed="1"
                data-lag="0.2">
                <Link
                  className="wc-btn-secondary btn-hover btn-item"
                  href="/portfolio">
                  <span></span>역대당선 <br />
                  전체 보기 <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DigitalAgencyPortfolio;
