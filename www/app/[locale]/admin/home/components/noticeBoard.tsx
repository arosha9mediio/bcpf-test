"use client";
import { RoutePaths } from "@/constants/route";
import { DateTimeFormatter } from "@/components/table/formatters/DateTimeFormatter";
import { redirect, useRouter } from "next/navigation";

const ICONS = {
  arrow: "/assets/imgs/dashboard/ic_arrow.png",
} as const;

const NoticeBoard = ({ notices }) => {
  const router = useRouter();
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg shadow-slate-100 border-[1px] border-slate-100 h-full">
      <h3 className="text-lg text-[#212B36] font-bold mb-3">공지사항</h3>
      <ul className="space-y-2 mb-8">
        {notices.map((notice, index) => (
          <li
            key={index}
            className="flex justify-between items-end py-3 px-2 rounded-md hover:bg-slate-100">
            <div
              className="text-sm text-[#212B36] font-semibold cursor-pointer hover:underline"
              onClick={() =>
                router.push(RoutePaths.adminContestApplicant.value(notice.id))
              }>
              {notice.title}
            </div>
            <span className="text-sm  text-[#637381]">
              <DateTimeFormatter format="yyyy-MM-dd" date={notice.startDate} />
            </span>
          </li>
        ))}
      </ul>
      <div className="flex flex-row items-center justify-end mt-4 text-right border-t pt-4">
        <div
          className="hover:underline mr-2 cursor-pointer text-sm font-bold text-[#212B36]"
          onClick={() => router.push(RoutePaths.adminNotice.value)}>
          전체보기
        </div>
        <img className="h-[11px] w-[5px]" src={ICONS.arrow} alt="My Image" />
      </div>
    </div>
  );
};

export default NoticeBoard;
