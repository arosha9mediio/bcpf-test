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
import SliderForm from "./components/feature-form";
import { Locale, getDictionary } from "@/dictionaries";

interface Props {
  params: { featureId: string; locale: Locale };
}

const CreateOrEditSlider: React.FC<Props> = async ({ params }) => {
  let slider: FindPostQuery | null;

  try {
    slider =
      params.featureId === "new"
        ? null
        : await client.findPost({ id: params.featureId }); /* Fetch the post */
  } catch (e) {
    console.log({ e });
  }

  const dict = await getDictionary(params.locale);

  return (
    <ScrollArea className="flex h-full overflow-hidden">
      <Card>
        <CardHeader>
          <CardTitle>{dict.admin_feature_main_title}</CardTitle>
          <CardDescription className="flex items-center justify-between">
            <span>{dict.admin_feature_main_description}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <SliderForm slider={slider?.findPost} />
        </CardContent>
      </Card>
    </ScrollArea>
  );
};

export default CreateOrEditSlider;
