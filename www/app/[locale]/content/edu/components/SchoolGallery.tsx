"use client";
import { gsap } from "gsap";
import { useRef } from "react";
import { EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ScrollTrigger } from "../../../(routes)/components/plugins";
import Image from "next/image";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/effect-coverflow";
import "./styles.css";
import { StaticImageData } from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
  text: string;
  subText: string;
  image: StaticImageData;
}

interface SchoolFacilityData {
  id: string;
  title: string;
  gallery: GalleryItem[];
}

interface SchoolGalleryProps {
  facility: SchoolFacilityData;
}

const SchoolGallery: React.FC<SchoolGalleryProps> = ({ facility }) => {
  const serviceList = useRef();

  return (
    <>
      <section className="portfolio__area-7">
        <div className="container">
          <h3 className="text-end about-sub-right">{facility.title}</h3>
          <div className="section_wrapper b-100">
            <h4 className="react_border">
              <span>{facility.id}</span>
            </h4>
          </div>
        </div>

        <div className="portfolio__slider-7">
          <Swiper
            modules={[EffectCoverflow]}
            effect={"coverflow"}
            grabCursor={true}
            slidesPerView={"auto"}
            initialSlide={1}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            centeredSlides={true}>
            {facility.gallery.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="portfolio__slide-7">
                  <div className="slide-img">
                    <Image
                      priority
                      src={item.image}
                      alt={`Portfolio Image ${index + 1}`}
                    />
                  </div>
                  <div className="slide-content">
                    <h2 className="title">{item.text}</h2>
                    <h4 className="date">{item.subText}</h4>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default SchoolGallery;
