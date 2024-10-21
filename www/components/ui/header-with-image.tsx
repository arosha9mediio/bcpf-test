import { HeadingProps } from "./heading";

type HeadingWithImageProps = { image?: string } & HeadingProps;

type HeadingWithImageType = (props: HeadingWithImageProps) => JSX.Element;

const HeadingWithImage: HeadingWithImageType = ({
  title,
  description,
  visibility,
  image,
}) => {
  return (
    <div className="relative ">
      <img
        src={image}
        alt="Your Image"
        className="w-full  opacity-35   sm:max-h-[200px]  object-cover object-bottom "
      />
      <div className="absolute bottom-0 left-[5vw] p-4">
        <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white">
          {title}
        </h2>
        <p className="text-sm lg:text-base text-white">{description}</p>
      </div>
    </div>
  );
};

export { HeadingWithImage };
