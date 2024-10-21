/** @format */

"use client";

import { ChevronDown, ChevronUp, LucideIcon } from "lucide-react";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useMounted from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";

interface NavLink {
  title: string;
  label?: string;
  icon: LucideIcon;
  variant?: "default" | "ghost";
  href?: string;
  children?: NavLink[];
}

interface NavProps {
  isCollapsed: boolean;
  links: NavLink[];
}

function renderLink(
  link: NavLink,
  isCollapsed: boolean,
  finalPathName: string,
  index: number,
  mappedLinks: Record<string, boolean>,
  onToggleExpand: (linkKey: string) => void,
) {
  const uniqueKey = `${link.href}-${index}`;
  const isExp = mappedLinks?.[uniqueKey] ?? true;

  if (link.children) {
    return (
      <div key={index} className="flex flex-col">
        {isCollapsed ? (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                onClick={() => onToggleExpand(uniqueKey)}
                variant="ghost"
                className={cn(
                  buttonVariants({
                    variant: link.href === finalPathName ? "default" : "ghost",
                    size: "icon",
                  }),
                  "h-9 w-9 p-0",
                  link.variant === "default" &&
                    "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                )}>
                <link.icon className="h-4 w-4" />
                <span className="sr-only">{link.title}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-4">
              {link.title}
              {link.label && (
                <span className="ml-auto text-muted-foreground">
                  {link.label}
                </span>
              )}
            </TooltipContent>
          </Tooltip>
        ) : (
          <Button
            onClick={() => onToggleExpand(uniqueKey)}
            variant="ghost"
            className={cn(
              buttonVariants({
                variant: link.href === finalPathName ? "default" : "ghost",
                size: "sm",
              }),
              link.variant === "default" &&
                "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
              "justify-between",
            )}>
            <div className="flex items-center">
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
              {link.label && (
                <span
                  className={cn(
                    "ml-auto",
                    link.variant === "default" &&
                      "text-background dark:text-white",
                  )}>
                  {link.label}
                </span>
              )}
            </div>
            {isExp ? <ChevronUp /> : <ChevronDown />}
          </Button>
        )}
        <div className="ml-4">
          {isExp &&
            link.children.map((childLink, childIndex) =>
              renderLink(
                childLink,
                isCollapsed,
                finalPathName,
                childIndex,
                mappedLinks,
                onToggleExpand,
              ),
            )}
        </div>
      </div>
    );
  } else {
    return (
      <div key={uniqueKey}>
        {isCollapsed ? (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                href={link.href}
                className={cn(
                  buttonVariants({
                    variant: link.href === finalPathName ? "default" : "ghost",
                    size: "icon",
                  }),
                  "h-9 w-9 mt-2",
                  link.variant === "default" &&
                    "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                )}>
                <link.icon className="h-4 w-4" />
                <span className="sr-only">{link.title}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-4">
              {link.title}
              {link.label && (
                <span className="ml-auto text-muted-foreground">
                  {link.label}
                </span>
              )}
            </TooltipContent>
          </Tooltip>
        ) : (
          <Link
            href={link.href}
            className={cn(
              buttonVariants({
                variant: link.href === finalPathName ? "default" : "ghost",
                size: "sm",
              }),
              link.variant === "default" &&
                "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
              "justify-start w-full mt-2",
            )}>
            <link.icon className="mr-2 h-4 w-4" />
            {link.title}
            {link.label && (
              <span
                className={cn(
                  "ml-auto",
                  link.variant === "default" &&
                    "text-background dark:text-white",
                )}>
                {link.label}
              </span>
            )}
          </Link>
        )}
      </div>
    );
  }
}

export function Nav({ links, isCollapsed }: NavProps) {
  const pathName = usePathname();
  const params = useParams();
  const locale = params?.locale;
  const finalPathName = pathName.replace(`/${locale}`, "");
  const [mappedLinks, setMappedLinks] = useState<Record<string, boolean>>({});

  const onToggleExpand = (linkKey: string) => {
    setMappedLinks(prevMappedLinks => ({
      ...prevMappedLinks,
      [linkKey]: !prevMappedLinks[linkKey], // Toggle the specific link's state
    }));
  };

  const { isMounted } = useMounted();
  if (!isMounted) return null;

  return (
    <TooltipProvider>
      <div
        data-collapsed={isCollapsed}
        className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2 dark:text-white">
          {links.map((link, index) =>
            renderLink(
              link,
              isCollapsed,
              finalPathName,
              index,
              mappedLinks, // Pass the state per link
              onToggleExpand, // Pass the toggle function
            ),
          )}
        </nav>
      </div>
    </TooltipProvider>
  );
}
