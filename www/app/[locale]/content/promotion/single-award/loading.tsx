import LoadingComponent from "@/components/LoadingComponent";

type LoadingProps = {};

type LoadingType = (props: LoadingProps) => JSX.Element;

const Loading: LoadingType = () => {
  return (
    <div className="p-5">
      <LoadingComponent />
    </div>
  );
};

export default Loading;
