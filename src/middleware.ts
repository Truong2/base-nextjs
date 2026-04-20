import createMiddleware from "next-intl/middleware";
import { pathnames } from "./i18n-pathnames";
import { fallbackLng, localePrefix, locales } from "./navigation";

export const config = {
  // matcher: '/:lng*'
  // exclude /api, /_next/static, /_next/image, /assets, /favicon.ico, /sw.js, /cms /monitoring
  matcher: ["/((?!api|_next|cms|monitoring|.*\\..*).*)"],
};

export default createMiddleware({
  defaultLocale: fallbackLng,
  localePrefix,
  locales,
  pathnames,
});
