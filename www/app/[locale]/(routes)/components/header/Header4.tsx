import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Canvas from "../canvas/Canvas";
import DesignStudioLogo from "../logo/DesignStudioLogo";
import NavItem from "../nav/NavItem";
import Language from "/public/assets/imgs/icon/en.png";
import LanguageDark from "/public/assets/imgs/icon/en-white.png";
import Menu from "/public/assets/imgs/icon/menu-black.png";
import MenuLight from "/public/assets/imgs/icon/menu.png";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import LogoDark from "../logo/LogoDark";

export default function Header4({ navData, isBlack }) {
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
      {navData && Object.keys(navData).length && (
        <header
          className={`${theme === "dark" ? "header__area-2" : "header__area-3"}`}
          ref={headerArea}>
          <div className="header__inner-2">
            {theme === "dark" || resolvedTheme === "dark" || topScroll > 20 ? (
              <DesignStudioLogo />
            ) : (
              <LogoDark />
            )}
            {navData.nav && navData.nav.length && (
              <NavItem
                nav={navData.nav}
                isHome={null}
                navStyle={theme === "light" && topScroll < 20 && "4"}
              />
            )}
            <div className="header__nav-icon-2">
              <button onClick={openCanvas}>
                {theme === "dark" ||
                resolvedTheme === "dark" ||
                topScroll > 20 ? (
                  <Image
                    priority
                    width={24}
                    height={24}
                    src={LanguageDark}
                    alt="Menubar Icon"
                  />
                ) : (
                  <Image
                    priority
                    width={24}
                    height={24}
                    src={Language}
                    alt="Menubar Icon"
                  />
                )}
              </button>
              <div className="header__nav-icon-vl" />
              <button onClick={toggleTheme}>
                {theme === "dark" || resolvedTheme === "dark" ? (
                  <Moon
                    className={`"h-[1.2rem] w-[1.2rem]" ${topScroll > 20 && "text-white"}`}
                  />
                ) : (
                  <Sun
                    className={`"h-[1.2rem] w-[1.2rem]" ${topScroll > 20 && "text-white"}`}
                  />
                )}
              </button>
              {window.innerWidth <= 1200 && (
                <>
                  <div className="header__nav-icon-vl" />
                  <button onClick={openCanvas}>
                    {theme === "dark" ||
                    resolvedTheme === "dark" ||
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
      )}
      <Canvas ofCanvasArea={ofCanvasArea} />
    </>
  );
}
