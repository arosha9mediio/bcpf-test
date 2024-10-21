"use client";
import { gsap } from "gsap";
import Image from "next/image";
import { useRef } from "react";
import { ScrollTrigger } from "../../../(routes)/components/plugins";
import * as Tabs from "@radix-ui/react-tabs";
import SchoolGallery from "./SchoolGallery";
import SchoolMapImg from "/public/assets/imgs/content/edu/map.png";
import { facility1, facility2, facility3, facility4, program } from "./Data";
import MajorProgram from "./MajorProgram";

gsap.registerPlugin(ScrollTrigger);
const TabSection = () => {
  const serviceList = useRef();

  return (
    <>
      <section className="service__area-3 pb-150">
        <Tabs.Root defaultValue="tab1">
          <div className="container">
            <Tabs.List
              aria-label="Manage your account"
              className="my-page__tab-wrapper bg-white z-10">
              <Tabs.Trigger value="tab1" className="my-page__tab">
                학교시설
              </Tabs.Trigger>
              <Tabs.Trigger value="tab2" className="my-page__tab">
                주요 프로그램
              </Tabs.Trigger>
            </Tabs.List>
          </div>

          <Tabs.Content value="tab1">
            <>
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
            </>
          </Tabs.Content>
          <Tabs.Content value="tab2">
            <div>
              <MajorProgram programData={program} />
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </section>
    </>
  );
};

export default TabSection;
