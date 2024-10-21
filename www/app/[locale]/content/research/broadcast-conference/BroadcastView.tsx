"use client";
import React, { useState } from "react";
import "/public/assets/scss/master.scss";
import SwiperGallery from "@/app/[locale]/(routes)/components/SwiperGallery";
import { conferenceData } from "./Data";
import { conferenceDataEn } from "./DataEn";
import { useParams } from "next/navigation";

const BroadcastView = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const params = useParams();
  const locale = params?.locale;

  return (
    <section className="service__area-3 pb-150 pt-12 sm:pt-150">
      <div className="container">
        {locale == "ko" ? (
          <div style={{ wordBreak: "keep-all" }}>
            <h2 className="text-4xl font-bold">
              방송콘텐츠 컨퍼런스 및 포럼 개최
            </h2>
            <p className="mt-4 text-xl">
              OTT 플랫폼, 인공지능, 1인 크리에이터, 드라마 등 방송 콘텐츠 관련
              컨퍼런스 개최를 통해 급변하는 미디어 환경 속에서 콘텐츠의 방향과
              트렌드, 국내 미디어 산업 성장 방안 모색
            </p>

            <div className="mt-20">
              <h3 className="text-2xl font-bold mb-8">주요 조사연구사업</h3>
              <div className="sm:grid sm:grid-cols-2 gap-12 mt-8">
                {conferenceData.map(data => (
                  <div key={data.id} className="awards__content">
                    <article className="gallery__item">
                      <div className="gallery__img-wrapper">
                        <SwiperGallery
                          images={data.images}
                          thumbsSwiper={thumbsSwiper}
                          setThumbsSwiper={setThumbsSwiper}
                        />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mt-4">
                          {data.t1}
                        </h4>
                        <p className="blog__item">{data.t2}</p>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ wordBreak: "keep-all" }}>
            <h2 className="text-4xl font-bold">
              Hosting Broadcast Content Conference and Forum
            </h2>
            <p className="mt-4 text-xl">
              Hold conferences related to broadcast content, such as OTT
              platforms, artificial intelligence, solo creators, and dramas, to
              explore the direction and trends of content and ways to grow the
              domestic media industry in a rapidly changing media environment
            </p>

            <div className="mt-20">
              <h3 className="text-2xl font-bold mb-8">
                Major Research and Survey Projects
              </h3>
              <div className="sm:grid sm:grid-cols-2 gap-12 mt-8">
                {conferenceDataEn.map(data => (
                  <div key={data.id} className="awards__content">
                    <article className="gallery__item">
                      <div className="gallery__img-wrapper">
                        <SwiperGallery
                          images={data.images}
                          thumbsSwiper={thumbsSwiper}
                          setThumbsSwiper={setThumbsSwiper}
                        />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mt-4">
                          {data.t1}
                        </h4>
                        <p className="blog__item">{data.t2}</p>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BroadcastView;
