import { clsx, type ClassValue } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return moment(date).format("YYYY/MM/DD");
}

export const isProd = process.env.NODE_ENV === "production";

export const isServer = typeof window === "undefined";

const userAgent = isServer ? "SSR" : navigator.userAgent;

export const isMobile = () => {
  if (isServer) return false;
  const isUserAgentMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent,
    );
  const screenWidth = window.innerWidth;
  return isUserAgentMobile || screenWidth < 640;
};
