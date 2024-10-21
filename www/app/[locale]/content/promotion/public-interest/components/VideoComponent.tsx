"use client";
import { client } from "@/lib/client";
import { getImagePath } from "@/utils/aws";
import Link from "next/link";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { BroadcastCommonPartsFragment } from "@/lib/__generated/sdk";
import { QueryInterests } from "../page";
import { SELECTABLE_YEARS } from "./tabs";

type Award = Pick<
  BroadcastCommonPartsFragment,
  | "id"
  | "previewUrl"
  | "awards"
  | "title"
  | "vimeoUrl"
  | "type"
  | "broadcast"
  | "genre"
  | "publishers"
>;

type PublicInterestProps = {
  initialAwards: Partial<Award>[];
  hasMoreAwards: boolean;
  year?: (typeof SELECTABLE_YEARS)[number] | string;
  page?: number;
  getAwards: QueryInterests;
};

type Document = { previewUrl: string; type: string };

const getPreviewUrl = (document: Document) =>
  getImagePath(
    `statics/web/contest/previews/${document.type}/${document.previewUrl}`,
  );

type PublicInterestType = (props: PublicInterestProps) => JSX.Element;

const VideosComponent: PublicInterestType = ({
  initialAwards,
  hasMoreAwards,
  year,
  getAwards,
}) => {
  const t = useTranslations();

  const [videos, setVideos] = useState(initialAwards);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(hasMoreAwards);

  const loadMore = async () => {
    if (!hasMore) {
      return;
    }

    const nextPage = page + 1;
    const loadedQuery = await getAwards(nextPage, year);
    const loadedAwards = loadedQuery?.broadcastFeed?.list;

    setPage(nextPage);
    setHasMore(loadedQuery?.broadcastFeed?.hasNextPage);
    setVideos(prevAwards => {
      const allAwards = prevAwards.concat(loadedAwards);
      const awardsMap = new Map(allAwards.map(a => [a.id, a]));

      return Array.from(awardsMap.values());
    });
  };

  return (
    <div className="mt-12 md:mt-20">
      <InfiniteScroll
        dataLength={videos?.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<h4>{t("loading")}...</h4>}
        // endMessage={<p>{t("no_data")}</p>}
        className="grid md:grid-cols-2 md:gap-12 mt-8">
        {videos.map(video => {
          return (
            <Link key={video.id} href={video.vimeoUrl || "#"} target="_blank">
              <div className="awards__content md:mb-12">
                <article className="blog__item">
                  <div className="blog__img-wrapper">
                    <div className="img-box-2">
                      <img
                        style={{
                          width: "auto",
                          height: "auto",
                          objectFit: "cover",
                        }}
                        className="image-box__item"
                        src={getPreviewUrl({
                          type: String(video?.type),
                          previewUrl: video?.previewUrl,
                        })}
                        alt="Blog Thumbnail"
                      />
                      <img
                        style={{
                          width: "auto",
                          height: "auto",
                          objectFit: "cover",
                        }}
                        className="image-box__item"
                        src={getPreviewUrl({
                          type: String(video?.type),
                          previewUrl: video?.previewUrl,
                        })}
                        alt="Blog Thumbnail"
                      />
                    </div>
                  </div>
                  <div className="bg-[#ED1C2E] h-8 w-8 flex justify-center items-center rounded-sm">
                    <span>
                      <i className="fa-brands fa-youtube text-white"></i>
                    </span>
                  </div>
                  <h2 className="text-slate-500 mt-2">
                    {video.broadcast} ({video.genre})
                  </h2>
                  <h2>{video.publishers}</h2>
                  <h4>{video.title}</h4>
                </article>
              </div>
            </Link>
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

export default VideosComponent;
