import { RoutePaths } from "@/constants/route";
import Link from "next/link";

type ContestType = {
  id: string;
  title: string;
  highlight: string;
  statusId: number;
  guideUrl: string;
};

const CONTEST_STATUS = {
  "-1": { label: "접수대기", value: "-1" },
  "0": { label: "접수중", value: "0" },
  "10": { label: "심사중", value: "10" },
  "11": { label: "1차 심사중", value: "11" },
  "12": { label: "2차 심사중", value: "12" },
  "1": { label: "1차 선정", value: "1" },
  "2": { label: "2차 선정", value: "2" },
  "99": { label: "선정", value: "99" },
  "100": { label: "종료", value: "100" },
} as const;

const HomeContest = ({ contests }: { contests: ContestType[] }) => {
  return (
    <section className="portfolio__detail">
      <div className="portfolio__detail-content">
        <div className="container g-0">
          <div className="portfolio__detail-btns">
            {contests.map((contest, index) => (
              <Link
                rel="canonical"
                target="_blank"
                key={index}
                href={contest?.guideUrl ? contest.guideUrl : "notice"}
                className={`wc-btn-contest-${index + 1} btn-hover pl-5 pr-5 text-base`}>
                <span></span>
                <p>{CONTEST_STATUS[contest.statusId]?.label}</p>
                {contest?.highlight ? (
                  <div className="break-words sm:w-[190px] whitespace-normal">
                    {contest?.highlight}
                  </div>
                ) : (
                  contest.title
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="container line_4 portfolio6__line">
        <div className="line-col-4">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </section>
  );
};

export default HomeContest;
