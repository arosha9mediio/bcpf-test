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
import SliderForm from "./components/slider-form";
import TitleDescriptionForm from "./components/title-description-form";
import { Locale, getDictionary } from "@/dictionaries";

interface Props {
  params: { sliderId: string; locale: Locale };
}

const CreateOrEditSlider: React.FC<Props> = async ({ params }) => {
  let slider: FindPostQuery | null;
  try {
    if (params.sliderId === "new") {
      slider = null;
    } else if (params.sliderId === "tnd") {
      slider = {
        findPost: (
          await client.postFeed({
            pageRequest: {
              type: "1",
              categoryId: 14,
            },
          })
        )?.postFeed?.list?.[0],
      };
    } else {
      slider = await client.findPost({
        id: params.sliderId,
      }); /* Fetch the post */
    }
  } catch (e) {
    console.log({ e });
  }
  const isTnd = params?.sliderId === "tnd";

  const dict = await getDictionary(params.locale);

  return (
    <ScrollArea className="flex h-full overflow-hidden">
      <Card>
        <CardHeader>
          <CardTitle>
            {` ${
              isTnd
                ? dict.admin_home_main_slider_edit_title
                : dict.admin_home_main_slider_create_title
            }`}
          </CardTitle>
          <CardDescription className="flex items-center justify-between">
            <span>{dict.admin_feature_main_description}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          {isTnd ? (
            <TitleDescriptionForm slider={slider?.findPost} />
          ) : (
            <SliderForm slider={slider?.findPost} />
          )}
        </CardContent>
      </Card>
    </ScrollArea>
  );
};

export default CreateOrEditSlider;
