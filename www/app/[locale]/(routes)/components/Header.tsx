import AvatarDropdown from "./ui/AvatarDropdown";

import { ThemeToggle } from "@/components/ThemeToggle";

type Props = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

const Header = ({ id, name, email, avatar }: Props) => {
  return (
    <div className="flex h-20 justify-between items-center p-5 space-x-5 backdrop-blur-sm bg-white/30 dark:bg-[#020817]/30">
      <div className="flex flex-1 items-center gap-3 justify-end">
        {/* <CommandComponent /> */}
        {/* <SetLanguage userId={id} lang={lang} /> */}
        {/* <Feedback /> */}
        <ThemeToggle />
        {/* <SupportComponent /> */}
        <AvatarDropdown avatar={avatar} userId={id} name={name} email={email} />
      </div>
    </div>
  );
};

export default Header;
