import CheckIcon from "/public/images/contest.svg";
import Image from "next/image";
import React from "react";
import { isMobile } from "@/lib/utils";

type ContextImageProps = {
  src?: string;
};

type ContextImageType = (props: ContextImageProps) => JSX.Element;

const ContextImage: ContextImageType = ({ src }) => {
  return (
    <div>
      <div className="sticky top-20 md:ml-[100px]">
        <Image
          priority
          src={src || CheckIcon}
          alt="image icon"
          width={600}
          height={isMobile() ? 400 : 600}
          style={{ objectFit: "contain" }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
};

export default ContextImage;
