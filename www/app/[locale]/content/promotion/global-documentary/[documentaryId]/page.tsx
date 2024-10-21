import RootLayoutNew from "../../../../(routes)/components/common/layout/RootLayout";
import Head from "next/head";
import DocumentaryView from "../components/DocumentaryView";
import CmsHero from "../../../../(routes)/components/cms/CmsHero";
import { client } from "@/lib/client";
import { FindBroadcastQuery } from "@/lib/__generated/sdk";
import "/public/assets/scss/master.scss";

interface Props {
  params: { documentaryId: string };
}

const DocumentaryPage : React.FC<Props> = async ({ params }) => {

  let broadcast: FindBroadcastQuery | null;

  try {
    broadcast = await client.findBroadcast({
      id: params.documentaryId,
    });
  } catch (e) {
    console.log({ e });
  }
  
  
  return (
    <div>
      <Head>
        <title>진흥사업 | 다큐멘터리 제작지원 및 글로벌 제작인력 양성</title>
        <meta
          name="description"
          content="방송콘텐츠진흥재단 | 다큐멘터리 제작지원 및 글로벌 제작인력 양성"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <RootLayoutNew header="header2" footer="footer4">
          <CmsHero
            text="진흥사업"
            title="다큐멘터리"
            subtitle="다큐멘터리 제작지원 및 글로벌 제작인력 양성"
            variant="broadcast"
          />
          <DocumentaryView documentary={broadcast.findBroadcast}/>
        </RootLayoutNew>
      </main>
    </div>
  );
};

export default DocumentaryPage;
