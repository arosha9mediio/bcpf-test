import { getDictionary } from "@/dictionaries";
import { FindPostQuery } from "@/lib/__generated/sdk";
import { format as fmt } from "date-fns";
import { headers } from "next/headers";
import { CategoryTypes } from "../../constants";
import { FileDownloader } from "./FileTypeDownloader";
import { SocialShareButtons } from "./SocialShare";
import { DateTimeFormatter } from "@/components/table/formatters/DateTimeFormatter";

type DynamicViewProps = {
  params: { slug: string; type: CategoryTypes; locale: "en" | "ko" };
  post: FindPostQuery | null;
};

type DynamicViewType = (props: DynamicViewProps) => Promise<JSX.Element>;

const DynamicView: DynamicViewType = async ({
  params: { slug, type, locale },
  post,
}) => {
  const dict = await getDictionary(locale);

  const decodedId = decodeURIComponent(slug);

  const base = `${headers().get("x-forwarded-proto")}://${headers().get("host")}`;
  const fullUrl = decodeURIComponent(`${base}/post/${type}/${decodedId}`);

  if (!post) {
    return <div className="flex justify-center p-5">{"Not Found"}</div>;
  }

  const embedFile = post?.findPost?.file?.find(item => item?.type === "DOC");

  return (
    <div className="bg-white shadow-none my-6 overflow-x-auto gap-3 flex flex-col">
      {/* TITLE */}
      <h1
        className="text-2xl md:text-[24px] lg:text-[32px] font-extrabold p-0 ql-editor"
        dangerouslySetInnerHTML={{ __html: post?.findPost?.title }}
      />

      <table className="min-w-max w-full table-auto border-t-2 border-[#111111]">
        <tbody className="text-gray-600 text-sm font-light">
          <tr className="border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800">
            <th className="py-3 px-6 text-left bg-[#E8EDF3] text-[#111111] dark:bg-[#31343A] dark:text-white">
              {dict.article_table_date}
            </th>
            <td className="py-3 px-6 text-left dark:text-white">
              <DateTimeFormatter
                date={post?.findPost?.createdAt || new Date()}
              />
            </td>
            <th className="py-3 px-6 text-left bg-[#E8EDF3] text-[#111111] dark:bg-[#31343A] dark:text-white">
              조회수
            </th>
            <td className="py-3 px-6 text-left dark:text-white">
              {post?.findPost?.views}
            </td>
          </tr>
          <tr className="border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800">
            <th className="py-3 px-6 text-left bg-[#E8EDF3] text-[#111111] dark:bg-[#31343A] dark:text-white">
              {dict.article_table_file}
            </th>
            <td className="py-3 px-6 text-left dark:text-white" colSpan={3}>
              <div className="flex flex-row justify-items items-center gap-2">
                <FileDownloader
                  doc={embedFile?.filename}
                  url={`${post.findPost.id}/download`}
                  label={dict.article_table_download}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* HTML */}
      <div
        //jk added it to make image in the contents to full width.
        //please ask me or  check master.scss for sideeffect.
        className="cms-view"
        dangerouslySetInnerHTML={{ __html: post?.findPost?.body }}
      />
      {/* {parse(post?.findPost?.body)} */}

      {/* SOCIAL SHARE */}
      <SocialShareButtons url={fullUrl} />
    </div>
  );
};

export { DynamicView };
