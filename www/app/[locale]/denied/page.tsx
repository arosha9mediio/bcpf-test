"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ForbiddenIllustration from "./components/illustration-403";

const DeniedPage = () => {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };
  return (
    <div className="flex w-full flex-col h-dvh items-center justify-center gap-y-4">
      <ForbiddenIllustration />
      <p className="text-3xl font-semibold">사용할 수 없는 페이지입니다.</p>
      <p className="text-gray-500">홈페이지로 이동하여 바르게 사용해 주세요.</p>
      <Button onClick={onClick}>홈으로가기</Button>
    </div>
  );
};

export default DeniedPage;
