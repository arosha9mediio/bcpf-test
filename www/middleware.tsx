import { UserRoles } from "@/constants/enums";
import { withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { privatePages } from "./constants/route";

export const locales = ["ko", "en"] as const;

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: locales[0],
});

const authMiddleware = withAuth(
  function middleware(req) {
    if (
      req.nextUrl.pathname.includes("admin") &&
      req.nextauth.token?.role == UserRoles.USER
    ) {
      // denied
      return NextResponse.redirect(new URL("/denied", req.url));
    }
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/sign-in",
    },
  },
);

export default function middleware(req: NextRequest) {
  console.log(">>>>>>>>>>>>>this is middleware.");
  if (req.nextUrl.pathname == "/" || req.nextUrl.pathname == "/ko") {
    return NextResponse.redirect(new URL("/ko/home", req.url));
  }
  if (req.nextUrl.pathname == "/admin") {
    return NextResponse.redirect(new URL("/ko/admin/home", req.url));
  }

  const privatePathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${privatePages
      .flatMap(p => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i",
  );

  const isPrivate = privatePathnameRegex.test(req.nextUrl.pathname);

  if (isPrivate) {
    return (authMiddleware as any)(req);
  } else {
    return intlMiddleware(req);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

export type Locales = (typeof locales)[number];
