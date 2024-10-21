import { Search } from "@/components/search/SearchBar";
import {
  NextTable,
  NextTableViewModes,
  ViewSettings,
} from "@/components/table/NextTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Donation, PaginatedRequest, Post } from "@/lib/__generated/sdk";
import { client } from "@/lib/client";
import AddDonation from "./components/add-donation";
import { ADMIN_DONATION_COLUMNS } from "./components/adminDonationColumn";
import { Locale, getDictionary } from "@/dictionaries";

type DonationPageProps = {
  searchParams?: PaginatedRequest;
  params: { locale: Locale }; // undefined
};

// DEFAULT SEARCH PARAMS
const defaultParams: PaginatedRequest = {
  page: 1,
  pageSize: 10,
  sortType: "asc",
  from: undefined,
  to: undefined,
};

const VIEW_SETTINGS: ViewSettings<Donation> = {
  textOnly: [ADMIN_DONATION_COLUMNS, { headers: true }],
  column: null,
  grid: null,
} as const;

type DonationPageType = (props: DonationPageProps) => Promise<JSX.Element>;

const DonationPage: DonationPageType = async ({
  searchParams: { page, ...searchParams },
  params: { locale },
}) => {
  const mode: NextTableViewModes = "textOnly";
  const [columns, options] = VIEW_SETTINGS[mode];

  const dict = await getDictionary(locale);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">
          {dict.admin_sponsor_donation}
        </CardTitle>
        <div className="flex items-center justify-between text-gray-500">
          <span>{dict.admin_sponsor_donation_sub}</span>
          <div className="flex flex-row gap-2">
            <AddDonation />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        <NextTable
          gqlQuery={client.donationFeed}
          request={{ page: Number(page) || 1, ...searchParams }}
          defaultRequest={defaultParams}
          columns={columns}
          listParent={"donationFeed"}
          viewOptions={{ mode, ...options }}
          topWidget={
            <Search
              components={["DATE-RANGE"]}
              defaultRequest={defaultParams}
              searchMode="CHANGE"
              typeSelectionMode="Drop"
            />
          }
        />
      </CardContent>
    </Card>
  );
};

export default DonationPage;
