"use client";
import { useEffect, useRef, useState } from "react";
import allNavData from "../../data/navData.json";
import enNavData from "../../data/navEnData.json";
// import Preloader from "@/components/preloader/Preloader";
import CommonAnimation from "../CommonAnimation";
import CursorAnimation from "../CursorAnimation";
import ScrollSmootherComponents from "../ScrollSmootherComponents";
import ScrollTop from "../ScrollTop";
// import Header1 from "@/components/header/Header1";
// import Footer1 from "../../../components/footer/Footer1";
import Header2 from "../../../components/header/Header2";
// import Header3 from "@/components/header/Header3";
// import Header4 from "@/components/header/Header4";
// import Header5 from "@/components/header/Header5";
// import Footer2 from "../../../components/footer/Footer2";
// import Footer3 from "../../../components/footer/Footer3";
import Footer2 from "../../../components/footer/Footer2";
import Footer4 from "../../../components/footer/Footer4";
import Header1 from "../../header/Header1";
import Header3 from "../../header/Header3";
import Header4 from "../../header/Header4";
import { useParams } from "next/navigation";
// import Footer5 from "../../../components/footer/Footer5";

// const HeaderContent = ({ header, navData }) => {
//   if (header == "header1") {
//     return <Header1 navData={navData} />;
//   } else if (header == "header2") {
//     return <Header2 navData={navData} />;
//   } else if (header == "header3") {
//     return <Header3 />;
//   } else if (header == "header4") {
//     return <Header4 navData={navData} />;
//   } else if (header == "header5") {
//     return <Header5 />;
//   } else if (header == "none") {
//     return "";
//   } else {
//     return <Header3 />;
//   }
// };
// const FooterContent = ({ footer }) => {
//   if (footer == "footer1") {
//     return <Footer2 />;
//   } else if (footer == "footer2") {
//     return <Footer2 />;
//   } else if (footer == "footer3") {
//     return <Footer3 />;
//   } else if (footer == "footer4") {
//     return <Footer4 />;
//   } else if (footer == "footer5") {
//     return <Footer5 />;
//   } else if (footer == "none") {
//     return "";
//   } else {
//     return <Footer3 />;
//   }
// };

const HeaderContent = ({ header, navData, isBlack, isHome }) => {
  const params = useParams();
  const locale = params?.locale;
  if (header == "header2") {
    return (
      <Header2
        isBlack={isBlack}
        navData={locale == "ko" ? navData : enNavData}
        isHome={isHome}
        isEnglish={locale == "en" ? true : false}
      />
    );
  } else if (header == "header1") {
    return (
      <Header1
        navData={locale == "ko" ? navData : enNavData}
        isHome={isHome}
        isEnglish={locale == "en" ? true : false}
      />
    );
  } else if (header == "header3") {
    return <Header3 />;
  } else if (header == "header4") {
    return <Header4 navData={enNavData} isBlack={isBlack} />;
  }
};
const FooterContent = ({ footer }) => {
  const params = useParams();
  const locale = params?.locale;

  if (footer == "footer4") {
    return locale == "ko" ? <Footer4 /> : <Footer2 />;
  }
};

export default function RootLayoutNew({
  children,
  header = "",
  footer = "",
  defaultMode = "",
  isBlack = false,
  scrollStyle = true,
  isHome = false,
}) {
  const [mode, setMode] = useState(defaultMode);
  const [navData, setNavData] = useState({});

  const cursor1 = useRef();
  const cursor2 = useRef();
  useEffect(() => {
    setNavData(allNavData);
    if (typeof window !== "undefined") {
      if (mode == "dark") {
        document.querySelector("body").classList.add("dark");
      } else {
        document.querySelector("body").classList.remove("dark");
      }
    }
  }, [mode]);

  // if (process.env.NODE_ENV !== "development")
  //   console.log(
  //     Object.defineProperties(new Error(), {
  //       message: {
  //         get() {
  //           document.location.href = "https://google.com/";
  //         },
  //       },
  //       toString: {
  //         value() {
  //           new Error().stack.includes("toString@") && alert("Safari");
  //         },
  //       },
  //     }),
  //   );

  return (
    <>
      <CommonAnimation>
        <div className="has-smooth" id="has_smooth"></div>
        {scrollStyle && <ScrollSmootherComponents />}
        <div className="cursor" id="team_cursor">
          Drag
        </div>
        {/* <Preloader /> */}
        {/* <CursorAnimation cursor1={cursor1} cursor2={cursor2} /> */}

        {/* <Switcher
          setMode={setMode}
          mode={mode}
          cursor1={cursor1}
          cursor2={cursor2}
        /> */}

        <ScrollTop />
        <HeaderContent
          isBlack={isBlack}
          header={header}
          navData={navData}
          isHome={isHome}
        />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            {children}
            <FooterContent footer={footer} />
          </div>
        </div>
      </CommonAnimation>
    </>
  );
}
