import { PaginatedRequest } from "@/lib/__generated/sdk";
import {
  CATEGORY_TYPES,
  COMPACT_VIEW_SETTINGS,
  CategoryTypes,
  DYNAMIC_SEARCH_OPTIONS,
  NOTICE_DEFAULT_PINNED_PARAMS,
} from "./constants";
import {
  NextTable,
  NextTableViewModes,
  fetchFilteredPosts,
} from "@/components/table/NextTable";
import { client } from "@/lib/client";
import { Search } from "@/components/search/SearchBar";
import { handleRowClick } from "./[slug]/utils/navigators";
import { getDictionary } from "@/dictionaries";
import { Metadata, ResolvingMetadata } from "next";
import { genPageMetaData } from "@/utils/seo";

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
  const dict = await getDictionary(locale);

  const previousImages = (await parent)?.openGraph?.images || [];

  return genPageMetaData({
    title: dict?.[`${type}_list_meta_title`],
    description: dict?.[`${type}_list_meta_description`],
    images: [...previousImages],
    keywords: dict?.[`${type}_list_meta_keywords`],
    params: { locale },
    type: "website",
  });
};

type DynamicPageProps = {
  params: { type: CategoryTypes; locale: string };
  searchParams?: PaginatedRequest;
};

type DynamicPageType = (props: DynamicPageProps) => Promise<JSX.Element>;

const DynamicPage: DynamicPageType = async ({
  params: { type },
  searchParams: { page, ...searchParams },
}) => {
  const category = CATEGORY_TYPES[type];

  // FETCH PAGE SETTINGS
  const fakePageSettingsFetch = async (): Promise<NextTableViewModes> => {
    switch (category?.id) {
      case 1:
        return "textOnly";
      case 2:
        return "grid"; // 'column' fetch
    }
  };

  const mode = await fakePageSettingsFetch();

  const [VIEW, REQUEST, SEARCH_BY_TYPES] = COMPACT_VIEW_SETTINGS[category.id];
  const [columns, options] = VIEW[mode];

  const fPage = Number(page || 1);

  // on notice n initial render; pass pinned defaults
  const pinned =
    type === "notice" && fPage === 1 ? NOTICE_DEFAULT_PINNED_PARAMS : null;

  // adjust size to make space for pins
  const DEFAULT_REQUEST =
    type === "notice" ? { ...REQUEST, pageSize: fPage > 1 ? 10 : 10 } : REQUEST;

  return (
    <div className="container pt-20">
      <NextTable
        gqlQuery={client.postFeed}
        request={{ page: fPage, ...searchParams }}
        defaultRequest={DEFAULT_REQUEST}
        columns={columns}
        listParent={"postFeed"}
        viewOptions={{ mode, ...options }}
        pinned={pinned}
        onRowClick={handleRowClick}
        topWidget={
          <Search
            components={["SEARCHBY", "SEARCH", "SUBMIT", "RESET"]}
            searchByItems={SEARCH_BY_TYPES}
            defaultRequest={REQUEST}
            options={DYNAMIC_SEARCH_OPTIONS}
          />
        }
      />
    </div>
  );
};

export default DynamicPage;
export { generateMetadata };
