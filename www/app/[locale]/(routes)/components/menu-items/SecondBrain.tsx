"use client";
import { Lightbulb } from "lucide-react";
import Link from "next/link";

import { usePathname } from "next/navigation";

type Props = {
  open: boolean;
};

const SecondBrainModuleMenu = ({ open }: Props) => {
  const pathname = usePathname();
  const isPath = pathname.includes("secondBrain");
  return (
    <div className="flex flex-row items-center mx-auto p-2">
      <Link
        href={"/secondBrain"}
        className={`flex gap-2 p-2 ${isPath ? "text-muted-foreground" : null}`}>
        <Lightbulb className="w-6" />
        <span className={open ? "" : "hidden"}>Second brain</span>
      </Link>
    </div>
  );
};

export default SecondBrainModuleMenu;
