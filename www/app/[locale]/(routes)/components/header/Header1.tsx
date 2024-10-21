import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Canvas from "../canvas/Canvas";
import LogoDark from "../logo/LogoDark";
import NavItem from "../nav/NavItem";
import Language from "/public/assets/imgs/icon/kr.png";
import LanguageDark from "/public/assets/imgs/icon/kr-white.png";
import Language2 from "/public/assets/imgs/icon/en.png";
import Menu from "/public/assets/imgs/icon/menu-black.png";
import MenuDark from "/public/assets/imgs/icon/menu.png";
import User from "/public/assets/imgs/icon/profile-black.png";
import UserDark from "/public/assets/imgs/icon/profile.png";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { ProfileMenu } from "../../profile/components/ProfileMenu";
import DesignStudioLogo from "../logo/DesignStudioLogo";
import CanvasEn from "../canvas/CanvasEn";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

export default function Header1({ navData, isHome, isEnglish }) {
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
    let header_bg_3 = headerArea.current;
    if (header_bg_3) {
      if (topScroll > 20) {
        //@ts-ignore
        header_bg_3.style.background =
          theme === "dark" || resolvedTheme === "dark" ? "black" : "white";
        //@ts-ignore
        header_bg_3.classList.add("sticky-3");
      } else {
        //@ts-ignore
        header_bg_3.style.background = "transparent";
        //@ts-ignore
        header_bg_3.classList.remove("sticky-3");
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
          <header className="header__area-3" ref={headerArea}>
            <div className="header__inner-2">
              {theme === "dark" || resolvedTheme === "dark" ? (
                <DesignStudioLogo />
              ) : (
                <LogoDark />
              )}
              {navData.nav && navData.nav.length && (
                <NavItem nav={navData.nav} navStyle="4" isHome={isHome} />
              )}
              <div className="header__nav-icon-2">
                {/* HERE */}
                {/* <Link href={"/mypage"}> */}

                {!isEnglish && (
                  <>
                    <ProfileMenu>
                      {theme === "dark" || resolvedTheme === "dark" ? (
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
                    {/* </Link> */}
                    <div className="header__nav-icon-vl" />
                  </>
                )}
                <LocaleSwitcher
                  invert={theme === "dark" || resolvedTheme === "dark"}
                />

                <div className="header__nav-icon-vl" />
                <button onClick={toggleTheme}>
                  {theme === "dark" || resolvedTheme === "dark" ? (
                    <Moon className="h-[1.5rem] w-[1.5rem]" />
                  ) : (
                    <Sun className="h-[1.5rem] w-[1.5rem]" />
                  )}
                </button>
                {window.innerWidth <= 1200 && (
                  <>
                    <div className="header__nav-icon-vl" />
                    <button onClick={openCanvas}>
                      {theme === "dark" || resolvedTheme === "dark" ? (
                        <Image
                          priority
                          width={24}
                          height={24}
                          src={MenuDark}
                          alt="Menubar Icon"
                        />
                      ) : (
                        <Image
                          priority
                          width={24}
                          height={24}
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
