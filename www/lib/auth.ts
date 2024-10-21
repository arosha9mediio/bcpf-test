import { jwtDecode } from "jwt-decode";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import KakaoProvider, { KakaoProfile } from "next-auth/providers/kakao";
import NaverProvider, { NaverProfile } from "next-auth/providers/naver";
import { client, getClient } from "./client";
import { signOut } from "next-auth/react";

// comment it out for loggin in this page.
const logger = function (...args) {
  // console.log(...args);
};

async function refreshAccessToken(token: JWT) {
  logger(">>>>auth.refreshAccessToken");
  try {
    // Since this will try to attach session, infinity loop will occur
    const response = await getClient(token.accessToken).validateRefreshJwt({
      token: token.refreshToken,
    });
    const newAccessToken = response.validateRefreshJwt;
    return {
      ...token,
      accessToken: newAccessToken,
      refreshToken: token.refreshToken,
    };
  } catch (error) {
    logger({ error });
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/sign-in",
    // error: "/sign-in",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      profile(profile: GoogleProfile, tokens) {
        return {
          id: profile.sub,
          image: profile.picture,
          name: profile.name,
          email: profile.email,
          accessToken: tokens.id_token,
          refreshToken: tokens.refresh_token,
        };
      },
      // Ref: https://stackoverflow.com/questions/76583501/missing-state-cookie-in-next-auth-next-js-13-when-using-googleprovider
      // checks: ["nonce"],
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      profile(profile: KakaoProfile, tokens) {
        return {
          id: profile.id.toString(),
          image: profile.kakao_account.profile?.profile_image_url,
          name: profile.kakao_account.name,
          email: profile.kakao_account.email,
          accessToken: tokens.id_token,
          refreshToken: tokens.refresh_token,
        };
      },
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      profile(profile: NaverProfile, tokens) {
        return {
          id: profile.response.id,
          image: profile.response.profile_image,
          name: profile.response.name,
          email: profile.response.email,
          accessToken: tokens.id_token,
          refreshToken: tokens.refresh_token,
        };
      },
    }),
  ],

  /**
   * callbacks: 인증 및 세션 관리 중 호출되는 각 핸들러를 지정합니다.
   ** callbacks.signIn: 사용자 로그인을 시도했을 때 호출되며, true를 반환하면 로그인 성공, false를 반환하면 로그인 실패로 처리됩니다.
   ** callbacks.redirect: 페이지 이동 시 호출되며, 반환하는 값은 리다이렉션될 URL입니다.
   ** callbacks.jwt: JWT가 생성되거나 업데이트될 때 호출되며, 반환하는 값은 암호화되어 쿠키에 저장됩니다.
   ** callbacks.session: jwt 콜백이 반환하는 token을 받아, 세션이 확인될 때마다 호출되며, 반환하는 값은 클라이언트에서 확인할 수 있습니다. (2번 이상 호출될 수 있습니다)
   * 각 콜백의 호출 순서는 다음과 같습니다.
   ** 사용자가 로그인(회원가입) => signIn => (redirect) => jwt => session
   ** 세션 업데이트 => jwt => session
   ** 세션 확인 => session
   */
  callbacks: {
    // Ref: https://github.com/nextauthjs/next-auth/discussions/8884

    async signIn({ user, account, profile }) {
      // user, account, profile comes from provider
      logger(">>>>>>>auth.signIn");
      // logger("user >> ", user);
      // logger("account >> ", account);
      // logger("profile >> ", profile);
      // Try to signIn with provider's information.

      try {
        const response = await client.signIn({
          input: {
            type: account?.provider?.toUpperCase(),
            code: user.accessToken || account.access_token,
          },
        });
        // logger(">>>>>>response from the server", { response });
        const [accessToken, refreshToken] = response.signIn;
        user.accessToken = accessToken;
        user.refreshToken = refreshToken;
        return true;
      } catch (error) {
        console.error(error?.response?.errors[0].message);
        // return `/ko/sign-in?error=${error?.response?.errors[0].message}`;
      }
    },

    async redirect({ url, baseUrl }) {
      logger(">>>>>>>auth.redirect");
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (url) {
        const { search, origin } = new URL(url);
        const callbackUrl = new URLSearchParams(search).get("callbackUrl");
        if (callbackUrl)
          return callbackUrl.startsWith("/")
            ? `${baseUrl}${callbackUrl}`
            : callbackUrl;
        if (origin === baseUrl) return url;
      }
      return baseUrl;
    },

    /**
     *
     * @param param0
     * @returns
     */
    async jwt({ token, trigger, user, account, profile }) {
      logger(">>>>>>>auth.jwt");
      logger("token >>> ", token); // from the provider.
      // it was not invoked during auth process
      logger("trigger >>> ", trigger); // when signIn shows siginIn , it returns only signin
      logger("user >>> ", user);
      logger("account >>> ", account);
      logger("profile >>> ", profile);

      // Initial sign in / 최초 로그인시만 동작
      if (account && user) {
        logger(">>>>>>>auth.jwt.Initial sign in");
        // Need to update role often
        if (user?.accessToken || account?.accessToken) {
          try {
            const { getMe } = await getClient(
              user?.accessToken || token?.accessToken,
            ).getMe();
            token.id = getMe?.id;
            token.role = getMe?.role;
            token.phone = getMe?.UserProfile?.phone;
            // token.language = getMe?.UserProfile?.language;
          } catch (e) {
            console.error({ e });
            if (e?.response?.errors?.[0]?.extensions?.code === "FORBIDDEN") {
              return { ...token, error: "LoginError" };
            }
          }
        }

        // instead of upper.
        return {
          ...token,
          ...user,
        };
      }

      logger(">>>>>>>auth.refreshAccessToken.check");
      try {
        const decoded = jwtDecode(token.accessToken);
        logger(
          "exp : ",
          new Date((decoded.exp as number) * 1000),
          "\nnow : ",
          new Date(),
        );
        // if access token was expired then get new token by refreshToken process.
        if (decoded.exp * 1000 > Date.now()) {
          logger("return token");
          return token;
        } else {
          logger("User token was expired!!");
          logger({ decoded, now: Date.now() });
        }
      } catch (e) {
        logger({ e });
        // throw e;
      }
      const freshToken = await refreshAccessToken(token);
      return freshToken;
    },
    // If you want to use the role in client components
    async session({ session, token }) {
      logger(">>>>>auth.session");
      logger("session>>", session);
      logger("token>>", token);

      // I dont know why server doesnt get user info if i remove below.
      // todo: #228 @JongKwanPark Why token should be copied into the sesssion.user
      if (session?.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = session.user.refreshToken;
        session.user.role = token.role;
        session.user.language = token.language;
        session.error = token.error;
        session.user.image = token.picture;
        session.user.phone = token.phone;
      }
      return session;
    },
  },
};
