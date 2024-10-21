"use client";
import { Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "../../../../(routes)/components/plugins";
import Image from "next/image";
import Img1 from "/public/assets/imgs/content/training/1.png";
import Img2 from "/public/assets/imgs/content/training/2.png";
import Img3 from "/public/assets/imgs/content/training/3.png";
import Img4 from "/public/assets/imgs/content/training/4.png";
import { useParams } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

const EduProgram = ({ onStepClick }) => {
  const params = useParams();
  const locale = params?.locale;

  const STEPS = [
    {
      id: "1",
      image: Img1,
      step: "step 01",
      title: "[기초과정]",
      description: "채널개설, 콘텐츠 기획, 촬영, 편집 실습 등",
      link: () => onStepClick(0),
    },
    {
      id: "2",
      image: Img2,
      step: "step 02",
      title: "[심화과정]",
      description: "채널 마케팅 전략, 스튜디오를 활용한 라이브방송 실습 등",
      link: () => onStepClick(1),
    },
    {
      id: "3",
      image: Img3,
      step: "step 03",
      title: "[전문가 특강]",
      description: "콘텐츠 저작권, 플랫폼 알고리즘의 이해, 스피치 교육",
      link: () => onStepClick(2),
    },
    {
      id: "4",
      image: Img4,
      step: "step 04",
      title: "[크리에이터 전문 코칭 프로그램]",
      description: "교육생 콘텐츠 맞춤형 코칭",
      link: () => onStepClick(3),
    },
  ];

  const STEPSEN = [
    {
      id: "1",
      image: Img1,
      step: "step 01",
      title: "[Basic Course]",
      description:
        "Channel creation, content planning, shooting, editing practice, etc.",
      link: () => onStepClick(0),
    },
    {
      id: "2",
      image: Img2,
      step: "step 02",
      title: "[Advanced Course]",
      description:
        "Channel marketing strategy, live broadcast practice using a studio, etc.",
      link: () => onStepClick(1),
    },
    {
      id: "3",
      image: Img3,
      step: "step 03",
      title: "[Expert Lecture]",
      description:
        "Understanding content copyright, platform algorithms, and speech training",
      link: () => onStepClick(2),
    },
    {
      id: "4",
      image: Img4,
      step: "step 04",
      title: "[Creator Specialized Coaching Program]",
      description: "Customized coaching for trainees' content",
      link: () => onStepClick(3),
    },
  ];

  return (
    <section className="workflow__area">
      <div className="container g-0 line pt-100 pb-140">
        <div className="line-3"></div>
        {locale == "ko" ? (
          <div className="row">
            <div className="col-xxl-12">
              <div className="sec-title-wrapper">
                <h2 className="sec-sub-title title-anim">교육프로그램</h2>
              </div>
            </div>

            <div className="col-xxl-12 workflow__slider">
              <Swiper
                modules={[FreeMode, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                speed={2000}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                  1200: {
                    slidesPerView: 4,
                  },
                }}>
                {STEPS.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className="workflow__slide-h fade_left space-y-3 cursor-pointer"
                      onClick={item.link}>
                      <h4 className="workflow__step">{item.step}</h4>
                      <div className="flex justify-center">
                        <Image
                          src={item.image}
                          alt={item.title}
                          height={120}
                          width={120}
                        />
                      </div>
                      <h6 className="workflow__title">{item.title}</h6>
                      <p>{item.description}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-xxl-12">
              <div className="sec-title-wrapper">
                <h2 className="sec-sub-title title-anim">
                  Educational Program
                </h2>
              </div>
            </div>

            <div className="col-xxl-12 workflow__slider">
              <Swiper
                modules={[FreeMode, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                speed={2000}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                  1200: {
                    slidesPerView: 4,
                  },
                }}>
                {STEPSEN.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className="workflow__slide-h fade_left space-y-3 cursor-pointer"
                      onClick={item.link}>
                      <h4 className="workflow__step">{item.step}</h4>
                      <div className="flex justify-center">
                        <Image
                          src={item.image}
                          alt={item.title}
                          height={120}
                          width={120}
                        />
                      </div>
                      <h6 className="workflow__title">{item.title}</h6>
                      <p>{item.description}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EduProgram;
