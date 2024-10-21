"use client";
import "/public/assets/scss/master.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "../../../(routes)/components/plugins";
import DataCounter from "./DataCounter";
import DataCounterEn from "./DataCountreEn";
import { useParams } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

const IntroView = () => {
  const params = useParams();
  const locale = params?.locale;

  return (
    <div className="container flex items-center justify-center text-center h-full w-full">
      {locale == "ko" ? (
        <div className="w-full bg-black/50 p-4 md:p-12 backdrop-blur">
          <h2 className="notice__title title-anim">학교소개</h2>
          <div className="text-center">
            <p className="text-white text-xl md:text-2xl mt-3 md:mt-8 text-anim dark:text-white">
              “폐교가 상상과 꿈을 기록하는 배움터로, BCPF콘텐츠학교”
            </p>
            <DataCounter />
            <ul
              className="space-y-2 mt-4 px-40"
              style={{ wordBreak: "keep-all" }}>
              <li className="text-slate-300 text-lg">
                충남지역 내 폐교를 리모델링하여 아동·청소년, 지역주민 등을 위한
                미디어 교육공간으로 2011년 6월 개관하였으며, 지역을 대표하는{" "}
                <strong>
                  미디어 교육 + 문화 + 라이프스타일 콘텐츠의 ‘복합 플랫폼’
                </strong>{" "}
                역할을 수행하고 있습니다
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="w-full bg-black/50 p-4 md:p-12 backdrop-blur">
          <h2 className="notice__title title-anim">BCPF Content School</h2>
          <div className="text-center">
            <p className="text-white text-xl md:text-2xl mt-3 md:mt-8 text-anim dark:text-white">
              “BCPF Content School, a closed school turned into a learning
              center where imagination and dreams are recorded”
            </p>
            <DataCounterEn />
            <ul className="space-y-2 mt-4" style={{ wordBreak: "keep-all" }}>
              <li className="text-slate-300 text-lg px-12">
                A closed school in the Chungnam region was remodeled and opened
                in June 2011 as a media education space for child and youth,
                local residents. Established as a{" "}
                <strong>
                  ‘composite platform’ of media education + culture + lifestyle
                  content
                </strong>{" "}
                representing the region
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntroView;
