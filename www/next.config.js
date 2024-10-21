const withNextIntl = require("next-intl/plugin")(
  // This is the default (also the `src` folder is supported out of the box)
  "./i18n.ts",
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ref: https://stackoverflow.com/questions/64926174/module-not-found-cant-resolve-fs-in-next-js-application
  webpack: config => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  images: {
    domains: [
      "localhost",
      "pjt1.mediio.net",
      "lh3.googleusercontent.com",
      "d1gzdv9eu35p8z.cloudfront.net",
      "bcpf.or.kr",
    ],
  },
};

module.exports = withNextIntl(nextConfig);
