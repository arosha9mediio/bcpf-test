import { DateTimeFormatter } from "@/components/table/formatters/DateTimeFormatter";
import { NextTableViewModes } from "@/components/table/NextTable";
import Link from "next/link";

type PressCardProps = {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  date?: string;
  views?: number;

  imgCls?: string;

  mode?: NextTableViewModes;
};

type PressCardType = (props: PressCardProps) => JSX.Element;

const DatenView = ({ date, views }: Pick<PressCardProps, "date" | "views">) => {
  if (!Boolean(date && views)) {
    return null;
  }

  return (
    <div id="date-n-views" className="flex flex-row gap-8 ">
      <p className="text-[#555555]">
        {DateTimeFormatter({ date, format: "yyyy-MM-dd" })}
      </p>

      <div className="flex flex-row gap-1 ">
        <p className="text-[#555555]">{"Views:"}</p>
        <p className="text-[#555555]">{views}</p>
      </div>
    </div>
  );
};

const PressCard: PressCardType = ({
  id,
  image,
  title,
  subtitle,
  date,
  views,
  mode,

  imgCls,
}) => {
  const isColumn = mode === "column";
  const isGrid = mode === "grid";
  return (
    <Link
      href={{
        pathname: `/post/press/${id}`,
      }}>
      <div
        className={`overflow-hidden flex flex-col  h-full
             md:max-h-[350px] lg:max-h-[430px]
                ${isColumn && "sm:flex sm:flex-row"}`}>
        <div className="overflow-hidden h-[228px] flex justify-center">
          <img
            src={image}
            alt="Article Image"
            className={`object-cover w-full h-full
                  ${!isColumn && "max-h-[228px]"}
                  ${isColumn && "sm:max-w-[347px] max-h-[228px]"}
                  ${imgCls}`}
          />
        </div>

        {/* <img
          className={`w-full h-auto object-cover object-center 
          ${!isColumn && "sm:max-h-[90px] lg:max-h-[175px] xl:max-h-[228px]"} ${
            isColumn && "sm:max-w-[347px] max-h-[200px]"
          } ${imgCls}`}
          src={image}
          alt="Article Image"
        /> */}
        <div className="w-full  flex flex-col justify-center py-4 divide-y gap-2">
          {/* DATE */}
          {isGrid && <DatenView date={date} views={views} />}

          {/* TITLES  */}
          <div id="title-subtitle" className="py-2">
            <h3
              // className={`text-2xl font-semibold text-gray-800 mt-2 mb-2 ${isGrid && "sm:truncate sm:height-[80px]"}`}
              className={`text-2xl font-semibold text-gray-800 mt-2 mb-2 line-clamp-2 dark:text-white`}>
              {title}
            </h3>
            <p
              className="text-lg text-gray-600 line-clamp-2"
              dangerouslySetInnerHTML={{ __html: subtitle }}
            />
          </div>

          {/* DATE */}
          {isColumn && (
            <div className="py-2">
              <DatenView date={date} views={views} />{" "}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export { PressCard };
