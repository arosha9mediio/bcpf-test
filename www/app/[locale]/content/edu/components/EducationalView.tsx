"use client";
import { gsap } from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "../../../(routes)/components/plugins";
import Image from "next/image";
import SchoolImg from "/public/assets/imgs/content/edu/school.jpg";

gsap.registerPlugin(ScrollTrigger);

const EducationalView = () => {
  const serviceList = useRef();

  return (
    <>
      <section className="service__area-3 pb-10 pt-150">
        <div className="container">
          <div className="lg:flex items-center justify-between pt-12 pb-24">
            <div className="w-full lg:w-1/2 lg:pr-24">
              <div className="sec-title-wrapper">
                <h2 className="sec-title title-anim">학교소개</h2>
                <p className="text-anim">
                  “폐교가 상상과 꿈을 기록하는 배움터로, BCPF콘텐츠학교”
                </p>
                <ul>
                  <li>
                    • 13년 동안 미디어 영상교육 853회, 교육생 39,647명
                    교육수료(CJ문화재단처럼 바이넘버스로 표현)
                  </li>
                  <li>
                    • 충남지역 내 폐교를 리모델링하여 청소년, 지역주민 등을 위한
                    미디어 교육공간으로 2011년 6월 개관
                  </li>
                  <li>
                    • 지역을 대표하는 미디어 교육 공간 + 문화 + 라이프스타일
                    콘텐츠의 ‘복합 플랫폼’
                  </li>
                </ul>
              </div>
            </div>
            <div className="lg:w-1/2">
              <Image src={SchoolImg} alt="BCPF School Image" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EducationalView;
