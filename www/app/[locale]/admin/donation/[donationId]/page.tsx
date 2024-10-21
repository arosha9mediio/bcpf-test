import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { client } from "@/lib/client";
import DonationForm from "./components/donation-form";
import { FindDonationQuery } from "@/lib/__generated/sdk";
import { Locale, getDictionary } from "@/dictionaries";

interface Props {
  params: { donationId: string; locale: Locale };
}

const CreateOrEditDonation: React.FC<Props> = async ({ params }) => {
  let donation: FindDonationQuery | null;
  try {
    donation =
      params.donationId === "new"
        ? null
        : await client.findDonation({
            id: params.donationId,
          }); /* Fetch the post */
  } catch (e) {
    console.log({ e });
  }

  const dict = await getDictionary(params.locale);

  return (
    <ScrollArea className="flex h-screen overflow-hidden">
      <Card>
        <CardHeader>
          <CardTitle>{dict.admin_donation}</CardTitle>
          <CardDescription className="flex items-center justify-between">
            <span>{dict.admin_donation_sub}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <DonationForm donation={donation?.findDonation} />
        </CardContent>
      </Card>
    </ScrollArea>
  );
};

export default CreateOrEditDonation;
