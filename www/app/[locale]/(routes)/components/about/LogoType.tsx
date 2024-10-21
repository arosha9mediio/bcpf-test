"use client";
import { gsap } from "gsap";
import Image from "next/image";
import { useRef } from "react";

import { ScrollTrigger } from "../../../(routes)/components/plugins";
import Logotype from "/public/assets/imgs/about/ci/1.png";
import Logotype2 from "/public/assets/imgs/about/ci/2.png";
import { Button } from "@/components/ui/button";
import { downloadFile } from "@/utils/files";

gsap.registerPlugin(ScrollTrigger);
const LogoType = () => {
  const serviceList = useRef();

  const handleDownload = () =>
    downloadFile("/assets/zip/logo-type.zip", "logo-type.zip");

  return (
    <div className="lg:flex justify-between pb-24">
      <div className="w-full lg:w-1/2 lg:pr-12">
        <div className="sec-title-wrapper">
          <h2 className="sec-title title-anim leading-8">
            방송콘텐츠진흥재단의 시그니처는 디지털 방송과 웹 3.0시대의 꿈을
            실현한다는 재단의 비전을 나타내고 있습니다
          </h2>
          <ul className="pl-6" style={{ wordBreak: "keep-all" }}>
            <li className="mt-4" style={{ listStyleType: "disc" }}>
              방송전파를 상징하는 4개의 원조각들은 1인 미디어, OTT 플랫폼,
              레거시 미디어, AI콘텐츠 등 미디어 환경에 중심이 되는 4부분을
              표현한 것입니다. 동시에 다양한 컬러를 통해 급변하고 있는 미디어
              환경 속에서 더욱 중요 해지는 콘텐츠의 다양성을 강조했습니다
            </li>
            <li className="mt-4" style={{ listStyleType: "disc" }}>
              색동 이미지와 붓 번짐 효과를 통해 글로벌 시대에 더욱 강조되는
              한국적 인 고유 이미지를 담고자 했습니다. CI에 담긴 정신을 바탕으로
              우리 방송 에 필요한 공공성, 공익성, 창의성 있는 방송 콘텐츠 발전에
              밑거름 역할을 할 수 있도록 노력하겠습니다
            </li>
          </ul>
          <Button
            variant="default"
            className="dark:bg-white mt-8 bg-black hover:bg-black/95"
            onClick={handleDownload}>
            로고 다운로드하기
          </Button>
        </div>
      </div>
      <div className="lg:w-1/2 lg:pl-12">
        <Image alt="Logo Type" style={{ width: "100%" }} src={Logotype} />
        <p className="text-lg mt-8 font-semibold">색상규정심볼</p>
        <Image
          alt="Logo Type"
          style={{ width: "100%" }}
          src={Logotype2}
          className="mt-2"
        />
      </div>
    </div>
  );
};

export default LogoType;
