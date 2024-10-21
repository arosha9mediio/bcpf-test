/** @format */
"use client";
import Image from "next/image";
import { Suspense, useState } from "react";
import LogoWhite2 from "/public/assets/imgs/logo/logo-black.png";
import LogoDark from "/public/assets/imgs/logo/site-logo-white-2.png";

type Props = {};

import { Nav } from "@/components/ui/nav";
import { RoutePaths } from "@/constants/route";
import { useWindowSize } from "@/hooks/window";
import { cn } from "@/lib/utils";
import {
  RectangleEllipsis,
  HelpingHand,
  Home,
  Images,
  LayoutDashboard,
  Megaphone,
  Newspaper,
  Wallpaper,
  BookUser,
  Users,
  Trophy,
  BarChart4Icon,
  LayoutTemplate,
  GalleryHorizontalEnd,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/hooks/use-auth";
import { UserRoles } from "@/constants/enums";
import LoadingComponent from "@/components/LoadingComponent";

export default function SideNavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const t = useTranslations();
  const { width } = useWindowSize();
  const mobileWidth = width < 768;

  const { user } = useAuth();

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  const MENU_TEACHER = [
    {
      title: t("Contest"),
      href: RoutePaths.adminContest.value,
      icon: Trophy,
    },
    {
      title: t("Contest Apply"),
      href: RoutePaths.adminApplicant.value,
      icon: BookUser,
    },
  ];

  const MENU_ADMIN = [
    {
      title: t("Dashboard"),
      href: RoutePaths.adminHome.value,
      icon: BarChart4Icon,
    },

    {
      title: t("Home"),
      // href: RoutePaths.adminHomeMainSlider.value,
      icon: Home,

      children: [
        {
          title: t("Main Slider"),
          href: RoutePaths.adminHomeMainSlider.value,
          icon: Wallpaper,
        },
        {
          title: t("Feature"),
          href: RoutePaths.adminFeature.value,
          icon: Images,
        },
        {
          title: t("Slider"),
          href: RoutePaths.adminSlider.value,
          icon: GalleryHorizontalEnd,
        },
        {
          title: t("Ticker"),
          href: RoutePaths.adminTicker.value,
          icon: RectangleEllipsis,
        },
      ],
    },
    {
      title: t("Bulletin Board"),
      // href: RoutePaths.adminNotice.value,
      icon: LayoutDashboard,

      children: [
        {
          title: t("Notice"),
          href: RoutePaths.adminNotice.value,
          icon: Megaphone,
        },
        {
          title: t("Press"),
          href: RoutePaths.adminPress.value,
          icon: Newspaper,
        },
      ],
    },
    {
      title: t("Page"),
      href: RoutePaths.adminPage.value,
      icon: LayoutTemplate,
    },
    {
      title: t("Sponsor/Donation"),
      href: RoutePaths.adminDonation.value,
      icon: HelpingHand,
    },
    {
      title: t("Users"),
      href: RoutePaths.adminUsers.value,
      icon: Users,
    },
  ];

  return (
    <div
      className={cn(
        "relative border-r px-3 pb-10 pt-4 dark:border-slate-700 dark:bg-slate-900",
        !isCollapsed && "w-[325px]",
        mobileWidth && "w-[85px]",
      )}>
      <div className="header__logo-2 pb-8">
        <Image
          priority
          className="dark:hidden"
          style={{ width: "auto", height: "auto" }}
          src={LogoWhite2}
          alt="Site Logo"
        />
        <Image
          priority
          className="hidden dark:block"
          style={{ width: "auto", height: "auto" }}
          src={LogoDark}
          alt="Site Logo"
        />
      </div>
      {/* {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className="rounded-full p-2">
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        </div>
      )} */}
      {user ? (
        <Nav
          isCollapsed={mobileWidth ? true : isCollapsed}
          links={
            user?.role === UserRoles.ADMIN
              ? [...MENU_ADMIN, ...MENU_TEACHER]
              : MENU_TEACHER
          }
        />
      ) : (
        <></>
      )}
    </div>
  );
}
