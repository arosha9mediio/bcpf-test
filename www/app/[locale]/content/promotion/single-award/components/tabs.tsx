"use client";
import * as Tabs from "@radix-ui/react-tabs";
import "/public/assets/scss/master.scss";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const SELECTABLE_YEARS = [
  { year: "2023", label: "7" },
  { year: "2022", label: "6" },
  { year: "2021", label: "5" },
  { year: "2020", label: "4" },
  { year: "2019", label: "3" },
  { year: "2018", label: "2" },
  { year: "2017", label: "1" },
] as const;

type SingleAwardTabsProps = {
  query?: string;
};

type SingleAwardTabsType = (props: SingleAwardTabsProps) => JSX.Element;

const SingleAwardTabs: SingleAwardTabsType = ({ query }) => {
  const { replace } = useRouter();
  const t = useTranslations();

  //
  const handleTab = async (q: string) => {
    if (!q) {
      return;
    }

    replace("?" + "year=" + q, { scroll: false });
  };

  return (
    <>
      <div className="mt-12 md:mt-20">
        <h3 className="text-2xl font-bold">{t("single_sec_header")}</h3>
      </div>

      <div className="">
        <div>
          {/* <h3 className="text-2xl font-bold">공익 영상공모전 제작지원작</h3> */}
          {/* <p className="mt-2 text-xl">Some interesting public videos</p> */}
        </div>

        <Tabs.Root defaultValue={query} onValueChange={a => handleTab(a)}>
          <Tabs.List
            aria-label="Public Interest Awards"
            className="my-page__tab-wrapper sticky top-0 bg-white z-10 mt-8">
            {/*  */}
            {SELECTABLE_YEARS.map(({ year, label }, index) => (
              <Tabs.Trigger key={index} value={year} className="my-page__tab">
                {"제" + label + "회"}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {SELECTABLE_YEARS.map(({ year }, index) => (
            <Tabs.Content key={`year-${index}`} value={year}></Tabs.Content>
          ))}
        </Tabs.Root>
      </div>
    </>
  );
};

export { SingleAwardTabs };
export { SELECTABLE_YEARS };
