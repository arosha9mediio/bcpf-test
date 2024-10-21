import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { getPage } from "./action/get-page";
import "react-quill/dist/quill.snow.css";
import { Metadata, ResolvingMetadata } from "next";
import { genPageMetaData } from "@/utils/seo";
import { getImagePath } from "@/utils/aws";

type Props = {
  params: { slug: string[]; locale: "en" | "ko" };
};

type GenMetaDataProps = {} & Props;
// Ref: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
type GenerateMetadataType = (
  props: GenMetaDataProps,
  parent: ResolvingMetadata,
) => Promise<Metadata>;
const generateMetadata: GenerateMetadataType = async (
  { params: { locale, slug } },
  parent,
) => {
  const page = await getPage(slug.join("/"));
  const thumbnail = page?.file?.find(item => item?.type === "IMAGE")?.url;
  const image = getImagePath(thumbnail);
  const previousImages = (await parent)?.openGraph?.images || [];

  return genPageMetaData({
    title: page?.title,
    description: page?.description,
    images: [image, ...previousImages],
    keywords: page?.keywords,
    params: { locale },
    type: "article",
  });
};

const Page = async ({ params: { slug } }: Props) => {
  const page = await getPage(slug.join("/"));
  if (!page) return <p>Page not found!</p>;
  return (
    <div className="container">
      <ScrollArea className="flex flex-col gap-5 space-y-1 pt-12 h-full overflow-hidden">
        {/* HTML */}
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: page.body }}
        />
      </ScrollArea>
    </div>
  );
};

export default Page;
export { generateMetadata };
