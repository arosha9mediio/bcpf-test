// SwiperGallery.js
"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  FreeMode,
  Navigation,
  Thumbs,
  EffectFade,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/thumbs";
import Image, { StaticImageData } from "next/image";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SwiperGalleryProps {
  images: StaticImageData[];
  thumbsSwiper: any;
  setThumbsSwiper: React.Dispatch<any>;
}

const SwiperGallery: React.FC<SwiperGalleryProps> = ({
  images,
  thumbsSwiper,
  setThumbsSwiper,
}) => {
  return (
    <div className="gallery__img-wrapper">
      <Swiper
        modules={[Autoplay, FreeMode, Navigation, Thumbs, EffectFade]}
        // effectfade="true" // Ts says there is no such prop
        loop={true}
        speed={1500}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: ".pp-prev",
          nextEl: ".pp-next",
        }}
        pagination={{ el: ".swiper-pagination", type: "fraction" }}
        // navigation={true}
        // thumbs={{ swiper: thumbsSwiper }}
        //className="mySwiper2"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image src={image} alt={`Slide ${index}`} />
          </SwiperSlide>
        ))}

        <div className="swiper-btn">
          <div style={{ cursor: "pointer" }} className="pp-prev">
            <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
          </div>
          <div style={{ cursor: "pointer" }} className="pp-next">
            <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
          </div>
        </div>
      </Swiper>
      {/* Uncomment the following part for thumbnails */}
      {/* <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`Thumbnail ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper> */}
    </div>
  );
};

export default SwiperGallery;
