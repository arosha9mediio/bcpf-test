"use client";
import { BroadcastCommonPartsFragment } from "@/lib/__generated/sdk";
import { getImagePath } from "@/utils/aws";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { QueryAwards } from "../page";
import { SELECTABLE_YEARS } from "./tabs";
import "/public/assets/scss/master.scss";

type Award = Pick<
  BroadcastCommonPartsFragment,
  | "id"
  | "previewUrl"
  | "awards"
  | "title"
  | "production"
  | "synopsis"
  | "vimeoUrl"
  | "type"
  | "genre"
  | "broadcast"
  | "publishers"
>;

type SingleCardsProps = {
  initialAwards: Partial<Award>[];
  hasMoreAwards: boolean;
  year?: (typeof SELECTABLE_YEARS)[number]['year'] | string;
  page?: number;
  getAwards: QueryAwards;
};

type Document = { previewUrl: string; type: string };

const getPreviewUrl = (document: Document) =>
  getImagePath(
    `statics/web/contest/previews/${document.type}/${document.previewUrl}`,
  );

type SingleCardsType = (props: SingleCardsProps) => JSX.Element;

const SingleCards: SingleCardsType = ({
  initialAwards,
  hasMoreAwards,
  year,
  getAwards,
}) => {
  const t = useTranslations();

  const [awards, setAwards] = useState(initialAwards);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(hasMoreAwards);

  //
  const loadMore = async () => {
    if (!hasMore) {
      return;
    }

    const nextPage = page + 1;
    const loadedQuery = await getAwards(nextPage, year);
    const loadedAwards = loadedQuery?.broadcastFeed?.list;

    setPage(nextPage);
    setHasMore(loadedQuery?.broadcastFeed?.hasNextPage);
    setAwards(prevAwards => {
      const allAwards = prevAwards.concat(loadedAwards);
      const awardsMap = new Map(allAwards.map(a => [a.id, a]));

      return Array.from(awardsMap.values());
    });
  };

  return (
    <InfiniteScroll
      dataLength={awards?.length}
      next={loadMore}
      hasMore={hasMore}
      loader={<h4>{t("loading")}...</h4>}
      // endMessage={<p>{t("no_data")}</p>}
      className="grid md:grid-cols-2 md:gap-12 mt-8">
      {awards.map((award, index) => (
        <Link key={award.id} href={award?.vimeoUrl} target="_blank">
          <div className="awards__card md:mb-12">
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
                      type: String(award?.type),
                      previewUrl: award?.previewUrl,
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
                      type: String(award?.type),
                      previewUrl: award?.previewUrl,
                    })}
                    alt="Blog Thumbnail"
                  />
                </div>
              </div>
              {/* <h4 dangerouslySetInnerHTML={{ __html: award?.awards }} /> */}
              <div className="bg-[#ED1C2E] h-8 w-8 flex justify-center items-center rounded-md">
                <span>
                  <i className="fa-brands fa-youtube text-white"></i>
                </span>
              </div>
              <h2 className="text-slate-500 mt-2 mb-2">
                {award?.broadcast} ({award?.genre})
              </h2>
              <h2>{award?.publishers}</h2>
              <h4 className="mt-2">{award?.title}</h4>
              <p>{award?.production}</p>
            </article>
          </div>
        </Link>
      ))}
    </InfiniteScroll>
  );
};

export default SingleCards;
