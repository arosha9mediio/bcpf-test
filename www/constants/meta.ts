// SITE META
const sitename = {
  en: "BCPF",
  ko: "방송콘텐츠진흥재단",
} as const;

const siteDescription = {
  en: "BCPF is ....",
  ko: "방송콘텐츠진흥재단에 오신 것을 환영합니다.",
} as const;

//  SOCIAL META
const socialMeta = {
  en: {
    openGraph: {
      image: "fallback",
    },
    twitter: {
      // use fallback img for social cover
      image: "fallback",
    },
  },
  ko: {
    openGraph: {
      image: "fallback",
    },
    twitter: {
      image: "fallback ko",
    },
  },
} as const;

export { sitename, siteDescription, socialMeta };
