"use client";
import { BroadcastCommonPartsFragment } from "@/lib/__generated/sdk";
import { getImagePath } from "@/utils/aws";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { QueryProjects } from "../page";
import { SELECTABLE_YEARS } from "./tabs";

type Project = Pick<
  BroadcastCommonPartsFragment,
  | "id"
  | "previewUrl"
  | "awards"
  | "title"
  | "production"
  | "vimeoUrl"
  | "type"
  | "broadcast"
  | "genre"
  | "publishers"
>;

type CommunityCardsProps = {
  initialProjects: Partial<Project>[];
  hasMoreProjects: boolean;
  year?: (typeof SELECTABLE_YEARS)[number]['year'] | string;
  page?: number;
  getProjects: QueryProjects;
};

type Document = { previewUrl: string; type: string };

const getPreviewUrl = (document: Document) =>
  getImagePath(
    `statics/web/contest/previews/${document.type}/${document.previewUrl}`,
  );

type CommunityCardsType = (props: CommunityCardsProps) => JSX.Element;

const CommunityCards: CommunityCardsType = ({
  initialProjects,
  hasMoreProjects,
  year,
  getProjects,
}) => {
  const t = useTranslations();

  const [projects, setProjects] = useState(initialProjects);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(hasMoreProjects);

  const loadMore = async () => {
    if (!hasMore) {
      return;
    }

    const nextPage = page + 1;
    const loadedQuery = await getProjects(nextPage, year);
    const loadedProjects = loadedQuery?.broadcastFeed?.list;

    setPage(nextPage);
    setHasMore(loadedQuery?.broadcastFeed?.hasNextPage);
    setProjects(prevProjects => {
      const allProjects = prevProjects.concat(loadedProjects);
      const projectsMap = new Map(allProjects.map(a => [a.id, a]));

      return Array.from(projectsMap.values());
    });
  };

  return (
    <div className="mt-12 md:mt-20">
      <InfiniteScroll
        dataLength={projects?.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<h4>{t("loading")}...</h4>}
        // endMessage={<p>{t("no_data")}</p>}
        className="grid md:grid-cols-2 md:gap-12 mt-8">
        {projects.map(project => {
          return (
            <Link key={project.id} href={project.vimeoUrl} target="_blank">
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
                          type: String(project?.type),
                          previewUrl: project?.previewUrl,
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
                          type: String(project?.type),
                          previewUrl: project?.previewUrl,
                        })}
                        alt="Blog Thumbnail"
                      />
                    </div>
                  </div>
                  <div className="bg-[#ED1C2E] h-8 w-8 flex justify-center items-center rounded-sm mb-2">
                    <span>
                      <i className="fa-brands fa-youtube text-white"></i>
                    </span>
                  </div>
                  <h2 className="text-slate-500">{project.broadcast}</h2>
                  <h2 className="my-2">{project.publishers}</h2>
                  <h4>{project.title}</h4>
                  <h4>{project.production}</h4>
                </article>
              </div>
            </Link>
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

export default CommunityCards;
