"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menu-bar";
import { RoutePaths } from "@/constants/route";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { LogIn, LogOut, User } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type ProfileMenuProps = {
  children: ReactNode;
};

const baseClass = {
  default: "w-4 h-4 inline-block mr-2 stroke-current ",
  authenticated: "text-red-600",
};

const LABELS = {
  authenticated: "account_logout",
  unauthenticated: "account_login",
} as const;

type ProfileMenuType = (props: ProfileMenuProps) => JSX.Element;

const ProfileMenu: ProfileMenuType = ({ children }) => {
  const path = usePathname();
  const t = useTranslations();
  const { status } = useSession();

  const handleAuthOnClick = () => {
    if (status === "unauthenticated") {
      signIn();
      return;
    }

    signOut();
  };

  if (status === "unauthenticated") {
    return (
      <Link
        href={{
          pathname: RoutePaths.signIn.value,
          query: `callbackUrl=${process.env.NEXT_PUBLIC_APP_URL}${path}`,
        }}>
        {children}
      </Link>
    );
  }

  return (
    <Menubar className="bg-transparent border-none">
      <MenubarMenu>
        <MenubarTrigger className="data-[state=open]:bg-transparent focus:bg-transparent p-0 ">
          {children}
        </MenubarTrigger>
        <MenubarContent className="z-[1000]">
          <Link
            prefetch={false}
            href={{ pathname: "/mypage" }}
            className={clsx("", {
              ["pointer-events-none"]: status !== "authenticated",
            })}>
            <MenubarItem disabled={status !== "authenticated"}>
              <User className={cn(baseClass.default)} />
              {t("account_my_page")}
            </MenubarItem>
          </Link>

          <MenubarSeparator />
          <MenubarItem onClick={handleAuthOnClick}>
            {status === "authenticated" ? (
              // AUTH
              <>
                <LogOut
                  className={cn(baseClass.default, baseClass.authenticated)}
                />
                {t(LABELS.authenticated)}
              </>
            ) : (
              //   UNAUTH
              <>
                <LogIn className={cn(baseClass.default)} />
                {t(LABELS.unauthenticated)}
              </>
            )}
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export { ProfileMenu };
