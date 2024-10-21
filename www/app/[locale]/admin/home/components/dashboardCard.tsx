import { DateTimeFormatter } from "@/components/table/formatters/DateTimeFormatter";

const ICONS = {
  date: "/assets/imgs/dashboard/ic_date.png",
  ic_participant: "/assets/imgs/dashboard/ic_participant.png",
} as const;

export const CONTEST_STATUS = {
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

const DashboardCard = ({
  title,
  statusId,
  startDate,
  endDate,
  Application,
}) => {
  const statusColors = {
    "-1": "bg-gray-500 text-white",
    "0": "bg-blue-500 text-white",
    "10": "bg-yellow-500 text-black",
    "11": "bg-orange-500 text-black",
    "12": "bg-orange-600 text-black",
    "1": "bg-green-500 text-white",
    "2": "bg-green-600 text-white",
    "99": "bg-purple-500 text-white",
    "100": "bg-red-500 text-white",
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg shadow-slate-100 border-[1px] border-slate-100">
      <div className="text-xs flex items-center justify-between mb-2">
        <span className={`px-2 py-1 rounded ${statusColors[statusId]}`}>
          {CONTEST_STATUS[statusId].label}
        </span>
      </div>
      <h3 className="text-2xl font-semibold mt-5">{title}</h3>
      <div className="text-sm text-gray-500 flex items-center space-x-7 mt-6">
        <div className="flex items-center">
          <img
            className="max-h-[30px] max-w-[30px] mr-2"
            src={ICONS.ic_participant}
            alt="Participants"
          />
          {Application.length} 명
        </div>
        <div className="flex items-center">
          <img
            className="max-h-[30px] max-w-[30px] mr-2"
            src={ICONS.date}
            alt="Date"
          />
          <DateTimeFormatter format="yyyy-MM-dd HH:mm" date={startDate} /> -
          <DateTimeFormatter format="yyyy-MM-dd HH:mm" date={endDate} />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
