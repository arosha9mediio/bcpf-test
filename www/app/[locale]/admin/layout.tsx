import { RoutePaths } from "@/constants/route";
import { authOptions } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Header from "../(routes)/components/Header";
import SideNavbar from "./components/SideNavbar";
import { pretendard } from "@/utils/font";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  children: React.ReactNode;
}

const AdminLayout: React.FC<Props> = async ({ children }) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect(RoutePaths.signIn.value);
  }
  return (
    <div
      className={cn(
        "min-h-screen w-full text-black flex fixed",
        pretendard.variable,
        "font-sans",
      )}>
      {/* SIDE BAR */}
      <SideNavbar />
      {/* MAIN PAGE */}
      <div className="flex flex-col w-full">
        <div className="absolute top-0 right-0 z-50 w-full pl-80 2xl:pl-80 xl:pl-[280px] lg:pl-[150px] md:pl-[160px]">
          <Header
            id={session.user.id}
            name={session.user.name}
            email={session.user.email}
            avatar={session.user.image}
          />
        </div>
        <div className="h-full">
          <ScrollArea className="h-screen flex flex-col overflow-hidden">
            <div className="p-6 mt-16">{children}</div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
