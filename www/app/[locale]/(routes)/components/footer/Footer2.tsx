"use client";
import Link from "next/link";
import logoWhite2 from "/public/assets/imgs/logo/site-logo-white-2.png";
import logoBlack from "/public/assets/imgs/logo/logo-black.png";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Footer2() {
  const menuAnim = useRef();
  useEffect(() => {
    if (menuAnim.current) {
      menuAnimation();
    }
  }, []);
  const menuAnimation = () => {
    //@ts-ignore
    let rootParent = menuAnim.current.children;
    for (let i = 0; i < rootParent.length; i++) {
      let firstParent = rootParent[i].children;
      let arr = firstParent[0].textContent.split("");
      let spanData = "";
      for (let j = 0; j < arr.length; j++) {
        if (arr[j] == " ") {
          spanData += `<span style='width:6px;'>${arr[j]}</span>`;
        } else {
          spanData += `<span>${arr[j]}</span>`;
        }
      }
      let result = '<div class="menu-text">' + spanData + "</div>";
      firstParent[0].innerHTML = result;
    }
  };

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
      case "5":
        window.location.href = "http://www.kipa21.com/home/";
        break;
      case "6":
        window.location.href = "http://www.indiepd.org/";
        break;
      case "7":
        window.location.href = "https://dbox.ebs.co.kr/dbox";
        break;
      default:
        break;
    }
  };

  return (
    <>
      <footer className="footer__area-6">
        <div className="container">
          <div className="row">
            <div className="col-xxl-12 pt-4">
              <div className="footer__top-6 pt-5 pb-5">
                <div className="footer__item-6">
                  <Image
                    priority
                    style={{ width: "auto", height: "auto" }}
                    className="footer__logo logo-light"
                    src={logoWhite2}
                    alt="Footer Logo"
                  />
                  <Image
                    priority
                    style={{ width: "auto", height: "auto" }}
                    className="footer__logo logo-dark"
                    src={logoBlack}
                    alt="Footer Logo"
                  />
                  {/* <p>현대인의 지친 일상 속에서</p> */}
                  <ul className="footer__social-6">
                    <li>
                      <a href="https://www.facebook.com/bcpf.or.kr">
                        <span>
                          <i className="fa-brands fa-facebook-f"></i>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.youtube.com/@bcpf">
                        <span>
                          <i className="fa-brands fa-youtube"></i>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/bcpf_official/">
                        <span>
                          <i className="fa-brands fa-instagram"></i>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.linkedin.com/company/b-c-p-f/"
                        target="_blank">
                        <span>
                          <i className="fa-brands fa-linkedin "></i>
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-9">
                  <ul className="footer__link-6">
                    <li>
                      <Link href="/home">Home</Link>
                    </li>
                    <li>
                      <Link href="/about/introduction/introduce">About Us</Link>
                    </li>
                    <li>
                      <Link href="/content/promotion/drama-contest">
                        Projects
                      </Link>
                    </li>
                    <li>
                      <a href="/content/research/broadcast-conference">
                        Research
                      </a>
                    </li>
                    <li>
                      <a href="/school/introduction">BCPF School</a>
                    </li>
                  </ul>
                </div>

                <div className="footer__item-6">
                  <ul className="footer__info-6">
                    <li>
                      <a href="tel:0261234300" className="phone">
                        TEL: 02-6123-4300~5
                      </a>
                    </li>
                    <li>
                      <a href="mailto:info@buildyexample.com">
                        FAX: 02-6123-4310
                      </a>
                    </li>
                    <li>
                      1002, 2nd IS Biz Tower, <br />
                      23 Seonyu-ro 49-gil, <br />
                      Yeongdeungpo-gu, <br />
                      Seoul, South Korea 07208
                    </li>
                  </ul>
                </div>
              </div>

              <div className="footer__btm-6">
                <div className="text-center lg:text-left grid">
                  <div className="col-xxl-9 col-xl-9 col-lg-9 col-md-3 d-flex align-items-center justify-middle">
                    <div className="footer__copyright-6 text-center">
                      <p>
                        © Copyright. 2015 Broadcasting Content Promotion
                        Foundation , All rights Reserved.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
