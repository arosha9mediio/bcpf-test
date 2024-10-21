"use client";
import { isMobile } from "@/lib/utils";
import animationCharCome from "../../lib/utils/animationCharCome";
import { useEffect, useRef } from "react";

type CmsHeroVideoProps = {
  text: string;
  title: string;
  subtitle: string;
};

type CmsHeroVideoType = (props: CmsHeroVideoProps) => JSX.Element;

const CmsHeroVideo: CmsHeroVideoType = ({ text, title, subtitle }) => {
  const charAnim = useRef();
  useEffect(() => {
    animationCharCome(charAnim.current);
  }, []);
  return (
    <>
      <section className="career__top">
        <div className="career__top-title">
          <div className="container pt-120">
            <div className="row pb-12">
              <p className="hero__text-auth">{text}</p>
              <h1 className="hero__title" ref={charAnim}>
                {title}
              </h1>
              <p className="notice__subtitle">{subtitle}</p>
            </div>
          </div>
        </div>

        {/* <div className="career__thumb">
          <div className="container g-0">
            <div className="w-full inherit">
              <div className="career__top-img">
                <iframe
                  width="40"
                  height={isMobile() ? "210" : "700"}
                  src="https://www.youtube.com/embed/w2NVYG3OaZY?si=srYVq6Nj9Hvk0iTr&autoplay=1&loop=1"></iframe>
              </div>
            </div>
          </div>
        </div> */}
      </section>
    </>
  );
};

export default CmsHeroVideo;
