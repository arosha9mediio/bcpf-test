import local from "next/font/local";

const pretendard = local({
  src: [
    {
      weight: "300",
      style: "normal",
      path: "../public/assets/fonts/pretendard/Pretendard-Light.woff",
    },
    {
      weight: "400",
      style: "normal",
      path: "../public/assets/fonts/pretendard/Pretendard-Regular.woff",
    },
    {
      weight: "500",
      style: "normal",
      path: "../public/assets/fonts/pretendard/Pretendard-Medium.woff",
    },
    {
      weight: "600",
      style: "normal",
      path: "../public/assets/fonts/pretendard/Pretendard-SemiBold.woff",
    },
    {
      weight: "700",
      style: "normal",
      path: "../public/assets/fonts/pretendard/Pretendard-Bold.woff",
    },
    {
      weight: "800",
      style: "normal",
      path: "../public/assets/fonts/pretendard/Pretendard-Black.woff",
    },
  ],
  variable: "--font-pretendard",
});

export { pretendard };
