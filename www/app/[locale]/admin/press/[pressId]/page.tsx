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
import PressForm from "./press-form";
import { Locale, getDictionary } from "@/dictionaries";

interface Props {
  params: { pressId: string; locale: Locale };
}

const CreateOrEditSlider: React.FC<Props> = async ({ params }) => {
  let press: FindPostQuery | null;

  try {
    press =
      params.pressId === "new"
        ? null
        : await client.findPost({ id: params.pressId }); /* Fetch the post */
  } catch (e) {
    console.log({ e });
  }

  const dict = await getDictionary(params.locale);

  return (
    <ScrollArea className="flex h-[82vh] overflow-hidden">
      <Card>
        <CardHeader>
          <CardTitle>{dict.admin_press_create_title}</CardTitle>
          <CardDescription className="flex items-center justify-between">
            <span>{dict.admin_press_create_description}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <PressForm post={press?.findPost} />
        </CardContent>
      </Card>
    </ScrollArea>
  );
};

export default CreateOrEditSlider;
