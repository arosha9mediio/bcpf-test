import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import logoBlack from "/public/assets/imgs/logo/logo-black.svg";
import logoWhite2 from "/public/assets/imgs/logo/site-logo-white-2.svg";

export default function Footer4() {
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
                      <a
                        rel="nofollow"
                        href="https://www.facebook.com/bcpf.or.kr"
                        target="_blank">
                        <span>
                          <i className="fa-brands fa-facebook-f"></i>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a rel="nofollow" href="https://www.youtube.com/@bcpf">
                        <span>
                          <i className="fa-brands fa-youtube"></i>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        rel="nofollow"
                        href="https://www.instagram.com/bcpf_official/"
                        target="_blank">
                        <span>
                          <i className="fa-brands fa-instagram"></i>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        rel="nofollow"
                        href="https://www.linkedin.com/company/b-c-p-f/"
                        target="_blank">
                        <span>
                          <i className="fa-brands fa-linkedin"></i>
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="footer__item-6">
                  {/* <h2 className="footer__item-title">
                    현대인의 지친 일상 속에서
                  </h2> */}
                  <ul className="footer__link-6">
                    <li>
                      <Link href="/page/policy">이용약관</Link>
                    </li>
                    <li>
                      <Link href="/page/personal-information">
                        개인정보취급방침
                      </Link>
                    </li>
                    <li>
                      <Link href="/page/email-permission">
                        이메일무단수집거부
                      </Link>
                    </li>
                    <li>
                      <a href="/about/directions">오시는 길</a>
                    </li>
                  </ul>
                </div>

                <div className="footer__item-6">
                  {/* <h2 className="footer__item-title">
                    현대인의 지친 일상 속에서
                  </h2> */}
                  <ul className="footer__info-6">
                    <li>
                      <a
                        rel="nofollow"
                        href="tel:0261234300"
                        className="phone"
                        target="_blank">
                        TEL: 02-6123-4300~5
                      </a>
                    </li>
                    <li>FAX: 02-6123-4310</li>
                    <li>
                      (07208) 서울 영등포구 <br />
                      선유로 49길 23, <br />
                      2차 IS비즈타워 1002호
                    </li>
                  </ul>
                </div>
                {/* <div className="footer__item-6">
                  <h2 className="footer__item-title">newsletter</h2>
                  <form action="#">
                    <div className="footer__newsletter-6">
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="Enter your email"
                      />
                      <button type="submit">
                        <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    </div>
                    <div className="footer__chekbox">
                      <input type="checkbox" id="check_box" name="checkbox" />
                      <label>
                        I’m okay with getting emails and having that activity
                        and privacy policy.
                      </label>
                    </div>
                  </form>
                </div> */}
              </div>
              <div className="footer__btm-6">
                <div className="footer__content-bottom">
                  <div className="footer__content">
                    <div className="footer__copyright-6">
                      <p>
                        © Copyright. 2015 Broadcasting Content Promotion
                        Foundation , All rights Reserved.
                      </p>
                    </div>
                  </div>
                  <div className="footer__content-grid1">
                    <form action="#">
                      <div className="switcher__btn2">
                        <select
                          defaultValue="관련 기관"
                          onChange={handleSelectChange}>
                          <option value="1">방송통신위원회</option>
                          <option value="2">국세청</option>
                          <option value="3">[KCA]한국방송통신전파진흥원</option>
                          <option value="4">[KCTA]한국케이블TV방송협회</option>
                          <option value="5">
                            [KIPA] 사단법인 독립제작사협회
                          </option>
                          <option value="6">(사)한국독립PD협회</option>
                          <option value="7">EBS 국제다큐영화제</option>
                        </select>
                      </div>
                    </form>
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
