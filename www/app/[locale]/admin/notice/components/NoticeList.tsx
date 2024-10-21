import { Paginations } from "@/components/pagination/Pagination";
import { PaginatedRequest, PostFeedQuery } from "@/lib/__generated/sdk";
import { client } from "@/lib/client";
import { getImagePath } from "@/utils/aws";
import { SliderCard } from "../../components/SliderCard";

type NoticeListProps = {} & FetchFilteredPostsProps;

type NoticeListType = (props: NoticeListProps) => Promise<JSX.Element>;

// DEFAULT SEARCH PARAMS
const defaultParams: PaginatedRequest = {
  page: 1,
  pageSize: 3,
  sortType: "asc",
  categoryId: 5,
  type: "5",
};

type FetchFilteredPostsProps = Pick<
  PaginatedRequest,
  "query" | "page" | "type"
>;

type FetchFilteredPostsType = (
  props: FetchFilteredPostsProps,
) => Promise<PostFeedQuery>;

// GET POSTS
const fetchFilteredPosts: FetchFilteredPostsType = async params => {
  try {
    return await client.postFeed({
      pageRequest: { ...defaultParams, ...params },
    });
  } catch (e) {
    console.log(e);
    return null;
  }
};

const NoticeList: NoticeListType = async params => {
  const posts = await fetchFilteredPosts(params);

  if (!posts?.postFeed?.itemCount) {
    return (
      <div className="flex items-center justify-center h-full">
        {"No results found."}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 ">
      {posts?.postFeed?.list.map((post, index) => {
        return (
          <SliderCard
            id={post.id}
            title={post.title}
            description={post.description}
            image={getImagePath(post.file?.[0].url)}
            publishedAt={post.publishedAt}
            unpublishedAt={post.unpublishedAt}
            categoryId={defaultParams.categoryId}
            key={index}
          />
        );
      })}
      <div className="flex justify-between p-2">
        <Paginations
          totalPages={posts?.postFeed?.pageCount}
          currentPage={posts?.postFeed?.page}
        />
      </div>
    </div>
  );
};

export { NoticeList, fetchFilteredPosts };
