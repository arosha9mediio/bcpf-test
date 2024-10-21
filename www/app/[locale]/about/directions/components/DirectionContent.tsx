"use client";
import { gsap } from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "../../../(routes)/components/plugins";
import { Button } from "@/components/ui/button";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);
const DirectionContent = () => {
  return (
    <>
      <section className="service__area-3">
        <div className="container">
          <div className="lg:flex justify-between">
            <div className="w-full lg:w-1/2 lg:pr-24">
              <Map
                center={{ lat: 37.53615436148611, lng: 126.89481834196775 }}
                style={{ width: "100%", height: "360px" }}>
                <MapMarker
                  position={{
                    lat: 37.536154361486115,
                    lng: 126.89481834196775,
                  }}>
                  <div style={{ color: "#000" }}>방송콘텐츠진흥재단</div>
                </MapMarker>
              </Map>
            </div>
            <div className="lg:w-1/2 lg:mt-0 mt-8">
              <div className="sec-direction-wrapper">
                <h2 className="title-anim">주소</h2>
                <p>
                  서울 영등포구 선유로 49길 23, (양평동 4가) 2차
                  아이에스BIZ타워2차 1002호
                </p>

                <h2 className="sec-title title-anim">오시는 길</h2>
                <p>9호선 선유도역에서 500미터 아이에스BIZ타워2차 1002호</p>

                <h2 className="sec-title title-anim">전화번호</h2>
                <p>02-6123-4300~5</p>

                <Link
                  href={{
                    pathname: `https://kko.to/o81mWrAtgh`,
                    // query: { ...{ page: fPage, ...searchParams } },
                  }}
                  target="_blank"
                  prefetch={false}>
                  <Button
                    variant="default"
                    className="bg-black hover:bg-black/95">
                    지도보기
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DirectionContent;
