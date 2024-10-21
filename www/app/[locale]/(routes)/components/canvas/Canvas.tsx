import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "./styles.css";
import logoWhite2 from "/public/assets/imgs/logo/site-logo-white-2.png";
import Shape11 from "/public/assets/imgs/shape/11.png";
import Shape12 from "/public/assets/imgs/shape/12.png";

const Canvas = ({ bladeMode = "", ofCanvasArea }) => {
  const [accordion, setAccordion] = useState(0);
  const [subAccordion, setSubAccordion] = useState(0);
  const headerTitle = useRef();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        //@ts-ignore
        let rootParent = headerTitle.current.children;
        for (let i = 0; i < rootParent.length; i++) {
          let firstParent = rootParent[i].children;
          for (let j = 0; j < firstParent.length; j++) {
            if (firstParent[j].className.includes("header_title")) {
              let arr = firstParent[j].children[0].textContent.split("");
              let spanData = "";
              for (let k = 0; k < arr.length; k++) {
                if (arr[k] == " ") {
                  spanData += `<span style='width:2vw;'>${arr[k]}</span>`;
                } else {
                  spanData += `<span>${arr[k]}</span>`;
                }
              }
              let result = '<div class="menu-text">' + spanData + "</div>";
              firstParent[j].children[0].innerHTML = result;
            }
          }
        }
      }, 10);
    }
  }, []);
  const openData = data => {
    setAccordion(data);
  };
  const openSubData = data => {
    setSubAccordion(data);
  };
  const closeCanvas = () => {
    ofCanvasArea.current.style.opacity = "0";
    ofCanvasArea.current.style.visibility = "hidden";
    if (bladeMode) {
      let header_bg = bladeMode;
      //@ts-ignore
      header_bg.style.setProperty("mix-blend-mode", "exclusion");
    }
  };
  return (
    <>
      <div className="offcanvas__area" ref={ofCanvasArea}>
        <div className="offcanvas__body">
          <div className="offcanvas__left">
            <div className="offcanvas__logo">
              <Link href="/home">
                <Image
                  priority
                  style={{ width: "auto", height: "auto" }}
                  src={logoWhite2}
                  alt="Offcanvas Logo"
                />
              </Link>
            </div>
            <div className="offcanvas__social">
              <h3 className="social-title">Follow Us</h3>
              <ul>
                <li>
                  <a href="https://www.facebook.com/bcpf.or.kr">facebook</a>
                </li>
                <li>
                  <a href="https://www.youtube.com/@bcpf">Youtube</a>
                </li>

                <li>
                  <a href="https://www.instagram.com/bcpf_official/">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/company/b-c-p-f/">
                    Linkedin
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="offcanvas__mid">
            <div className="offcanvas__menu-wrapper">
              <nav className="offcanvas__menu">
                <ul className="menu-anim title" ref={headerTitle}>
                  <li>
                    <div className="header_title">
                      <Link href={"/home"}>홈</Link>
                    </div>
                  </li>

                  <li>
                    <div className="header_title d-flex">
                      <Link href={"/content/promotion/drama-contest"}>
                        주요사업
                      </Link>
                      <div className="accordian-btn">
                        {accordion === 3 ? (
                          <div>
                            <a onClick={() => openData(0)}>-</a>
                          </div>
                        ) : (
                          <div>
                            <a onClick={() => openData(3)}>+</a>
                          </div>
                        )}
                      </div>
                    </div>
                    <ul
                      className="sub_title"
                      style={
                        accordion === 3 ? { display: "" } : { display: "none" }
                      }>
                      <li className="sub_header_title">
                        <div className="third-header">
                          <Link href={"/content/promotion/drama-contest"}>
                            진흥사업
                          </Link>
                          <div className="sub-accordian-btn">
                            {subAccordion === 3.1 ? (
                              <a onClick={() => openSubData(3)}>-</a>
                            ) : (
                              <a onClick={() => openSubData(3.1)}>+</a>
                            )}
                          </div>
                        </div>
                        <ul
                          className="sub_title_2 "
                          style={
                            subAccordion === 3.1
                              ? { display: "" }
                              : { display: "none" }
                          }>
                          <li>
                            <Link href={"/content/promotion/drama-contest"}>
                              드라마극본공모전
                            </Link>
                          </li>
                          <li>
                            <Link href={"/content/promotion/youth-documentary"}>
                              청년다큐멘터리감독지원사업
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={"/content/promotion/global-documentary"}>
                              다큐멘터리 제작지원
                            </Link>
                          </li>
                          <li>
                            <Link href={"/content/promotion/creator-training"}>
                              크리에이터 양성
                            </Link>
                          </li>
                          <li>
                            <Link href={"/content/promotion/single-award"}>
                              BCPF 대한민국 1인방송대상
                            </Link>
                          </li>
                          <li>
                            <Link href={"/content/promotion/public-interest"}>
                              공익 영상공모전
                            </Link>
                          </li>
                          <li>
                            <Link href={"/content/promotion/community-project"}>
                              지역살리기프로젝트
                            </Link>
                          </li>
                        </ul>
                      </li>
                      {/* <li className="sub_header_title">
                        <div className="third-header">
                          <Link href={"/portfolio"}>교육사업</Link>
                        </div>
                      </li> */}
                      <li className="sub_header_title">
                        <div className="third-header">
                          <Link href={"/content/research/broadcast-conference"}>
                            조사연구사업
                          </Link>
                          <div className="sub-accordian-btn">
                            {subAccordion === 3.2 ? (
                              <a onClick={() => openSubData(3)}>-</a>
                            ) : (
                              <a onClick={() => openSubData(3.2)}>+</a>
                            )}
                          </div>
                        </div>
                        <ul
                          className="sub_title_2 "
                          style={
                            subAccordion === 3.2
                              ? { display: "" }
                              : { display: "none" }
                          }>
                          <li>
                            <Link
                              href={"/content/research/broadcast-conference"}>
                              방송콘텐츠 컨퍼런스 및 포럼
                            </Link>
                          </li>
                          <li>
                            <Link href={"/content/research/publication"}>
                              계간지·연구보고서 발간
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <div className="header_title d-flex">
                      <Link href={"/school/introduction"}>BCPF콘텐츠학교</Link>
                      <div className="accordian-btn">
                        {accordion === 4 ? (
                          <div>
                            <a onClick={() => openData(0)}>-</a>
                          </div>
                        ) : (
                          <div>
                            <a onClick={() => openData(4)}>+</a>
                          </div>
                        )}
                      </div>
                    </div>
                    <ul
                      className="sub_title"
                      style={
                        accordion === 4 ? { display: "" } : { display: "none" }
                      }>
                      <li className="sub_header_title">
                        <div className="third-header">
                          <Link href={"/school/introduction"}>학교소개</Link>
                        </div>
                      </li>
                      <li className="sub_header_title">
                        <div className="third-header">
                          <Link href={"/school/facility"}>학교시설</Link>
                        </div>
                      </li>
                      <li className="sub_header_title">
                        <div className="third-header">
                          <Link href={"/school/major-program"}>
                            주요 프로그램
                          </Link>
                        </div>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <div className="header_title d-flex">
                      <Link href={"/about/introduction/introduce"}>
                        재단소개
                      </Link>
                      <div className="accordian-btn bg-white bg-opacity-10 p-4 px-6">
                        {accordion === 5 ? (
                          <div>
                            <a onClick={() => openData(0)}>-</a>
                          </div>
                        ) : (
                          <div>
                            <a onClick={() => openData(5)}>+</a>
                          </div>
                        )}
                      </div>
                    </div>
                    <ul
                      className="sub_title text-white"
                      style={
                        accordion === 5 ? { display: "" } : { display: "none" }
                      }>
                      <li className="sub_header_title">
                        <div className="third-header">
                          <Link href={"/about/introduction/introduce"}>
                            소개
                          </Link>
                          <div className="sub-accordian-btn">
                            {subAccordion === 5.1 ? (
                              <a onClick={() => openSubData(5)}>-</a>
                            ) : (
                              <a onClick={() => openSubData(5.1)}>+</a>
                            )}
                          </div>
                        </div>
                        <ul
                          className="sub_title_2 "
                          style={
                            subAccordion === 5.1
                              ? { display: "" }
                              : { display: "none" }
                          }>
                          <li>
                            <Link href={"/about/introduction/introduce"}>
                              방송콘텐츠진흥재단 소개
                            </Link>
                          </li>
                          {/* <li>
                            <Link
                              href={"/about/introduction/directors-greeting"}>
                              이사장 인사말
                            </Link>
                          </li> */}
                          <li>
                            <Link href={"/about/introduction/history"}>
                              연혁
                            </Link>
                          </li>
                          <li>
                            <Link href={"/about/introduction/ci"}>재단 CI</Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link href={"/about/organization"}>조직도</Link>
                      </li>
                      <li>
                        <Link href={"/donation"}>후원안내</Link>
                      </li>
                      <li>
                        <Link href={"/about/directions"}>오시는 길</Link>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <div className="header_title d-flex">
                      <Link href={"/post/notice"}>공지사항</Link>
                      <div className="accordian-btn bg-white bg-opacity-10 p-4 px-6">
                        {accordion === 6 ? (
                          <div>
                            <a onClick={() => openData(0)}>-</a>
                          </div>
                        ) : (
                          <div>
                            <a onClick={() => openData(6)}>+</a>
                          </div>
                        )}
                      </div>
                    </div>
                    <ul
                      className="sub_title text-white"
                      style={
                        accordion === 6 ? { display: "" } : { display: "none" }
                      }>
                      <li>
                        <Link href={"/post/notice"}>사업공고 및 소식</Link>
                      </li>
                      <li>
                        <Link href={"/post/press"}>보도자료</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="offcanvas__right">
            <div className="offcanvas__search">
              {/* <form action="#">
                <input type="text" name="search" placeholder="Search keyword" />
                <button>
                  <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
                </button>
              </form> */}
            </div>
            <div className="offcanvas__contact">
              <h3>연락하기</h3>
              <ul>
                <li>
                  <a href="tel:02094980547">(02) - 6123 - 4300 ~ 5</a>
                </li>
                <li>
                  <a href="mailto:info@extradesign.com">info@extradesign.com</a>
                </li>
                <li>
                  (07208) 서울 영등포구 선유로 49길 23, 2차 IS비즈타워 1002호
                </li>
              </ul>
            </div>
            <Image
              priority
              style={{ width: "auto", height: "auto" }}
              src={Shape11}
              alt="shape"
              className="shape-1"
            />
            <Image
              priority
              style={{ width: "auto", height: "auto" }}
              src={Shape12}
              alt="shape"
              className="shape-2"
            />
          </div>
          <div className="offcanvas__close">
            <button type="button" onClick={closeCanvas}>
              <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Canvas;
