import { createTranslator } from "next-intl";
import { notFound, redirect } from "next/navigation";

import "@/app/[locale]/globals.css";
import { RoutePaths } from "@/constants/route";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

type Props = {
  params: { locale: string };
};

async function getLocales(locale: string) {
  try {
    return (await import(`@/locales/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export async function generateMetadata({ params: { locale } }: Props) {
  const messages = await getLocales(locale);
  const t = createTranslator({ locale, messages });
  return {
    title: t("RootLayout_title"),
    description: t("RootLayout_description"),
  };
}

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect(RoutePaths.home.value);
  }
  return children;
};

export default AuthLayout;
