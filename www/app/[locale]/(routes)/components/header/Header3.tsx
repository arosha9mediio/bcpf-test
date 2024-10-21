import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Canvas from "../canvas/Canvas";
import MenuWhite from "/public/assets/imgs/icon/menu-white.png";
import MenuBlack from "/public/assets/imgs/icon/menu-dark.png";
import LogoIcon from "/public/assets/imgs/logo/icon.png";
import LogoWhite from "/public/assets/imgs/logo/site-logo-white.png";
import LogoBlack from "/public/assets/imgs/logo/logo-black-vert.svg";

export default function Header3() {
  const [topScroll, setTopScroll] = useState(0);

  const ofCanvasArea = useRef();
  const headerArea = useRef();

  const handleTopScroll = () => {
    const position = window.pageYOffset;
    setTopScroll(position);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleTopScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleTopScroll);
    };
  }, []);
  if (typeof window !== "undefined") {
    let device_width = window.innerWidth;
    if (device_width < 1500) {
      let header_bg = headerArea.current;
      if (header_bg) {
        if (topScroll > 20) {
          //@ts-ignore
          header_bg.style.background = "#121212";
          //@ts-ignore
          header_bg.style.setProperty("mix-blend-mode", "unset");
        } else {
          //@ts-ignore
          header_bg.style.background = "#fff";
          //@ts-ignore
          header_bg.style.setProperty("mix-blend-mode", "unset");
        }
      }
    }
  }
  const openCanvas = () => {
    //@ts-ignore
    ofCanvasArea.current.style.opacity = "1";
    //@ts-ignore
    ofCanvasArea.current.style.visibility = "visible";
    let header_bg = headerArea.current;
    //@ts-ignore
    header_bg.style.setProperty("mix-blend-mode", "unset");
  };
  return (
    <>
      <header
        className={
          topScroll > 20 ? "header__area bg-background" : "header__area"
        }>
        <div className="header__inner">
          <div className="header__logo">
            <Link href="/home">
              <Image
                priority
                width={33}
                height={100}
                className="logo-primary dark:hidden"
                src={LogoBlack}
                alt="Site Logo"
              />
              <Image
                priority
                width={33}
                height={100}
                className="logo-primary dark:block hidden"
                src={LogoWhite}
                alt="Site Logo"
              />
              <Image
                priority
                width={100}
                height={33}
                className="logo-secondary"
                src={LogoIcon}
                alt="Mobile Logo"
              />
            </Link>
          </div>
          <div className="header__nav-icon">
            <button onClick={openCanvas} id="open_offcanvas">
              <Image
                priority
                width={22}
                height={22}
                src={MenuBlack}
                alt="Menubar Icon"
                className="dark:hidden"
              />
              <Image
                priority
                width={22}
                height={22}
                src={MenuWhite}
                alt="Menubar Icon"
                className="dark:block hidden"
              />
            </button>
          </div>
          {/* <div className="header__support">
            <p>
              Support center <a href="tel:+9587325902">+9 587 325 902</a>
            </p>
          </div> */}
        </div>
        <Canvas bladeMode={headerArea.current} ofCanvasArea={ofCanvasArea} />
      </header>
    </>
  );
}
