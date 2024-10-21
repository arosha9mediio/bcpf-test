import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FindPostQuery } from "@/lib/__generated/sdk";

import { client } from "@/lib/client";
import BulletinBoardForm from "../../components/bulletinBoardForm";
import NoticeForm from "./notice-form";
import { Locale, getDictionary } from "@/dictionaries";

interface Props {
  params: { noticeId: string; locale: Locale };
}

const CreateOrEditSlider: React.FC<Props> = async ({ params }) => {
  let notice: FindPostQuery | null;

  try {
    notice =
      params.noticeId === "new"
        ? null
        : await client.findPost({ id: params.noticeId }); /* Fetch the post */
  } catch (e) {
    console.log({ e });
  }

  const contests = await client.ContestsFeed({
    pageRequest: {
      sortType: "asc",
    },
  });

  const dict = await getDictionary(params.locale);

  return (
    <ScrollArea className="flex h-full overflow-hidden">
      <Card>
        <CardHeader>
          <CardTitle>{dict.admin_notice_create_title}</CardTitle>
          <CardDescription className="flex items-center justify-between">
            <span>{dict.admin_notice_create_description}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <NoticeForm
            post={notice?.findPost}
            contests={contests.contestsFeed.list}
          />
        </CardContent>
      </Card>
    </ScrollArea>
  );
};

export default CreateOrEditSlider;
