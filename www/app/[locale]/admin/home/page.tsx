import DashboardCard from "./components/dashboardCard";
import QuickDownload from "./components/quickDownload";
import NoticeBoard from "./components/noticeBoard";
import { client } from "@/lib/client";

const fetchData = async pageRequest => {
  try {
    return await client.ContestsFeed({
      pageRequest,
    });
  } catch (e) {
    console.log(e);
    return { contestsFeed: { list: [] } };
  }
};

const AdminHome = async () => {
  const contestParams = {
    sortType: "asc",
    page: 1,
    pageSize: 4,
    viewMain: "예",
  };

  const noticeParams = {
    sortType: "asc",
    page: 1,
    pageSize: 6,
  };

  const { contestsFeed: contestFeed } = await fetchData(contestParams);
  const { contestsFeed: noticeFeed } = await fetchData(noticeParams);

  return (
    <div className="mx-auto p-4 w-full">
      <div className="grid grid-cols-2 gap-y-4 gap-x-6 w-full">
        {contestFeed?.list?.map(card => (
          <DashboardCard key={card.id} {...card} />
        ))}
      </div>
      <div className="mt-6 grid grid-cols-7 gap-8 w-full">
        <div className="col-span-3">
          <QuickDownload downloads={contestFeed?.list.slice(0, 2)} />
        </div>
        <div className="col-span-4">
          <NoticeBoard notices={noticeFeed?.list} />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
