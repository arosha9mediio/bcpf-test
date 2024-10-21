"use client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { gsap } from "gsap";
import { useEffect, useMemo, useRef } from "react";
import "./styles.css";
import { useNextTableStore } from "@/store/useNextTableStore";
import { animateSubtitle, animateTitle } from "./animate";
import { useParams } from "next/navigation";

type BroadcastHeroProps = {
  text: string;
  title: string;

  hasSubtitle: boolean;
  countPrefix?: string;
  countSuffix?: string;

  idProp?: string;
};

type BroadcastHeroType = (props: BroadcastHeroProps) => JSX.Element;

const BroadcastHero: BroadcastHeroType = ({
  text,
  title,
  countPrefix,
  countSuffix,
  hasSubtitle = false,
  idProp = "slug",
}) => {
  const heroTitle = useRef();
  const heroSubTitle = useRef();
  const { count } = useNextTableStore();
  const params = useParams();

  const subTitle = useMemo(() => countPrefix + count + countSuffix, [count]);

  const isOnView = useMemo(() => Boolean(params?.[idProp]), [params]);

  // INITIAL RENDER
  useEffect(() => {
    const animateHeroTitle = gsap.context(() => {
      animateTitle(heroTitle);
      animateSubtitle(heroSubTitle);
    });

    return () => animateHeroTitle.revert();
  }, []);

  // On COUNT CHANGE
  useEffect(() => {
    const animateHeroSubtitle = gsap.context(() => {
      animateSubtitle(heroSubTitle);
    });

    return () => animateHeroSubtitle.revert();
  }, [count]);

  // Array of class names
  const classNames = [
    "broadcast__area-cms1",
    "broadcast__area-cms2",
    "broadcast__area-cms3",
    "broadcast__area-cms4",
    "broadcast__area-cms5",
    "broadcast__area-cms6",
    "broadcast__area-cms7",
    "broadcast__area-cms8",
  ];

  // Randomly select one class name from the array
  const sectionClassName =
    classNames[Math.floor(Math.random() * classNames.length)];

  return (
    <>
      <section
        // className="broadcast__area-notice"
        className={sectionClassName}>
        <div className="container ">
          <div className="bg-black/20 backdrop-blur-sm w-fit p-3 rounded-md">
            <p className="hero__text-auth">{text}</p>
            <h1 className="hero__title" ref={heroTitle}>
              {title}
            </h1>
            {hasSubtitle && !isOnView && (
              <p
                // key={`count-${itemCount}`}
                className="notice__subtitle"
                ref={heroSubTitle}>
                {subTitle}
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default BroadcastHero;
