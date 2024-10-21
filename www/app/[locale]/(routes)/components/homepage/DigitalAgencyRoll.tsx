"use client";
import { Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/free-mode";
import { Post } from "@/lib/__generated/sdk";
import Link from "next/link";

type DigitalAgencyRollProps = {
  tickers?: Pick<Post, "id" | "title" | "body">[];
};

type DigitalAgencyRollType = (props: DigitalAgencyRollProps) => JSX.Element;

const DigitalAgencyRoll: DigitalAgencyRollType = ({ tickers }) => {
  return (
    <>
      <section className="roll__area">
        <div className="roll__slider">
          <Swiper
            modules={[FreeMode, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            freeMode={true}
            loop={true}
            centeredSlides={true}
            allowTouchMove={false}
            speed={3000}
            autoplay={{
              delay: 1,
              disableOnInteraction: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
              800: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 2,
              },
              1300: {
                slidesPerView: 2,
              },
              1900: {
                slidesPerView: 2,
              },
            }}>
            {tickers?.map(({ id, title, body }) => (
              <SwiperSlide key={id} style={{ width: "100%" }}>
                <div className="roll__slide">
                  <h2 className="line-clamp-1">
                    <Link href={{ pathname: body }}>{title}</Link>
                  </h2>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default DigitalAgencyRoll;
