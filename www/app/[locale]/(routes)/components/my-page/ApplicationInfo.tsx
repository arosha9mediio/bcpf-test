"use client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "../plugins";
import CheckIcon from "/public/assets/imgs/icon/ic_check.png";
import ImgIcon from "/public/assets/imgs/icon/ic_img.png";
import PdfIcon from "/public/assets/imgs/icon/ic_pdf.png";
import VideoIcon from "/public/assets/imgs/icon/ic_video.png";

gsap.registerPlugin(ScrollTrigger);

const ApplicationInfo = () => {
  const teamItemContent = useRef();
  useEffect(() => {
    gsap.config({ nullTargetWarn: false });
    if (typeof window !== "undefined") {
      let device_width = window.innerWidth;
      let tHero = gsap.context(() => {
        gsap.set(".fade_bottom_3", { y: 30, opacity: 0 });

        if (device_width < 1023) {
          const fadeArray = gsap.utils.toArray(".fade_bottom_3");
          fadeArray.forEach((item, i) => {
            let fadeTl = gsap.timeline({
              scrollTrigger: {
                trigger: item as any,
                start: "top center+=200",
              },
            });
            fadeTl.to(item as any, {
              y: 0,
              opacity: 1,
              ease: "power2.out",
              duration: 1.5,
            });
          });
        } else {
          gsap.to(".fade_bottom_3", {
            scrollTrigger: {
              trigger: ".fade_bottom_3",
              start: "top center+=300",
              markers: false,
            },
            y: 0,
            opacity: 1,
            ease: "power2.out",
            duration: 1,
            stagger: {
              each: 0.2,
            },
          });
        }
      });
      return () => tHero.revert();
    }
  }, []);

  const handleSelectChange = event => {
    const selectedValue = event.target.value;

    // Handle the redirection based on the selected value
    switch (selectedValue) {
      case "1":
        window.location.href = "https://www.kcc.go.kr/user.do";
        break;
      case "2":
        window.location.href =
          "https://www.hometax.go.kr/websquare/websquare.wq?w2xPath=/ui/pp/index_pp.xml";
        break;
      case "3":
        window.location.href = "https://www.kca.kr/";
        break;
      case "4":
        window.location.href =
          "https://kcta.or.kr/kcta_new/Main.do?SITE_ID=KCTA";
        break;
      default:
        break;
    }
  };

  return (
    <>
      <section>
        <div className="my-page__form">
          <form className="flex align-center">
            <div className="row g-3 mr-6">
              <select defaultValue="전체" onChange={handleSelectChange}>
                <option value="1">전체</option>
                <option value="2">공지</option>
                <option value="3">공고</option>
                <option value="4">결과</option>
              </select>
            </div>
            <div className="row g-3 mr-6">
              <div className="col-xxl-6 col-xl-6 col-12">
                <input type="text" name="name" placeholder="Name *" />
              </div>
            </div>
            <div className="flex align-center">
              <button>검색</button>
            </div>
          </form>
        </div>

        <div className="flex flex-wrap mt-8">
          <div className="w-full">
            <div className="my-page__table-wrapper">
              <div className="my-page__table-head fade_bottom_3">
                <h3>지원 분야</h3>
                <h3>팀명/작품명</h3>
                <h3 className="text-center">공모진행여부</h3>
                <h3 className="text-center">신청일자</h3>
                <h3>업로드</h3>
              </div>

              <Link href="/team-details">
                <div className="my-page__table-content fade_bottom_3">
                  <p className="tm-name">
                    2024년 제8회 크리에이터 양성 [1인방송스쿨] 대면심사 안내
                  </p>
                  <p className="tm-name">일부 무작위 경쟁 이름</p>
                  <div className="flex items-center justify-center">
                    <Image
                      priority
                      style={{ width: "24px", height: "24px" }}
                      src={CheckIcon}
                      alt="check icon"
                    />
                  </div>
                  <p className="text-center">2024.05.23</p>
                  <div className="flex items-center justify-end">
                    <Image
                      priority
                      style={{ width: "24px", height: "24px" }}
                      src={ImgIcon}
                      alt="image icon"
                    />
                    <Image
                      priority
                      style={{ width: "24px", height: "24px" }}
                      src={PdfIcon}
                      alt="pdf icon"
                    />
                    <Image
                      priority
                      style={{ width: "24px", height: "24px" }}
                      src={VideoIcon}
                      alt="video icon"
                    />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ApplicationInfo;
