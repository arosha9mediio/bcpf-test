"use client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { gsap } from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "../plugins";
import { formatDate } from "@/lib/utils";
import { DateTimeFormatter } from "@/components/table/formatters/DateTimeFormatter";

gsap.registerPlugin(ScrollTrigger);

type NoticeType = {
  id?: string;
  slug?: string;
  title: string;
  createdAt?: any;
  tags?: string;
};

const HomeNotice = ({ notices }: { notices: NoticeType[] }) => {
  const teamItemContent = useRef();
  useEffect(() => {
    if (typeof window !== "undefined") {
      let device_width = window.innerWidth;
      let tHero = gsap.context(() => {
        gsap.set(".fade_bottom_3", { y: 30, opacity: 0 });

        if (device_width < 1023) {
          const fadeArray = gsap.utils.toArray(".fade_bottom_3");
          fadeArray.forEach((item, i) => {
            let fadeTl = gsap.timeline({
              scrollTrigger: {
                //@ts-ignore
                trigger: item,
                start: "top center+=200",
              },
            });
            //@ts-ignore
            fadeTl.to(item, {
              y: 0,
              opacity: 1,
              ease: "power2.out",
              duration: 1.5,
            });
          });
        } else {
          gsap.to(".fade_bottom_3", {
            scrollTrigger: {
              trigger: ".fade_bottom_3",
              start: "top center+=300",
              markers: false,
            },
            y: 0,
            opacity: 1,
            ease: "power2.out",
            duration: 1,
            stagger: {
              each: 0.2,
            },
          });
        }
      });
      return () => tHero.revert();
    }
  }, []);

  return (
    <section className="team__area-7 mt-4">
      <div className="container pb-8 pt-150">
        <div className="mx-auto">
          <div className="flex flex-wrap mt-12 md:mt-0">
            <div className="w-1/2 flex items-center justify-between">
              <div className="sec-title-wrapper">
                {/* <p>현대인의 지친 일상 속에서</p> */}
                <br />
                <h2 className="sec-title title-anim">공지사항</h2>
              </div>
            </div>
            <div className="w-1/2 flex justify-end">
              <div
                className="portfolio__btn btn_wrapper"
                data-speed="1"
                data-lag="0.2">
                <Link
                  rel="canonical"
                  className="wc-btn-pink btn-hover btn-item"
                  href="/post/notice">
                  <span></span>공지사항 <br />
                  전체 보기 <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="flex flex-wrap">
          <div className="w-full">
            <div className="team__items-7">
              {notices.map((notice, index) => {
                const slug =
                  notice?.slug?.length !== 0 ? notice?.slug : notice?.id;

                return (
                  <Link
                    href={{
                      pathname: `/post/notice/${slug}`,
                    }}
                    key={index}>
                    <div className="team__item-7 fade_bottom_3">
                      <div className="team__name-wrap-7">
                        <p className="tm-serial">{notice?.tags}</p>
                        <h3 className="tm-name">{notice.title}</h3>
                      </div>
                      <div className="tm-link">
                        <h4 className="tm-role">
                          <DateTimeFormatter date={notice?.createdAt} />
                        </h4>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeNotice;
