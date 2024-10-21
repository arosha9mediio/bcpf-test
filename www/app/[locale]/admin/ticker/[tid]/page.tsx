import { ScrollArea } from "@/components/ui/scroll-area";
import { TickerForm } from "./components/ticker-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FindPostQuery } from "@/lib/__generated/sdk";
import { client } from "@/lib/client";
import { Locale, getDictionary } from "@/dictionaries";
import { genPageMetaData } from "@/utils/seo";

// META
const generateMetadata = async ({ params: { locale, tid } }) => {
  const dict = await getDictionary(locale);

  return genPageMetaData({
    title: `${dict.ticker_title} | ${tid}`,
    type: "article",
    params: {
      locale,
    },
  });
};

//
type TickerViewPageProps = {
  params: { tid: string; locale: Locale };
};

type TickerViewPageType = (props: TickerViewPageProps) => Promise<JSX.Element>;

const TickerViewPage: TickerViewPageType = async ({
  params: { tid, locale },
}) => {
  const dict = await getDictionary(locale);

  const decodedId = decodeURIComponent(tid);

  const ticker: FindPostQuery | null = await client
    .findPost({ id: decodedId })
    .catch(error => {
      return null;
    });

  const generateTitle = (): string => {
    if (ticker && ticker.findPost?.id) {
      return `${dict.ticker_title} [ ${ticker.findPost.id} ]`;
    }

    return dict.admin_ticker_view_create_new;
  };

  return (
    <ScrollArea className="flex h-full overflow-hidden">
      <Card>
        <CardHeader>
          <CardTitle className="capitalize">{generateTitle()}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <TickerForm ticker={ticker?.findPost} />
        </CardContent>
      </Card>
    </ScrollArea>
  );
};

export default TickerViewPage;
export { generateMetadata };
