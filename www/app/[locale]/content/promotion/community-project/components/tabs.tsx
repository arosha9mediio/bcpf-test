"use client";
import * as Tabs from "@radix-ui/react-tabs";
import "/public/assets/scss/master.scss";
import { useRouter } from "next/navigation";

const SELECTABLE_YEARS = [
  { year: "2023", label: "4" },
  { year: "2022", label: "3" },
  { year: "2021", label: "2" },
  { year: "2020", label: "1" },
] as const;

type SingleProjectTabsProps = {
  query?: string;
};

type SingleProjectTabsType = (props: SingleProjectTabsProps) => JSX.Element;

const SingleProjectTabs: SingleProjectTabsType = ({ query }) => {
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
        {/* <div>
          <h3 className="text-2xl font-bold animate-slideup opacity-0">
            제작지원작
          </h3>
          <p className="mt-2 text-xl animate-slideup opacity-0">
            제4회 ‘방방곳곡:지역이-음’ 우수콘텐츠
          </p>
        </div> */}
        <Tabs.Root defaultValue={query} onValueChange={a => handleTab(a)}>
          <Tabs.List
            aria-label="Public Interest Projects"
            className="my-page__tab-wrapper sticky top-0 bg-white z-10 mt-8">
            {/*  */}
            {SELECTABLE_YEARS.map(({ year, label }, index) => (
              <Tabs.Trigger key={index} value={year} className="my-page__tab">
                {"제" + label + "회 제작지원작"}
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

export { SingleProjectTabs };
export { SELECTABLE_YEARS };
