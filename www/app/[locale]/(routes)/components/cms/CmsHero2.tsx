"use client";
import VideoFrame from "/public/assets/imgs/essential-img/video-frame.png";
import SvgStar from "/public/assets/imgs/essential-img/svgstar.png";
import Shape24 from "/public/assets/imgs/shape/24.png";
import BackImage from "/public/assets/imgs/essential-img/cutting_image.png";
import Image from "next/image";
import { isMobile } from "@/lib/utils";

const CmsHero2 = () => {
  return (
    <>
      <div className="single__image-8 pt-130 pb-200 text-center sp-x">
        <div className="col-lg-10 text-center m-auto">
          <div className="singlecontent">
            <div className="header__cms-wrapper video-frame">
              <p>주요사업</p>
              <h2>진흥사업</h2>
              {!isMobile() && (
                <h3>
                  대한민국
                  <br /> 1인방송대상
                </h3>
              )}
            </div>
            <div className="single__thumb">
              {/* <video loop muted autoPlay playsInline>
                <source src="assets/video/video.mp4" type="video/mp4" />
              </video> */}
              <Image
                priority
                style={{ width: "100%", height: "100%" }}
                src={BackImage}
                alt="image"
                className="img-anim"
              />
              <Image
                priority
                style={{ width: "100%", height: "100%" }}
                src={VideoFrame}
                alt="image"
                className="video-frame"
              />
              <Image
                priority
                width={113}
                style={{ height: "auto" }}
                className="svgstar"
                src={SvgStar}
                alt="shape"
              />
              <Image
                priority
                width={77}
                style={{ height: "auto" }}
                src={Shape24}
                alt="shape"
                className="shape-2"
              />
            </div>
            {isMobile() && (
              <div className="header__cms-wrapper">
                <h3>
                  대한민국
                  <br /> 1인방송대상
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CmsHero2;
