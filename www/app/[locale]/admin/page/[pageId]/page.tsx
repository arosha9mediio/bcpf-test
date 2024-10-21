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
import PageForm from "./components/page-form";
import { Locale, getDictionary } from "@/dictionaries";

interface Props {
  params: { pageId: string; locale: Locale };
}

const CreateOrEditSlider: React.FC<Props> = async ({ params }) => {
  let page: FindPostQuery | null;

  try {
    page =
      params.pageId === "new"
        ? null
        : await client.findPost({ id: params.pageId }); /* Fetch the post */
  } catch (e) {
    console.log({ e });
  }

  const dict = await getDictionary(params.locale);

  return (
    <ScrollArea className="flex h-[82vh] overflow-hidden">
      <Card>
        <CardHeader>
          <CardTitle>{dict.admin_pages_title}</CardTitle>
          <CardDescription className="flex items-center justify-between">
            <span>{dict.admin_pages_description}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <PageForm post={page?.findPost} />
        </CardContent>
      </Card>
    </ScrollArea>
  );
};

export default CreateOrEditSlider;
