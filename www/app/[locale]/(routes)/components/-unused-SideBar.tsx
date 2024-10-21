import { getDictionary } from "@/dictionaries";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const SideBar = async ({ build }: { build: number }) => {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  //Get user language
  const lang = session.user.language;

  //Fetch translations from dictionary
  const dict = await getDictionary(lang as "en" | "ko");

  if (!dict) return null;

  return <>this is modules.</>;
};
export default SideBar;
