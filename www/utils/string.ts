import { notFound } from "next/navigation";

const stripHtmlTags = str => {
  return str.replace(/<\/?[^>]+(>|$)/g, "");
};

export async function getLocales(locale: string) {
  try {
    return (await import(`@/locales/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}