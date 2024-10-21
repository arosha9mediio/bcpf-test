"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/autoplay";

type ImageType = {
  id: number;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
};

const HomeSlider = ({
  images,
  title,
  subtitle,
  direction = "row", // Add this prop with default value "row"
}: {
  images: ImageType[];
  title: string;
  subtitle: string;
  direction?: "row" | "row-reverse"; // Accept either "row" or "col-reverse"
}) => {
  return (
    <>
      <section className="portfolio__area-4">
        <div className="container-fluid line_4 pt-150">
          <div
            className={`lg:flex lg:items-end ${
              direction === "row" ? "lg:flex-row" : "lg:flex-row-reverse"
            }`}>
            <div className="md:w-1/4 md:min-w-[350px]">
              <div
                className={`portfolio__sec-title text-anim ${direction === "row-reverse" && "text-right"}`}>
                <h2 className="sec-subtile-6">{subtitle}</h2>
                <h3
                  className={`sec-title-6 title-anim ${direction === "row-reverse" && "text-right"}`}>
                  {title}
                </h3>
              </div>
            </div>
            <div className="w-full">
              <div className="portfolio__wrapper-4 portfolio__slider-4">
                <Swiper
                  modules={[Autoplay]}
                  spaceBetween={4}
                  slidesPerView={1}
                  loop={true}
                  speed={1500}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  style={{
                    direction: direction === "row-reverse" ? "rtl" : "ltr",
                  }}
                  breakpoints={{
                    768: {
                      slidesPerView: 3,
                    },
                    1000: {
                      slidesPerView: 4,
                      spaceBetween: 24,
                    },
                    1200: {
                      slidesPerView: 4,
                      spaceBetween: 24,
                    },
                    1400: {
                      slidesPerView: 4,
                      spaceBetween: 24,
                    },
                  }}>
                  {images &&
                    images.map((slide, index) => (
                      <SwiperSlide key={index}>
                        <div className="portfolio__item-4">
                          <div className="portfolio__item-inner">
                            <div className="portfolio__title-wrapper">
                              <h4 className="portfolio__title-4">
                                {slide.title}
                              </h4>
                              <p className="portfolio__subtitle-4">
                                {slide.subtitle}
                              </p>
                            </div>
                            <div className="w-[2px]"></div>
                          </div>
                          <img
                            src={slide.src}
                            alt={slide.alt}
                            className="w-full h-auto"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            </div>
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
    </>
  );
};

export default HomeSlider;
