"use client";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Img1 from "/public/assets/imgs/content/global/global-1.jpg";
import { client } from "@/lib/client";
import { useTranslations } from "next-intl";
import { getImagePath } from "@/utils/aws";
import {
  BroadcastCommonPartsFragment,
  PaginatedRequest,
} from "@/lib/__generated/sdk";

const AWARDS_DEFAULT_PARAMS: PaginatedRequest = {
  page: 1,
  pageSize: 10,
  sortType: "desc",
  type: "1",
} as const;

type Documentary = Pick<
  BroadcastCommonPartsFragment,
  "id" | "previewUrl" | "awards" | "title" | "production" | "synopsis" | "type"
>;

type CommunityCardsProps = {
  initialDocumentaries: Partial<Documentary>[];
  hasMoreDocumentaries: boolean;
};

type Document = { previewUrl: string; type: string };

const getPreviewUrl = (document: Document) =>
  getImagePath(
    `statics/web/contest/previews/${document?.previewUrl || "noimg.png"}`,
  );

type CommunityCardsType = (props: CommunityCardsProps) => JSX.Element;

const DocumentaryCards: CommunityCardsType = ({
  initialDocumentaries,
  hasMoreDocumentaries,
}) => {
  const t = useTranslations();
  const [documentaries, setDocumentaries] = useState(initialDocumentaries);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(hasMoreDocumentaries);
  const router = useRouter();

  const loadMore = async () => {
    if (!hasMore) {
      return;
    }

    const documentariesQuery = await client.broadcastFeed({
      pageRequest: { ...AWARDS_DEFAULT_PARAMS, page },
    });

    const loadedDocumentaries = documentariesQuery.broadcastFeed?.list;

    if (!documentariesQuery.broadcastFeed?.hasNextPage) {
      setHasMore(false);
      return;
    }

    setDocumentaries(prevDocumentaries => {
      const allDocumentaries = prevDocumentaries.concat(loadedDocumentaries);
      const documentariesMap = new Map(allDocumentaries.map(a => [a.id, a]));

      return Array.from(documentariesMap.values());
    });

    setPage(page + 1);
  };

  const handleClick = id => {
    router.push(`/content/promotion/global-documentary/${id}`);
  };

  return (
    <div>
      <div>
        <h3 className="text-2xl font-bold">주요 다큐멘터리 제작지원작</h3>
      </div>
      <InfiniteScroll
        dataLength={documentaries?.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<h4>{t("loading")}...</h4>}
        // endMessage={<p>{t("no_data")}</p>}
        className="grid md:grid-cols-2 md:gap-12 mt-8">
        {documentaries.map(documentary => {
          return (
            <div
              key={documentary.id}
              className="awards__content md:mb-12 hover:cursor-pointer"
              onClick={() => handleClick(documentary.id)}>
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
                        type: String(documentary?.type),
                        previewUrl: documentary?.previewUrl,
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
                        type: String(documentary?.type),
                        previewUrl: documentary?.previewUrl,
                      })}
                      alt="Blog Thumbnail"
                    />
                  </div>
                </div>
                <h4>{documentary.title}</h4>
                <p>{documentary.production}</p>
                <p
                  className="line-clamp-5"
                  dangerouslySetInnerHTML={{
                    __html: documentary.synopsis,
                  }}></p>
              </article>
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

export default DocumentaryCards;
