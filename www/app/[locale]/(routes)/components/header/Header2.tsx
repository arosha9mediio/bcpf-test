import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Canvas from "../canvas/Canvas";
import DesignStudioLogo from "../logo/DesignStudioLogo";
import NavItem from "../nav/NavItem";
import Language from "/public/assets/imgs/icon/kr.png";
import Language2 from "/public/assets/imgs/icon/kr-white.png";
import Menu from "/public/assets/imgs/icon/menu-black.png";
import MenuLight from "/public/assets/imgs/icon/menu.png";
import User from "/public/assets/imgs/icon/profile-black.png";
import { useTheme } from "next-themes";
import { ProfileMenu } from "../../profile/components/ProfileMenu";
import { Moon, Sun } from "lucide-react";
import LogoDark from "../logo/LogoDark";
import LanguageDark from "/public/assets/imgs/icon/kr-white.png";
import UserDark from "/public/assets/imgs/icon/profile.png";
import CanvasEn from "../canvas/CanvasEn";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

export default function Header2({ navData, isBlack, isHome, isEnglish }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
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
    let header_bg_2 = headerArea.current;
    if (header_bg_2) {
      if (topScroll > 20) {
        //@ts-ignore
        header_bg_2.style.background = "black";
        //@ts-ignore
        header_bg_2.classList.add("sticky-2");
      } else {
        if (!isBlack) {
          //@ts-ignore
          header_bg_2.style.background = "transparent";
        }

        //@ts-ignore
        header_bg_2.classList.remove("sticky-2");
      }
    }
  }

  const openCanvas = () => {
    //@ts-ignore
    ofCanvasArea.current.style.opacity = "1";
    //@ts-ignore
    ofCanvasArea.current.style.visibility = "visible";
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" || resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <>
      {navData && Object.keys(navData).length ? (
        <>
          {isHome && (
            <div className="fixed z-50 flex justify-end gap-3 w-full backdrop-blur-md bg-white/30 p-2">
              <a
                className="bg-[#BED73D] h-8 w-8 flex justify-center items-center rounded-sm"
                href="/home">
                <span>
                  <i
                    className="fa-solid fa-house text-white"
                    style={{ fontSize: "18px" }}></i>
                </span>
              </a>
              <a
                rel="nofollow"
                className="bg-slate-500 h-8 w-8 flex justify-center items-center rounded-sm"
                href="https://www.facebook.com/bcpf.or.kr"
                target="_blank">
                <span>
                  <i className="fa-brands fa-facebook-f text-white"></i>
                </span>
              </a>
              <a
                rel="nofollow"
                className="bg-[#ED1C2E] h-8 w-8 flex justify-center items-center rounded-sm"
                href="https://www.youtube.com/@bcpf"
                target="_blank">
                <span>
                  <i className="fa-brands fa-youtube text-white"></i>
                </span>
              </a>
              <a
                rel="nofollow"
                className="bg-[#EC008C] h-8 w-8 flex justify-center items-center rounded-sm"
                href="https://www.instagram.com/bcpf_official/"
                target="_blank">
                <span>
                  <i
                    className="fa-brands fa-instagram text-white"
                    style={{ fontSize: "20px", marginTop: "4px" }}></i>
                </span>
              </a>
              <a
                rel="nofollow"
                className="bg-[#00AEE7] h-8 w-8 flex justify-center items-center rounded-sm"
                href="https://www.linkedin.com/company/b-c-p-f/"
                target="_blank">
                <span>
                  <i
                    className="fa-brands fa-linkedin text-white"
                    style={{ fontSize: "18px", marginTop: "4px" }}></i>
                </span>
              </a>
            </div>
          )}
          <header
            className={`${theme === "dark" || !isHome ? "header__area-2" : "header__area-3"} ${isHome ? "mt-[48px]" : ""}`}
            ref={headerArea}>
            <div className="header__inner-2">
              {theme === "dark" ||
              resolvedTheme === "dark" ||
              !isHome ||
              topScroll > 20 ? (
                <DesignStudioLogo />
              ) : (
                <LogoDark />
              )}
              {navData.nav && navData.nav.length && (
                <NavItem
                  nav={navData.nav}
                  isHome={isHome}
                  navStyle={
                    theme === "light" && isHome && topScroll < 20 && "4"
                  }
                />
              )}
              <div className="header__nav-icon-2">
                {/* HERE */}
                {/* <Link href={"/mypage"}> */}
                {!isEnglish && (
                  <>
                    <ProfileMenu>
                      {theme === "dark" ||
                      resolvedTheme === "dark" ||
                      !isHome ||
                      topScroll > 20 ? (
                        <Image
                          priority
                          width={22}
                          height={22}
                          src={UserDark}
                          alt="Menubar Icon"
                        />
                      ) : (
                        <Image
                          priority
                          width={22}
                          height={22}
                          src={User}
                          alt="Menubar Icon"
                        />
                      )}
                    </ProfileMenu>
                    <div className="header__nav-icon-vl" />
                  </>
                )}
                <LocaleSwitcher
                  invert={
                    topScroll > 20 ||
                    !isHome ||
                    resolvedTheme === "dark" ||
                    theme === "dark"
                  }
                />

                <div className="header__nav-icon-vl" />
                <button onClick={toggleTheme}>
                  {theme === "dark" || resolvedTheme === "dark" ? (
                    <Moon
                      className={`"h-[1.2rem] w-[1.2rem]" ${!isHome && "text-white"} ${topScroll > 20 && "text-white"}`}
                    />
                  ) : (
                    <Sun
                      className={`"h-[1.2rem] w-[1.2rem]" ${!isHome && "text-white"} ${topScroll > 20 && "text-white"}`}
                    />
                  )}
                </button>
                {window.innerWidth <= 1200 && (
                  <>
                    <div className="header__nav-icon-vl" />
                    <button onClick={openCanvas}>
                      {theme === "dark" ||
                      resolvedTheme === "dark" ||
                      !isHome ||
                      topScroll > 20 ? (
                        <Image
                          priority
                          width={22}
                          height={22}
                          src={MenuLight}
                          alt="Menubar Icon"
                        />
                      ) : (
                        <Image
                          priority
                          width={22}
                          height={22}
                          src={Menu}
                          alt="Menubar Icon"
                        />
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          </header>
        </>
      ) : (
        <></>
      )}
      {isEnglish ? (
        <CanvasEn ofCanvasArea={ofCanvasArea} />
      ) : (
        <Canvas ofCanvasArea={ofCanvasArea} />
      )}
    </>
  );
}
