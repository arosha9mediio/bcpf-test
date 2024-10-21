"use client";
import Image from "next/image";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { getImagePath } from "@/utils/aws";
import { throttle } from "lodash";
import { useParams } from "next/navigation";

type ImageType = {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
};

type TndType = {
  title: string;
  description: string;
  file: any[];
};

interface Props {
  images: ImageType[];
  tnd?: TndType;
}

const DigitalAgencyHero: React.FC<Props> = ({ images, tnd }) => {
  const swiperRef = useRef<SwiperRef>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnd = () => {
    swiperRef.current?.swiper.slideNext();
    swiperRef.current?.swiper.autoplay.start();
  };

  const handleSlideChange = () => {
    const currentIndex = swiperRef.current?.swiper.realIndex;

    if (currentIndex === 0 && tnd?.file?.length) {
      videoRef.current?.play();
      swiperRef.current?.swiper.autoplay.stop();
    } else {
      videoRef.current?.pause();
      swiperRef.current?.swiper.autoplay.start();
    }
  };

  const throttledHandleSlideChange = throttle(handleSlideChange, 300);

  const params = useParams();
  const locale = params?.locale;

  return (
    <section className="portfolio__area-1 relative">
      <div className="portfolio__slider-1 min-h-dvh">
        <Swiper
          ref={swiperRef}
          modules={[EffectFade, Pagination, Navigation, Autoplay]}
          spaceBetween={0}
          effect={"fade"}
          slidesPerView={1}
          loop={true}
          speed={2500}
          navigation={{
            prevEl: ".pp-prev",
            nextEl: ".pp-next",
          }}
          pagination={{ clickable: true, el: ".swiper-pagination" }}
          autoplay={false}
          onSlideChange={throttledHandleSlideChange}>
          {tnd?.file?.length > 0 && (
            <SwiperSlide>
              <div className="hero__area pt-[132px] px-[20px] pb-[20px] md:px-[30px] md:pb-[30px]">
                <h1 className="hero__title hidden">
                  <strong>
                    &apos;방송콘텐츠 진흥재단 - 우수한 방송콘텐츠를 창작하고
                    발견하는 플랫폼&apos;
                  </strong>
                  <br />
                </h1>
                <div className="relative w-full h-full overflow-hidden">
                  <video
                    ref={videoRef}
                    src={getImagePath(tnd.file[0].url)}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    controls
                    autoPlay
                    muted
                    loop={false}
                    onEnded={handleVideoEnd}></video>
                </div>
              </div>
            </SwiperSlide>
          )}
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="hero__area pt-[132px] px-[20px] pb-[20px] md:px-[30px] md:pb-[30px]">
                <div className="relative w-full h-full overflow-hidden">
                  <div className="absolute inset-x-0 bottom-0 z-50 animation__hero_one">
                    {locale == "ko" ? (
                      <div className="w-fit p-12 rounded bg-black/30 backdrop-blur-sm">
                        <h1 className="text-8xl text-white">
                          <strong>{tnd?.title}</strong> <br />
                        </h1>
                        <p className="text-4xl text-slate-300 mt-4">
                          {tnd?.description}
                        </p>
                      </div>
                    ) : (
                      <div className="w-fit p-12 rounded bg-black/30 backdrop-blur-sm">
                        <h1 className="text-6xl text-white">
                          <strong>
                            Broadcasting Content Promotion Foundation
                          </strong>{" "}
                          <br />
                        </h1>
                        <p className="text-2xl text-slate-300 mt-4">
                          Through the promotion of K-content, we will contribute
                          to the development and global spread of K-culture!
                        </p>
                      </div>
                    )}
                  </div>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="object-cover min-h-full min-w-full"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination absolute bottom-12 left-1/2 transform -translate-x-1/2 z-50"></div>
          <div className="swiper-btn absolute top-1/2 w-full transform -translate-y-1/2 flex justify-between px-12 z-50">
            <div
              style={{ cursor: "pointer" }}
              className="pp-prev text-white bg-black/30 px-4 py-3 rounded-full hover:bg-white hover:text-slate-700 hover:border-slate-700 hover:border-[1.5px]">
              <FontAwesomeIcon icon={faArrowLeft} size="2x" />
            </div>
            <div
              style={{ cursor: "pointer" }}
              className="pp-next text-white bg-black/30 px-4 py-3 rounded-full hover:bg-white hover:text-slate-700 hover:border-slate-700 hover:border-[1.5px]">
              <FontAwesomeIcon icon={faArrowRight} size="2x" />
            </div>
          </div>
        </Swiper>
      </div>
    </section>
  );
};

export default DigitalAgencyHero;
