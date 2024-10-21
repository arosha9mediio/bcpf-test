"use client";
import { gsap } from "gsap";
import Image from "next/image";
import { useRef } from "react";
import { ScrollTrigger } from "../../../(routes)/components/plugins";
import { Button } from "@/components/ui/button";
import MapImage from "/public/assets/imgs/feature/map.png";
import SubwayMap from "/public/assets/imgs/feature/subway.png";
import TrainMap from "/public/assets/imgs/feature/train.png";
import CarMap from "/public/assets/imgs/feature/car.png";
import { CarFront, TrainFront, TrainFrontTunnel } from "lucide-react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);
const DirectionContentSchool = () => {
  const serviceList = useRef();

  return (
    <>
      <section className="service__area-directions">
        <div className="container">
          <div className="lg:flex justify-between">
            <div className="w-full lg:w-1/2">
              <h2 className="sec-direction title-anim">학교위치</h2>
              <Map
                center={{ lat: 36.722392952850775, lng: 126.91979837908839 }}
                style={{ width: "100%", height: "360px" }}>
                <MapMarker
                  position={{
                    lat: 36.7223929528507755,
                    lng: 126.91979837908839,
                  }}>
                  <div style={{ color: "#000", border: "0px solid #eeeeee" }}>
                    BCPF콘텐츠학교
                  </div>
                </MapMarker>
              </Map>
              <p>
                <strong>주소:</strong> 충청남도 아산시 도고면 도고산로 227번길 6
              </p>

              <Link
                href={{
                  pathname: `https://kko.to/8IEBJXsSu3`,
                  // query: { ...{ page: fPage, ...searchParams } },
                }}
                target="_blank"
                prefetch={false}>
                <Button
                  variant="default"
                  className="bg-black hover:bg-black/95 mt-4 dark:bg-white">
                  지도보기
                </Button>
              </Link>
            </div>
            <div className="lg:mt-0 mt-8">
              <div>
                <h2 className="text-xl title-anim">오시는 길 안내</h2>
                <div className="flex w-full gap-4 mt-4">
                  <div className="bg-[#D7DDE3] aspect-square flex flex-col justify-center text-center align-center w-[80px] md:w-[110px] rounded-lg">
                    <p className="text-lg">지하철</p>
                    <div className="flex justify-center">
                      <TrainFront className="w-8 h-8" />
                    </div>
                  </div>
                  <div className="pt-4">
                    <Image alt="subway map" src={SubwayMap} />
                    <ul className="mt-8 mb-4">
                      <li>• 청량리에서 신창행 지하철 탑승</li>
                      <li>• 신창역에서 하차</li>
                      <li>• 신창역 택시정류장에서 택시탑승</li>
                    </ul>
                  </div>
                </div>

                <div className="flex w-full gap-4 mt-8">
                  <div className="bg-[#D7DDE3] aspect-square flex flex-col justify-center text-center align-center w-[80px] md:w-[110px] rounded-lg">
                    <p className="text-lg">기차</p>
                    <div className="flex justify-center">
                      <TrainFrontTunnel className="w-8 h-8" />
                    </div>
                  </div>
                  <div className="pt-4">
                    <Image alt="subway map" src={TrainMap} />
                    <ul className="mt-8 mb-4">
                      <li>• 용산역에서 도고온천역 방향으로 탑승</li>
                      <li>• 도고온천역에서 410번 버스로 이동</li>
                    </ul>
                  </div>
                </div>

                <div className="flex w-full gap-4 mt-8">
                  <div className="bg-[#D7DDE3] aspect-square flex flex-col justify-center text-center align-center w-[80px] md:w-[110px] rounded-lg">
                    <p className="text-lg">자가용</p>
                    <div className="flex justify-center">
                      <CarFront className="w-8 h-8" />
                    </div>
                  </div>
                  <div className="pt-4">
                    <Image alt="subway map" src={CarMap} />
                    <ul className="mt-8 mb-4">
                      <h3>경부고속도로</h3>
                      <li>• (서울기준) 한남대교에서 양재IC방향</li>
                      <li>• 경부고속도로</li>
                      <li>• 천안IC 21번국도</li>
                      <li>• 순천향대학교</li>
                      <li>• 도고온천역 도고저수지 방향으로 5km</li>
                    </ul>
                    <ul className="mt-8 mb-4">
                      <h3>서해안고속도로</h3>
                      <li>• (서울기준) 양화대교</li>
                      <li>• 서해안고속도로</li>
                      <li>• 서평택IC</li>
                      <li>• 아산만방조제방향으로 이동</li>
                      <li>• 순천향대학교</li>
                      <li>• 도고온천역 도고저수지 방향으로 5km</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DirectionContentSchool;
