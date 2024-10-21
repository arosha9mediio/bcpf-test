"use client";
import { gsap } from "gsap";
import Image from "next/image";
import { useRef } from "react";

import { ScrollTrigger } from "../../../(routes)/components/plugins";
import Logotype from "/public/assets/imgs/about/ci/1.png";
import Logotype3 from "/public/assets/imgs/about/ci/3.png";
import Logotype4 from "/public/assets/imgs/about/ci/4.png";
import Logotype3_dark from "/public/assets/imgs/about/ci/3_dark.png";
import Logotype4_dark from "/public/assets/imgs/about/ci/4_dark.png";
import { Button } from "@/components/ui/button";
import { downloadFile } from "@/utils/files";

gsap.registerPlugin(ScrollTrigger);
const LogoVariations = () => {
  const serviceList = useRef();

  const handleDownload = () =>
    downloadFile("/assets/zip/combination.zip", "combination.zip");

  return (
    <div className="w-full">
      <div className="lg:flex justify-between pt-12 pb-24">
        <div className="lg:w-1/2 lg:pr-12">
          <p className="text-lg mb-8 font-semibold">세로조합</p>
          <div className="logo-dark">
            <Image
              alt="Logo Type"
              style={{ width: "100%" }}
              src={Logotype3}
              className="mt-2"
            />
          </div>
          <div className="logo-light">
            <Image
              alt="Logo Type"
              style={{ width: "100%" }}
              src={Logotype3_dark}
              className="mt-2"
            />
          </div>
        </div>
        <div className="lg:w-1/2 lg:pl-12">
          <p className="text-lg mb-8 font-semibold">영문조합</p>
          <div className="logo-dark">
            <Image
              alt="Logo Type"
              style={{ width: "100%" }}
              src={Logotype4}
              className="mt-2"
            />
          </div>
          <div className="logo-light">
            <Image
              alt="Logo Type"
              style={{ width: "100%" }}
              src={Logotype4_dark}
              className="mt-2"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center align-center">
        <Button
          variant="default"
          className="dark:bg-white mt-8 bg-black hover:bg-black/95"
          onClick={handleDownload}>
          다운로드하기
        </Button>
      </div>
    </div>
  );
};

export default LogoVariations;
