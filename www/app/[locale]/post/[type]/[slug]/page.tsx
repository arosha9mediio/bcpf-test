import SuspenseLoading from "@/components/loadings/suspense";
import { FindPostQuery, PaginatedRequest } from "@/lib/__generated/sdk";
import { client } from "@/lib/client";
import { getImagePath } from "@/utils/aws";
import { genPageMetaData } from "@/utils/seo";
import { Metadata, ResolvingMetadata } from "next";
import { Suspense, cache } from "react";
import { CategoryTypes } from "../constants";
import BottomDynamicTable from "./components/BottomDynamicTable";
import { DynamicView } from "./components/DynamicView";
import "./components/editor.css";
import { notFound } from "next/navigation";

const fetchPost = cache(async (slug: string) => {
  const decodedId = decodeURIComponent(slug);
  const post: FindPostQuery | null = await client
    .findPost({ id: decodedId })
    .catch(error => {
      return notFound();
    });
  return post;
});

type GenMetaDataProps = {
  params: { slug: string; type: CategoryTypes; locale: "en" | "ko" };
};
// Ref: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
type GenerateMetadataType = (
  props: GenMetaDataProps,
  parent: ResolvingMetadata,
) => Promise<Metadata>;

const generateMetadata: GenerateMetadataType = async (
  { params: { locale, slug, type } },
  parent,
) => {
  const findPost = await fetchPost(slug);
  const post = findPost.findPost;

  const previousImages = (await parent)?.openGraph?.images || [];

  const thumbnail = post?.file?.find(item => item?.type === "IMAGE")?.url;
  const image = getImagePath(thumbnail);

  return genPageMetaData({
    title: post?.title,
    description: post?.metaDescription,
    keywords: post?.keywords,
    type: "article",
    images: [image, ...previousImages],
    params: {
      locale: locale,
    },
  });
};

type DynamicViewPageProps = {
  params: { slug: string; type: CategoryTypes; locale: "en" | "ko" };
  searchParams?: PaginatedRequest;
};

type DynamicViewPageType = (
  props: DynamicViewPageProps,
) => Promise<JSX.Element>;

const DynamicViewPage: DynamicViewPageType = async ({
  params: { slug, type, locale },
  searchParams,
}) => {
  const post = await fetchPost(slug);

  return (
    <>
      <div className="container">
        <Suspense fallback={<SuspenseLoading />}>
          <DynamicView post={post} params={{ slug, type, locale }} />{" "}
        </Suspense>
      </div>

      {/* DIVIDER */}
      <div className="border-t-[1px] border-[#111111] shadow-xl dark:border-white" />

      {/* BOTTOM DYNAMIC NAV */}
      <Suspense fallback={<SuspenseLoading />}>
        <BottomDynamicTable
          id={slug}
          type={type}
          locale={locale}
          searchParams={searchParams}
        />
      </Suspense>
    </>
  );
};

export default DynamicViewPage;
export { generateMetadata };
