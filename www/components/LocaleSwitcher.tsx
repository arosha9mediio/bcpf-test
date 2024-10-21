import { Locales, locales } from "@/middleware";
import { useLocale, useTranslations } from "next-intl";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import Image, { StaticImageData } from "next/image";
import { useMemo, useTransition } from "react";

import clsx from "clsx";
import ENW from "/public/assets/imgs/icon/en-white.png";
import END from "/public/assets/imgs/icon/en.png";
import KRW from "/public/assets/imgs/icon/kr-white.png";
import KRD from "/public/assets/imgs/icon/kr.png";

type LocaleProp = {
  //   locale: Locales;
  label?: string;

  dark: StaticImageData;
  light: StaticImageData;
};

const LOCALES: { [key in Locales]: LocaleProp } = {
  ko: { dark: KRD, light: KRW, label: "KOREAN" },
  en: { dark: END, light: ENW, label: "ENG" },
};
const localeOrder: Locales[] = ["ko", "en"];

const { useRouter, usePathname } = createSharedPathnamesNavigation({
  locales: locales,
});

const LocaleSwitcher = ({ invert = false }: { invert: boolean }) => {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale() as Locales;

  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  const getNextLocale = (current: Locales): Locales => {
    const currentIndex = localeOrder.indexOf(current);
    const nextIndex = (currentIndex + 1) % localeOrder.length;
    return localeOrder[nextIndex];
  };

  const nextLocale = useMemo(() => getNextLocale(locale), [locale]);

  const onSelectChange = () => {
    startTransition(() => {
      replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <button
      className={clsx("", {
        ["dark"]: invert,
        ["dark:invert-0 bg-transparent dark:bg-transparent"]: !invert,
      })}
      onClick={onSelectChange}
      disabled={isPending}>
      <Image
        className="block dark:hidden"
        priority
        width={24}
        height={24}
        src={LOCALES[nextLocale].dark}
        alt="Menubar Icon"
      />

      <Image
        className="hidden dark:block"
        priority
        width={24}
        height={24}
        src={LOCALES[nextLocale].light}
        alt="Menubar Icon"
      />
    </button>
  );
};

export { LocaleSwitcher };
