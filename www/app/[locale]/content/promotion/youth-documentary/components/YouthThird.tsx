"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "../../../../(routes)/components/plugins";
import Image, { StaticImageData } from "next/image";
import animationCharCome from "../../../../(routes)/lib/utils/animationCharCome";

gsap.registerPlugin(ScrollTrigger);

interface YouthData {
  id: string;
  image: StaticImageData;
  title: string;
  description: string;
}

interface Props {
  youthData: YouthData[];
}

export default function YouthThird({ youthData }: Props) {
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
      <section className="blog__area-6 blog__animation">
        <div className="container g-0 line lg:px-0">
          <span className="line-3"></span>
          <div className="grid md:grid-cols-2 gap-12">
            {youthData.map(youth => (
              <div key={youth.id} className="awards__content">
                <article className="blog__item" ref={charAnim}>
                  <div className="blog__img-wrapper">
                    <div className="img-box">
                      <Image
                        priority
                        style={{
                          width: "auto",
                          height: "auto",
                          objectFit: "cover",
                        }}
                        className="image-box__item"
                        src={youth.image}
                        alt="Blog Thumbnail"
                      />
                      <Image
                        priority
                        style={{
                          width: "auto",
                          height: "auto",
                          objectFit: "cover",
                        }}
                        className="image-box__item"
                        src={youth.image}
                        alt="Blog Thumbnail"
                      />
                    </div>
                  </div>
                  <h5>{youth.title}</h5>
                  <p className="blog__item">{youth.description}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
