import { siteDescription, sitename, socialMeta } from "@/constants/meta";
import { Metadata } from "next";
import { OpenGraphType } from "next/dist/lib/metadata/types/opengraph-types";

type GenPageMetaDataProps = {
  title: string;
  description?: string;
  images?: Metadata["openGraph"]["images"];
  keywords?: string | string[] | null | undefined;
  params: { locale: "en" | "ko" };
  type: OpenGraphType;
  [key: string]: any;
};

type GenPageMetaDataType = (props: GenPageMetaDataProps) => Metadata;

const genPageMetaData: GenPageMetaDataType = ({
  title,
  description,
  params: { locale },
  images,
  keywords,
  type,
  ...rest
}) => {
  return {
    title,
    keywords,
    description,
    openGraph: {
      title: `${title} | ${sitename[locale]}`,
      description: description || siteDescription[locale],
      url: "./",
      siteName: sitename[locale],
      images: images ? images : [socialMeta[locale].openGraph.image],
      locale: locale,
      type,
    },
    twitter: {
      title: `${title} | ${sitename[locale]}`,
      card: "summary_large_image",
      images: images ? images : [socialMeta[locale].twitter.image],
      siteName: sitename[locale],
      description,
    },
    ...rest,
  };
};

export { genPageMetaData };
