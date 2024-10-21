"use client";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

type ImageType = {
  id: number;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  description: string;
  url: string;
};

const DesignStudioPortfolio = ({ images }: { images: ImageType[] }) => {
  return (
    <section className="portfolio__area-2 md:pt-[150px]">
      <div className="md:container">
        <div className="portfolio__slider-2">
          <Swiper
            modules={[Autoplay, EffectFade, Pagination]}
            spaceBetween={0}
            effect={"fade"}
            slidesPerView={1}
            loop={true}
            speed={1500}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              el: ".swiper-pagination",
              clickable: true,
              renderBullet: function (i, className) {
                return `
                <button class="${className}">
                  <svg class="circle-progress"><circle class="circle-origin" r="24.5" cx="25" cy="25"></circle></svg><span></span>
                </button>
              `;
              },
            }}>
            {images.map(item => (
              <SwiperSlide key={item.id}>
                <div className="portfolio__slide-2">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-auto"
                  />
                  <div className="slide-content sm:w-full md:w-2/3">
                    <div className="sec-subtitle">{item.subtitle}</div>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                    <div className="btn-common-wrap">
                      <Link
                        prefetch={false}
                        href={{ pathname: item?.url }}
                        className="btn-common">
                        자세히보기 <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-pagination circle-pagination right"></div>
          </Swiper>
        </div>
      </div>
      <div className="container line_4 portfolio6__line">
        <div className="line-col-4">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </section>
  );
};

export default DesignStudioPortfolio;
