"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { ScrollTrigger } from "../../../(routes)/components/plugins";
import Image, { StaticImageData } from "next/image";
import animationCharCome from "../../../(routes)/lib/utils/animationCharCome";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./styles.css";
import SwiperGallery from "@/app/[locale]/(routes)/components/SwiperGallery";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface ProgramData {
  id: string;
  image: StaticImageData;
  title: string;
  description: string;
  subject: string;
  staff: string;
  images: StaticImageData[];
  link?: string;
}

interface Props {
  programData: ProgramData[];
}

export default function MajorProgram({ programData }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const charAnim = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    animationCharCome(charAnim.current);
    if (typeof window !== "undefined") {
      let device_width = window.innerWidth;
      let tHero = gsap.context(() => {
        gsap.set(".blog__animation .blog__item", { x: 50, opacity: 0 });

        if (device_width < 1023) {
          const blogList = gsap.utils.toArray<HTMLElement>(
            ".blog__animation .blog__item",
          );
          blogList.forEach((item, i) => {
            let blogTl = gsap.timeline({
              scrollTrigger: {
                trigger: item as Element,
                start: "top center+=200",
              },
            });
            blogTl.to(item, {
              x: 0,
              opacity: 1,
              ease: "power2.out",
              duration: 1.5,
            });
          });
        } else {
          gsap.to(".blog__animation .blog__item", {
            scrollTrigger: {
              trigger: ".blog__animation .blog__item",
              start: "top center+=300",
              markers: false,
            },
            x: 0,
            opacity: 1,
            ease: "power2.out",
            duration: 2,
            stagger: {
              each: 0.3,
            },
          });
        }
      });
      return () => tHero.revert();
    }
  }, []);
  return (
    <>
      <section className="gallery__area blog__animation">
        <div className="container g-0 line lg:px-0">
          <span className="line-3"></span>
          <div className="sm:grid sm:grid-cols-2 gap-12">
            {programData.map(program => (
              <div key={program.id} className="awards__card">
                <article className="gallery__item" ref={charAnim}>
                  <div className="gallery__img-wrapper">
                    <SwiperGallery
                      images={program.images}
                      thumbsSwiper={thumbsSwiper}
                      setThumbsSwiper={setThumbsSwiper}
                    />
                  </div>
                  <div className="mt-2" style={{ wordBreak: "keep-all" }}>
                    <h5>{program.title}</h5>
                    <p className="blog__item">{program.description}</p>
                    <p className="blog__item">
                      <strong>교육대상:</strong> {program.subject}
                    </p>
                    <p className="blog__item">
                      <strong>교육인원:</strong> {program.staff}
                    </p>
                    {program.link ? (
                      <Link href={program.link} target="_blank" rel="nofollow">
                        <div className="mt-2 bg-[#ED1C2E] h-8 w-8 flex justify-center items-center rounded-sm">
                          <span>
                            <i className="fa-brands fa-youtube text-white"></i>
                          </span>
                        </div>
                      </Link>
                    ) : null}
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
