import Image from "next/image";
import IconLogo from "/public/assets/imgs/logo/icon.png";

const LoadingComponent = () => {
  return (
    <div className="flex w-full h-full items-center justify-center gap-5">
      <span className="border p-4 rounded-full animate-spin">
        <Image height={40} width={40} src={IconLogo} alt="Icon Logo" />
      </span>
      <span className="animate-pulse">Loading ...</span>
    </div>
  );
};

export default LoadingComponent;
