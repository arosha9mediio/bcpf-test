"use client";
import * as Tabs from "@radix-ui/react-tabs";
import "/public/assets/scss/master.scss";
import { useRouter } from "next/navigation";

const SELECTABLE_YEARS = [
  "2023",
  "2022",
  "2021",
] as const;

type SingleAwardTabsProps = {
  query?: string;
};

type SingleAwardTabsType = (props: SingleAwardTabsProps) => JSX.Element;

const SingleAwardTabs: SingleAwardTabsType = ({ query }) => {
  const { replace } = useRouter();

  //
  const handleTab = async (q: string) => {
    if (!q) {
      return;
    }

    replace("?" + "year=" + q, { scroll: false });
  };

  return (
    <>
      <div className="">
        <Tabs.Root defaultValue={query} onValueChange={a => handleTab(a)}>
          <Tabs.List
            aria-label="Public Interest Awards"
            className="my-page__tab-wrapper sticky top-0 bg-white z-10 mt-8">
            {/*  */}
            {SELECTABLE_YEARS.map((year, index) => (
              <Tabs.Trigger key={index} value={year} className="my-page__tab">
                {year + "년"}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {SELECTABLE_YEARS.map((year, index) => (
            <Tabs.Content key={`year-${index}`} value={year}></Tabs.Content>
          ))}
        </Tabs.Root>
      </div>
    </>
  );
};

export { SingleAwardTabs };
export { SELECTABLE_YEARS };
