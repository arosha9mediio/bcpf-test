import { Button } from "@/components/ui/button";
import { client } from "@/lib/client";
import {
  CATEGORY_TYPES,
  COMPACT_VIEW_SETTINGS,
  CategoryTypes,
} from "../../constants";
import { GetAdjacentPostsQuery, PaginatedRequest } from "@/lib/__generated/sdk";
import Link from "next/link";
import { getDictionary } from "@/dictionaries";
import { NoticeTile } from "../../components/NoticeTile";

type BottomDynamicTableProps = {
  id: string;
  type: CategoryTypes;
  searchParams?: PaginatedRequest;
  locale: "en" | "ko";
};

type BottomDynamicTableType = (
  props: BottomDynamicTableProps,
) => Promise<JSX.Element>;

const BottomDynamicTable: BottomDynamicTableType = async ({
  id,
  type,
  locale,
  searchParams: { page, ...searchParams },
}) => {
  const category = CATEGORY_TYPES[type];
  const [_, REQUEST, __] = COMPACT_VIEW_SETTINGS[category.id];

  const decodedId = decodeURIComponent(id);
  const isAnnoucement = type === "notice";
  const fPage = Number(page || 1);
  const DEFAULT_REQUEST =
    type === "notice" ? { ...REQUEST, pageSize: fPage > 1 ? 10 : 7 } : REQUEST;

  const adjacentPosts: GetAdjacentPostsQuery | null = await client
    .getAdjacentPosts({
      id: decodedId,
      pageRequest: {
        ...DEFAULT_REQUEST,
        ...{ page: fPage, ...searchParams },
      },
    })
    .catch(error => {
      return null;
    });

  const posts = adjacentPosts?.getAdjacentPosts;

  const isPrevNotice = Boolean(posts?.previous?.pin);
  const isNxtNotice = Boolean(posts?.next?.pin);

  const dict = await getDictionary(locale);

  return (
    <div className="container py-5 gap-5 flex flex-col">
      <div id="dynamic-nav-button" className="flex flex-row justify-end">
        <Link
          href={{
            pathname: `/post/${type}`,
            query: { ...{ page: fPage, ...searchParams } },
          }}
          prefetch={false}>
          <Button className="capitalize" variant="default">
            {dict.nav_table_button}
          </Button>
        </Link>
      </div>
      <table className="min-w-max w-full table-auto border-t-[1px] border-[#111111] dark:border-white">
        <tbody className="text-gray-600 text-sm font-light">
          <tr className="border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 dark:border-slate-700">
            <th className="px-3 py-3 sm:px-6 text-left bg-[#E8EDF3] text-[#111111] dark:bg-[#31343A] dark:text-white">
              <div className="capitalize">{dict.nav_table_prev}</div>
            </th>
            <td className="py-3 px-4 sm:px-6 text-left max-w-72 sm:max-w-none line-clamp-1 dark:text-white">
              <Link
                href={{
                  pathname: posts?.previous?.id,
                  query: { ...{ page: Number(page) || 1, ...searchParams } },
                }}>
                <NoticeTile
                  chipLabel={dict.notice_tile_chip}
                  content={posts?.previous?.title}
                  isAnnouncement={isAnnoucement && isPrevNotice}
                  tag={posts?.previous?.tags}
                />
              </Link>
            </td>
          </tr>
          <tr className="border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 dark:border-slate-700">
            <th className="py-3 px-3 sm:px-6 text-left bg-[#E8EDF3] text-[#111111] dark:bg-[#31343A] dark:text-white">
              <div className="capitalize">{dict.nav_table_nxt}</div>
            </th>
            <td
              className="py-3 px-4 sm:px-6 text-left max-w-72 sm:max-w-none line-clamp-1 dark:text-white"
              colSpan={3}>
              <Link
                href={{
                  pathname: posts?.next?.id,
                  query: { ...{ page: Number(page) || 1, ...searchParams } },
                }}>
                <NoticeTile
                  chipLabel={dict.notice_tile_chip}
                  content={posts?.next?.title}
                  isAnnouncement={isAnnoucement && isNxtNotice}
                  tag={posts?.next?.tags}
                />
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BottomDynamicTable;
