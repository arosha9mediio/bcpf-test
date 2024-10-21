import { PostCommonPartsFragment } from "@/lib/__generated/sdk";
import { client } from "@/lib/client";
import { getImagePath } from "@/utils/aws";
import RootLayoutNew from "../(routes)/components/common/layout/RootLayout";
import DesignStudioFeature from "../(routes)/components/homepage/DesignStudioFeature";
import DesignStudioProtfolio from "../(routes)/components/homepage/DesignStudioProtfolio";
import DigitalAgencyPortfolio from "../(routes)/components/homepage/DigitalAgencyPortfolio";
import DigitalAgencyRoll from "../(routes)/components/homepage/DigitalAgencyRoll";
import HomeContest from "../(routes)/components/homepage/HomeContest";
import HomeFeature from "../(routes)/components/homepage/HomeFeature";
import HomeNotice from "../(routes)/components/homepage/HomeNotice";
import HomeSlider from "../(routes)/components/homepage/HomeSlider";
import DigitalAgencyHero from "../(routes)/components/homepage/homepage";
import "/public/assets/scss/master.scss";
import { Locales } from "@/middleware";
import { EnHome } from "./EnHome";

const fetchSliders = async (categoryId: number, filter?: string) => {
  try {
    return await client.postFeed({
      pageRequest: { categoryId, client: true, page: 1, pageSize: 60 },
    });
  } catch (e) {
    console.log(e);
    return { postFeed: { list: [] } };
  }
};

type HomeProps = {
  params: {
    locale: Locales;
  };
};
type HomeType = (props: HomeProps) => Promise<JSX.Element>;

const Home: HomeType = async ({ params: { locale } }) => {
  if (locale === "en") {
    return <EnHome />;
  }

  const { postFeed: heroFeed } = await fetchSliders(13);
  const { postFeed: portfolioFeed } = await fetchSliders(12);
  const { postFeed: homesliderFeed } = await fetchSliders(11);
  const { postFeed: tndFeed } = await fetchSliders(14);
  const { postFeed: tickers } = await fetchSliders(30);
  const tnd = tndFeed?.list?.[0];
  const firstSliderImageList = [];
  const secondSliderImageList = [];
  const thirdSliderImageList = [];

  const heroImages = heroFeed?.list?.map((post: PostCommonPartsFragment) => {
    return {
      id: post.id,
      src: getImagePath(post?.file?.[0].url),
      alt: getImagePath(post?.file?.[0].url),
      title: tnd?.title,
      subtitle: tnd?.description,
    };
  });

  const portfolioImages = portfolioFeed?.list?.map(post => {
    return {
      id: post.id,
      src: getImagePath(post?.file?.[0].url),
      alt: getImagePath(post?.file?.[0].url),
      title: post.title,
      subtitle: post.subTitle,
      description: post.description,
      url: post?.slug,
    };
  });

  homesliderFeed?.list?.forEach(post => {
    const imageData = {
      id: post.id,
      src: getImagePath(post?.file?.[0].url),
      alt: getImagePath(post?.file?.[0].url),
      title: post.title,
      subtitle: post.description,
    };

    if (post.tags === "1") {
      firstSliderImageList.push(imageData);
    } else if (post.tags === "2") {
      secondSliderImageList.push(imageData);
    } else if (post.tags === "3") {
      thirdSliderImageList.push(imageData);
    }
  });

  const notices = await client.postFeed({
    pageRequest: {
      page: 1,
      pageSize: 3,
      sortType: "DESC",
      categoryId: 1,
      sortBy: "pin",
      type: null,
      searchBy: null,
      client: true,
      query: "",
    },
  });

  const contests = await client.getMainContest();

  return (
    //@ts-ignore
    <RootLayoutNew header="header2" footer="footer4" isHome={true}>
      <DigitalAgencyHero images={heroImages} tnd={tnd} />
      <DigitalAgencyRoll tickers={tickers?.list} />
      <DesignStudioFeature />
      {/* <HomeFeature /> */}
      <DesignStudioProtfolio images={portfolioImages} />
      {/* @ts-ignore */}
      <HomeContest contests={contests.getMainContest} />
      <HomeSlider
        images={firstSliderImageList}
        title="드라마극본 수상작"
        subtitle="주요 당선작"
      />
      <HomeSlider
        images={secondSliderImageList}
        title="다큐멘터리 트레일러 제작지원작"
        subtitle="주요 당선작"
        direction="row-reverse"
      />
      <HomeSlider
        images={thirdSliderImageList}
        title="1인 크리에이터 제작지원작"
        subtitle="주요 당선작"
      />
      {/* <DigitalAgencyPortfolio /> */}
      <HomeNotice notices={notices.postFeed.list} />
    </RootLayoutNew>
  );
};

export default Home;
