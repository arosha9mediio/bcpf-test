import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FindContestQuery } from "@/lib/__generated/sdk";
import { client } from "@/lib/client";
import ContestForm from "./components/contest-form";
import { Locale, getDictionary } from "@/dictionaries";
import Error from "next/error";

interface Props {
  params: { contestId: string; locale: Locale };
}

const CreateOrEditContest: React.FC<Props> = async ({ params }) => {
  let contest: FindContestQuery | null;

  try {
    contest =
      params.contestId === "new"
        ? null
        : await client.findContest({
            id: params.contestId,
          }); /* Fetch the post */
  } catch (e) {
    throw e;
  }

  const dict = await getDictionary(params.locale);

  return (
    <ScrollArea className="flex h-full overflow-hidden">
      <Card>
        <CardHeader>
          <CardTitle>{dict.admin_contest_create_title}</CardTitle>
          <CardDescription className="flex items-center justify-between">
            <span>{dict.admin_contest_create_title}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <ContestForm contest={contest?.findContest} />
        </CardContent>
      </Card>
    </ScrollArea>
  );
};

export default CreateOrEditContest;
