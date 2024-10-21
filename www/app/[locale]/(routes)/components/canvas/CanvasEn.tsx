import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "./styles.css";
import logoWhite2 from "/public/assets/imgs/logo/site-logo-white-2.png";
import Shape11 from "/public/assets/imgs/shape/11.png";
import Shape12 from "/public/assets/imgs/shape/12.png";

const CanvasEn = ({ bladeMode = "", ofCanvasArea }) => {
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
  const closeCanvasEn = () => {
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
                      <Link href={"/home"}>Home</Link>
                    </div>
                  </li>

                  <li>
                    <div className="header_title">
                      <Link href={"/about/introduction/introduce"}>
                        About Us
                      </Link>
                    </div>
                  </li>

                  <li>
                    <div className="header_title d-flex">
                      <Link href={"/content/promotion/drama-contest"}>
                        Projects
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
                      <li>
                        <Link href={"/content/promotion/drama-contest"}>
                          TV Drama Script
                        </Link>
                      </li>
                      <li>
                        <Link href={"/content/promotion/youth-documentary"}>
                          Youth Documentary
                        </Link>
                      </li>
                      <li>
                        <Link href={"/content/promotion/global-documentary"}>
                          Documentary Production
                        </Link>
                      </li>
                      <li>
                        <Link href={"/content/promotion/creator-training"}>
                          Creator Training
                        </Link>
                      </li>
                      <li>
                        <Link href={"/content/promotion/single-award"}>
                          BCPF Single Award
                        </Link>
                      </li>
                      <li>
                        <Link href={"/content/promotion/public-interest"}>
                          Public Video
                        </Link>
                      </li>
                      <li>
                        <Link href={"/content/promotion/community-project"}>
                          Regional Revitalization
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <div className="header_title d-flex">
                      <Link href={"/content/research/broadcast-conference"}>
                        Research
                      </Link>
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
                          <Link href={"/content/research/broadcast-conference"}>
                            Broadcast Content Conference
                          </Link>
                        </div>
                      </li>
                      <li className="sub_header_title">
                        <div className="third-header">
                          <Link href={"/content/research/publication"}>
                            Quarterly Published Research
                          </Link>
                        </div>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <div className="header_title">
                      <Link href={"/school/introduction"}>BCPF School</Link>
                    </div>
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
              <h3>Contact Us</h3>
              <ul>
                <li>
                  <a href="tel:02094980547">(02) - 6123 - 4300 ~ 5</a>
                </li>
                <li>
                  <a href="mailto:info@extradesign.com">info@extradesign.com</a>
                </li>
                <li>
                  1002, 2nd IS Biz Tower, 23 Seonyu-ro 49-gil, Yeongdeungpo-gu,
                  Seoul, 07208, South Korea
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
            <button type="button" onClick={closeCanvasEn}>
              <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CanvasEn;
