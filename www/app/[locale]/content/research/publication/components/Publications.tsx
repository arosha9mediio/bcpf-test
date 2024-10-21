"use client";
import React, { useState } from "react";
import Head from "next/head";
import "/public/assets/scss/master.scss";
import CmsHero from "@/app/[locale]/(routes)/components/cms/CmsHero";
import Image from "next/image";
import SwiperGallery from "@/app/[locale]/(routes)/components/SwiperGallery";
import { publicationData } from "./PublicationData";
import Link from "next/link";
import { useParams } from "next/navigation";

const Publications = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const params = useParams();
  const locale = params?.locale;

  return (
    <>
      <div className="pt-12">
        {locale == "ko" ? (
          <div style={{ wordBreak: "keep-all" }}>
            <h2 className="text-4xl font-bold">계간지·연구보고서 발간</h2>
            <p className="mt-4 text-xl">
              Content Future 계간지, 4차산업혁명시대의 방송콘텐츠개발방향, 1인
              미디어 사회적 연구 등 다양한 연구보고서 발간
            </p>
          </div>
        ) : (
          <div style={{ wordBreak: "keep-all" }}>
            <h2 className="text-4xl font-bold">
              Publishing Quarterly Research Report
            </h2>
            <p className="mt-4 text-xl">
              Publishing Quarterly Research Report Publishing Content Future
              quarterly magazine and various research reports on various
              subjects on the broadcasting content development direction in the
              era of the 4th Industrial Revolution and social research on
              one-man media
            </p>
          </div>
        )}

        <div className="mt-20">
          {locale == "ko" ? (
            <h3 className="text-2xl font-bold mb-8">주요 연구보고서</h3>
          ) : (
            <h3 className="text-2xl font-bold mb-8">Major Research Reports</h3>
          )}
          <div className="grid md:grid-cols-4 gap-12 mt-8">
            {publicationData.map(data => (
              <div key={data.id} className="awards__content md:mb-12">
                <Link href={data.link} download>
                  <article className="blog__item">
                    <div className="blog__img-wrapper">
                      <div className="img-box-2">
                        <Image
                          priority
                          style={{
                            width: "auto",
                            height: "auto",
                            objectFit: "cover",
                          }}
                          className="image-box__item border-2 border-slate-200"
                          src={data.image}
                          alt="Blog Thumbnail"
                        />
                        <Image
                          priority
                          style={{
                            width: "auto",
                            height: "auto",
                            objectFit: "cover",
                          }}
                          className="image-box__item border-2 border-slate-200"
                          src={data.image}
                          alt="Blog Thumbnail"
                        />
                      </div>
                    </div>
                    <h4>{data.date}</h4>
                    <p>{data.title}</p>
                    {locale == "ko" ? <p>{data.sub}</p> : <p>{data.sub2}</p>}
                  </article>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Publications;
