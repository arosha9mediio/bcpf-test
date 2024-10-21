import { UserRoles } from "@/constants/enums";
import { RoutePaths } from "@/constants/route";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const Page = async () => {
  const { user } = await getServerSession(authOptions);

  switch (user?.role) {
    case UserRoles.ADMIN:
      return redirect(RoutePaths.adminHome.value);

    case UserRoles.TEACHER:
      return redirect(RoutePaths.adminContest.value);

    case UserRoles.USER:
      return null;
  }
};

export default Page;
