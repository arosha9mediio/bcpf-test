import { cn, isProd } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Thumb404 from "/public/assets/imgs/thumb/404.png";
import { RoutePaths } from "@/constants/route";
import { getTranslations } from "next-intl/server";

const NotFound = async () => {
  const t = await getTranslations();

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
            width="0"
            height="0"
            sizes="100vw"
          />
          <h1 className="text-3xl mt-8">
            {t("errors_contest_not_found_title")}
          </h1>
          <p
            className={cn(
              "text-red-500 line-clamp-5",
              isProd && "max-w-[1000px] line-clamp-1",
            )}>
            {t("errors_contest_not_found_description")}
          </p>

          <div className="btn_wrapper">
            <Link
              href={RoutePaths.mypage.value}
              className="wc-btn-primary btn-hover btn-item">
              <span></span> 마이페이지로
              <br />
              돌아가기 <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
          {/* <Button onClick={() => reset()}>{t("Try again")}</Button> */}
        </div>
      </div>
    </section>
  );
};

export default NotFound;
