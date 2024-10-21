"use client";

import { Button } from "@/components/ui/button";
import { cn, isProd } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Thumb404 from "/public/assets/imgs/thumb/404-2.png";
import { signOut } from "next-auth/react";

export default function ErrorBoundary({ error, reset }) {
  const t = useTranslations();

  let errorMessage = "";
  errorMessage =
    error.message.split(": {")[0] || "알수 없는 오류가 발생하였습니다.";

  if (errorMessage === "Forbidden") {
    alert("문제가 발생하여 로그아웃 됩니다.");
    signOut();
  }
  //rocketengine.tistory.com/entry/NextJS-13-Routing-Error-Handling에러처리 [OIL:티스토리]
  // if (error && typeof error === "string") {
  //   errorMessage = getErrorMessage(JSON.parse(error));
  // } else {
  //   errorMessage = getErrorMessage(error);
  // }

  // console.log(errorMessage);
  return (
    <section className="error__page">
      <div className="container line">
        <span className="line-3"></span>
        <div className="error__content flex w-full h-dvh flex-col justify-center items-center gap-y-4 p-8">
          <Image
            priority
            style={{ width: "auto", height: "auto" }}
            src={Thumb404}
            alt="Page not found"
          />
          <h1 className="text-3xl">{errorMessage}</h1>
          <p
            className={cn(
              "text-slate-500 line-clamp-5",
              isProd && "max-w-[1000px] line-clamp-1",
            )}>
            <br />
            <br />
            불편을 드려서 죄송합니다. 계속해서 문제가 발생하는 경우 관리자에게
            문의해 주세요.
          </p>
          <div className="btn_wrapper">
            {/* <Link href="/home" className="wc-btn-primary btn-hover btn-item">
              <span></span> {t("홈페이지로")} <br />
              {t("돌아가기..")} <i className="fa-solid fa-arrow-right"></i>
            </Link> */}
            <Button variant="outline" onClick={() => history.back()}>
              처음으로 돌아가기
            </Button>
          </div>
          {/*  */}
        </div>
      </div>
    </section>
  );
}
