"use client";

import { useToast } from "@/components/ui/use-toast";
import { RoutePaths } from "@/constants/route";
import Google from "@/public/assets/imgs/icon/google.png";
import Kakao from "@/public/assets/imgs/icon/kakao.png";
import Naver from "@/public/assets/imgs/icon/naver.png";
import Logo from "@/public/assets/imgs/logo/logo-black.png";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const SignInPage = () => {
  const t = useTranslations(); // json key 값
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const loginWithGoogle = async () => {
    try {
      await signIn("google");
    } catch (error) {
      toast({
        variant: "destructive",
        description:
          "Something went wrong while logging with your Google account.",
      });
    } finally {
      router.refresh();
    }
  };

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        description: error,
      });
      router.replace(RoutePaths.signIn.value);
    }
  }, [error]);

  const loginWithKakao = async () => {
    try {
      await signIn("kakao");
    } catch (error) {
      toast({
        variant: "destructive",
        description:
          "Something went wrong while logging with your Kakao account.",
      });
    } finally {
      router.refresh();
    }
  };

  const loginWithNaver = async () => {
    try {
      await signIn("naver");
    } catch (error) {
      toast({
        variant: "destructive",
        description:
          "Something went wrong while logging with your Naver account.",
      });
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="h-dvh overflow-auto auth-container">
      <div className="flex items-center justify-around w-full px-12">
        <div className="text-white max-lg:hidden">
          <p className="text-2xl border-b-2 border-white mb-8 uppercase">
            {"Membership"}
          </p>
          <h1 className="text-8xl font-bold">{"로그인"}</h1>
        </div>
        <div className="flex flex-col items-center bg-[#FFFEFE] px-12 py-6 gap-4 w-[550px]">
          <div className="mb-6 flex flex-col items-center">
            <Image
              priority
              width={186}
              height={40}
              src={Logo}
              alt="Feature Icon"
              className="mb-4"
            />
            <h1 className="text-3xl font-bold text-center text-gray-800">
              {"방송콘텐츠진흥재단에"} <br />
              {"오신 것을 환영합니다!"}
            </h1>
          </div>
          <p className="font-light text-gray-400">
            {"소셜로그인을 이용하여 별도 회원가입 없이 로그인 가능합니다"}
          </p>

          <button
            className="bg-[#fee500] p-3 rounded flex w-full items-center justify-center font-bold text-gray-800"
            onClick={loginWithKakao}>
            <Image
              src={Kakao}
              width={24}
              height={24}
              style={{ marginRight: "8px" }}
              alt="Kakao Icon"
            />
            {"카카오톡으로 계속하기"}
          </button>
          <button
            className="bg-[#4fa42b] text-white p-3 rounded flex w-full items-center justify-center font-bold"
            onClick={loginWithNaver}>
            <Image
              src={Naver}
              width={24}
              height={24}
              style={{ marginRight: "8px" }}
              alt="Naver Icon"
            />
            {"네이버로 계속하기"}
          </button>
          <button
            className="p-3 rounded flex w-full items-center justify-center font-bold border-2 border-slate-200 text-gray-800"
            onClick={loginWithGoogle}>
            <Image
              src={Google}
              width={24}
              height={24}
              style={{ marginRight: "8px" }}
              alt="Google Icon"
            />
            {"Google으로 계속하기"}
          </button>
          <div className="mt-8 text-center text-gray-600">
            <h4 className="text-sm">
              <a
                href="/page/policy"
                target="_blank"
                className="text-[#00AEE7] font-bold">
                {"이용약관"}
              </a>
              &nbsp; 및&nbsp;
              <a
                href="/page/personal-information"
                target="_blank"
                className="text-[#00AEE7] font-bold">
                {"개인정보 취급방침"}
              </a>
              {"을 숙지하고 그에 동의하신 것으로 간주됩니다."}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
