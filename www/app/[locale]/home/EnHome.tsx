import { PostCommonPartsFragment } from "@/lib/__generated/sdk";
import { client } from "@/lib/client";
import { getImagePath } from "@/utils/aws";
import { notFound } from "next/navigation";
import RootLayoutNew from "../(routes)/components/common/layout/RootLayout";
import DesignStudioFeature from "../(routes)/components/homepage/DesignStudioFeature";
import HomeSlider from "../(routes)/components/homepage/HomeSlider";
import DigitalAgencyHero from "../(routes)/components/homepage/homepage";

type EnHomeProps = {};

type EnHomeType = (props: EnHomeProps) => Promise<JSX.Element>;

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

const fetchBatched = async () => {
  try {
    const [heroes, sliders, tnds] = await Promise.all([
      fetchSliders(13),
      fetchSliders(11),
      fetchSliders(14),
    ]);

    return { heroes, sliders, tnds };
  } catch (error) {
    console.error("Error fetching data:", error);
    //throw error;
    return notFound();
  }
};

const EnHome: EnHomeType = async () => {
  const { heroes, sliders, tnds } = await fetchBatched();

  const tnd = tnds?.postFeed?.list?.[0];
  const heroImages = heroes?.postFeed?.list?.map(
    (post: PostCommonPartsFragment) => {
      return {
        id: post.id,
        src: getImagePath(post?.file?.[0].url),
        alt: getImagePath(post?.file?.[0].url),
        title: tnd?.title,
        subtitle: tnd?.description,
      };
    },
  );

  const firstSliderImageList = [];
  const secondSliderImageList = [];
  const thirdSliderImageList = [];

  sliders?.postFeed?.list?.forEach(post => {
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

  return (
    <>
      <RootLayoutNew header="header2" footer="footer4" isHome={true}>
        <DigitalAgencyHero images={heroImages} tnd={tnd} />
        <DesignStudioFeature />

        <HomeSlider
          images={firstSliderImageList}
          title="Drama Script"
          subtitle="Major Winning Works"
        />
        <HomeSlider
          images={secondSliderImageList}
          title="Documentary Trailer"
          subtitle="Production Support Recipient"
          direction="row-reverse"
        />
        <HomeSlider
          images={thirdSliderImageList}
          title="Independent Creator"
          subtitle="Production Support Recipient"
        />
        <div className="pb-150" />
      </RootLayoutNew>
    </>
  );
};

export { EnHome };
