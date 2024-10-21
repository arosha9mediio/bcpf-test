"use client";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ScrollTrigger } from "../../../../(routes)/components/plugins";
import Image from "next/image";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/effect-coverflow";
import "./styles.css";
import Img1 from "/public/assets/imgs/content/training/School-1.jpg";
import Img2 from "/public/assets/imgs/content/training/School-2.jpg";
import Img3 from "/public/assets/imgs/content/training/School-3.jpg";
import Img4 from "/public/assets/imgs/content/training/School-4.jpg";
import Img5 from "/public/assets/imgs/content/training/School-5.jpg";
import Img6 from "/public/assets/imgs/content/training/School-6.jpg";
import Img7 from "/public/assets/imgs/content/training/School-7.jpg";

gsap.registerPlugin(ScrollTrigger);

const GALLERY = [
  { id: "1", image: Img3 },
  { id: "2", image: Img4 },
  { id: "3", image: Img7 },
  { id: "4", image: Img2 },
];

const SimpleGallery = ({ activeSlideIndex }) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(activeSlideIndex);
    }
  }, [activeSlideIndex]);

  return (
    <section className="portfolio__area-7">
      <div className="portfolio__slider-7">
        <Swiper
          modules={[Autoplay, EffectCoverflow]}
          effect={"coverflow"}
          grabCursor={true}
          loop={true}
          slidesPerView={"auto"}
          initialSlide={1}
          onSwiper={swiper => {
            swiperRef.current = swiper;
          }}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          centeredSlides={true}>
          {GALLERY.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="slide-img">
                <Image
                  priority
                  src={item.image}
                  alt={`Portfolio Image ${index + 1}`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SimpleGallery;
