"use client";
import { gsap } from "gsap";
import Image from "next/image";
import { useRef } from "react";

import { ScrollTrigger } from "../../../(routes)/components/plugins";
import Logotype5 from "/public/assets/imgs/about/ci/5.png";
import Logotype5_dark from "/public/assets/imgs/about/ci/5_dark.png";
import { Button } from "@/components/ui/button";
import { downloadFile } from "@/utils/files";

gsap.registerPlugin(ScrollTrigger);
const LogoReverse = () => {
  const serviceList = useRef();

  const handleDownload = async () =>
    downloadFile("/assets/zip/reverse.zip", "reverse.zip");

  return (
    <div className="w-full">
      <div className="lg:flex flex-col align-center justify-center pt-4 pb-4">
        <p className="text-lg mb-4 font-semibold">세로조합</p>
        <div className="logo-dark">
          <Image
            alt="Logo Type"
            style={{ width: "80%" }}
            src={Logotype5}
            className="mt-2"
          />
        </div>
        <div className="logo-light">
          <Image
            alt="Logo Type"
            style={{ width: "80%" }}
            src={Logotype5_dark}
            className="mt-2"
          />
        </div>
      </div>
      <Button
        variant="default"
        className="dark:bg-white mt-8 bg-black hover:bg-black/95"
        onClick={handleDownload}>
        다운로드하기
      </Button>
    </div>
  );
};

export default LogoReverse;
