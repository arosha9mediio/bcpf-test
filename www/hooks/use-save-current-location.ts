import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const useSaveCurrentLocation = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    const callbackUrl = `${pathName}?${searchParams.toString()}`;
    localStorage.setItem("callbackUrl", callbackUrl);
  }, [pathName, searchParams]);
};

export default useSaveCurrentLocation;
