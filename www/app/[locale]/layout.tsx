import "./globals.css";

import { Inter } from "next/font/google";

import { createTranslator, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { NextSessionProvider } from "../providers/SessionProvider";
import DateLocalProvider from "../providers/DateLocalProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Suppress the errors
// const consoleError = console.error.bind(console);
// console.error = (message: any, ...args: any) => {
//   if (
//     typeof message === "string" &&
//     message.startsWith("[React Intl] Missing message:")
//   ) {
//     return;
//   }
//   consoleError(message, ...args);
// };

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: ReactNode;
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
    metadataBase: process.env.NEXT_PUBLIC_APP_URL,
    title: t("RootLayout_title"),
    description: t("RootLayout_description"),
    openGraph: {
      url: process.env.NEXT_PUBLIC_APP_URL,
      type: "website",
      images: [
        {
          url: "/images/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: t("RootLayout_title"),
        },
      ],
      title: t("RootLayout_title"),
      description: t("RootLayout_description"),
    },
    twitter: {
      url: process.env.NEXT_PUBLIC_APP_URL,
      title: t("RootLayout_title"),
      description: t("RootLayout_description"),
      domain: "bcpf.or.kr",

      cardType: "summary_large_image",
      image: "/images/opengraph-image.png",
      width: 1200,
      height: 630,
      alt: t("RootLayout_title"),
    },
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: Props) {
  const messages = await getLocales(locale);
  const session = await getServerSession(authOptions);

  // console.log disable.
  if (process.env.NODE_ENV !== "development") {
    console.log = function () {};
  }

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1"
        />
        <script
          defer
          type="text/javascript"
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=f1406175983b0df8500f74e49f04fb77&autoload=false"></script>
      </head>
      <body className={inter.className + "h-screen "}>
        <NextSessionProvider session={session}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <DateLocalProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem>
                {children}
              </ThemeProvider>
            </DateLocalProvider>
          </NextIntlClientProvider>
        </NextSessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
