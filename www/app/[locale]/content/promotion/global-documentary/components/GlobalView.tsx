"use client";
import * as Tabs from "@radix-ui/react-tabs";
import DocumentaryCards from "./DocumentaryCards";
import GlobalCards from "./GlobalCards";
import "/public/assets/scss/master.scss";
import { useParams } from "next/navigation";

type GlobalViewProps = {
  documentries: any;
};

const GlobalView = ({ documentries }: GlobalViewProps) => {
  const params = useParams();
  const locale = params?.locale;

  return (
    <>
      <div>
        <div className="lg:flex items-center justify-between pt-12 md:pb-12">
          <div className="w-full">
            {locale == "ko" ? (
              <div className="sec-title-wrapper">
                <h2 className="sec-title title-anim">
                  다큐멘터리 제작지원 및 글로벌 제작인력 양성
                </h2>
                <p className="animate-slideup opacity-0">
                  기획력과 제작역량이 우수한 독창적이고 실험적인 국내{" "}
                  <strong>다큐멘터리 약 130편의 제작을 지원</strong>하여,
                  웰메이드 다큐멘터리의 산실로 자리매김했으며, 국제공동제작
                  워크숍과 해외 유수의 방송사 제작진 교류를 통해 국제공동 제작
                  기틀을 마련하고 글로벌 제작인력을 양성했습니다
                </p>
              </div>
            ) : (
              <div className="sec-title-wrapper">
                <h2 className="sec-title animate-slideup opacity-0">
                  Documantary Production Support and Fostering global production
                  personnel
                </h2>
                <p className="animate-slideup opacity-0">
                  The Broadcasting Content Promotion Foundation (BCPF){" "}
                  <strong>
                    supports the production of approximately 130 domestic
                    documentaries
                  </strong>{" "}
                  with exceptional planning and production capabilities,
                  establishing itself as a hub for high-quality documentaries.
                  Through{" "}
                  <strong>
                    international co-production workshops and the exchange of
                    production staff with leading overseas broadcasters,
                  </strong>{" "}
                  we are laying the foundation for international co-productions
                  and nurturing global production talent
                </p>
              </div>
            )}
          </div>
        </div>

        <Tabs.Root defaultValue="tab1">
          <Tabs.List
            aria-label="Global Documentary"
            className="my-page__tab-wrapper sticky top-0 bg-white z-10">
            <Tabs.Trigger value="tab1" className="my-page__tab">
              주요 다큐멘터리 제작지원작
            </Tabs.Trigger>
            <Tabs.Trigger value="tab2" className="my-page__tab">
              글로벌 제작인력 양성
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="tab1">
            <DocumentaryCards
              initialDocumentaries={documentries.broadcastFeed?.list}
              hasMoreDocumentaries={documentries.broadcastFeed?.hasNextPage}
            />
          </Tabs.Content>
          <Tabs.Content value="tab2">
            <GlobalCards />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </>
  );
};

export default GlobalView;
