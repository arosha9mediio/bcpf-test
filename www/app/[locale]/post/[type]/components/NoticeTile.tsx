type NoticeTileProps = {
  chipLabel?: string;
  isAnnouncement?: boolean;
  content?: string;
  tag?: string;
};

type NoticeTileType = (props: NoticeTileProps) => JSX.Element;

const NoticeTile: NoticeTileType = ({
  chipLabel,
  isAnnouncement,
  content,
  tag,
}) => {
  return (
    <div className="flex flex-row gap-2 items-center">
      {isAnnouncement && (
        <p className="px-2 bg-[#111111] rounded-sm text-center text-white dark:text-black dark:bg-white text-nowrap ">
          {chipLabel}
        </p>
      )}
      {tag && <p className=" text-nowrap ">{`[${tag}]`}</p>}
      <div
        className="capitalize line-clamp-1"
        dangerouslySetInnerHTML={{ __html: content || "" }}
      />
    </div>
  );
};

export { NoticeTile };
