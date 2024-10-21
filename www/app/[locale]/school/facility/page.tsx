import Head from "next/head";
import CmsHero from "../../(routes)/components/cms/CmsHero";
import RootLayoutNew from "../../(routes)/components/common/layout/RootLayout";
import "/public/assets/scss/master.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "../../(routes)/components/plugins";
import Image from "next/image";
import SchoolMapImg from "/public/assets/imgs/content/edu/map.png";
import SchoolGallery from "../../content/edu/components/SchoolGallery";
import { facility1, facility2, facility3, facility4 } from "./FacilityData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "방송콘텐츠진흥재단 | 학교시설",
  description: "BCPF콘텐츠학교",
};

gsap.registerPlugin(ScrollTrigger);

const SchoolFacility = () => {
  return (
    <RootLayoutNew header="header2" footer="footer4">
      <CmsHero
        text="콘텐츠학교"
        title="학교시설"
        subtitle="- BCPF School Facility"
      />
      <section className="service__area-3 pb-10 pt-150">
        <div className="container">
          <div className="flex justify-center mb-24">
            <Image src={SchoolMapImg} alt="BCPF School Image" />
          </div>
        </div>
        <SchoolGallery facility={facility1} />
        <SchoolGallery facility={facility2} />
        <SchoolGallery facility={facility3} />
        <SchoolGallery facility={facility4} />
        <div className="container">
          <div className="sec-title-wrapper">
            <h2 className="sec-title title-anim">대관안내</h2>
            <div className="flex mt-1 items-center gap-2">
              <p className="text-2xl">•</p>
              <div>
                <li>
                  대관을 희망하는 기관 및 단체는 유선상으로 문의해주시기
                  바랍니다.
                </li>
                <div className="flex gap-4 mt-1">
                  <li>TEL: 041-549-6400</li>
                  <li>E-mail: bcpf-school@bcpf.or.kr</li>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </RootLayoutNew>
  );
};

export default SchoolFacility;
