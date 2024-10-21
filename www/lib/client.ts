import { GraphQLClient } from "graphql-request";

import { getSdk } from "@/lib/__generated/sdk";
import { endpoint } from "../codegen";

import { getServerSession } from "next-auth";
import { getSession, signOut } from "next-auth/react";
import { authOptions } from "./auth";
import { isServer } from "./utils";
import { redirect } from "next/navigation";
import { cache } from "react";

const getAccessToken = async () => {
  const session = isServer
    ? await getServerSession(authOptions)
    : await getSession();
  return session?.user?.accessToken;
};

const clientcachemiddleware = (accessToken?: string) =>
  new GraphQLClient(endpoint, {
    // fetch: cache(async (url, params) =>
    //   fetch(url, { ...params, next: { revalidate: 60 } }),
    // ),

    requestMiddleware: async req => {
      // append auth headers, etc
      req.headers = {
        ...req.headers,
        Authorization: `Bearer ${accessToken || (await getAccessToken())}`,
        site: "medigrant",
        lang: "en",
      };

      // if present, pull the next config out of the headers and hoist to the top level request config
      const { next, ...headers } = req.headers as HeadersInit & {
        next: { revalidate: number };
      };
      let nextConfig = {};
      if (next) {
        nextConfig = { next };
        req.headers = headers;
      }

      return {
        ...req,
        ...nextConfig,
      };
    },
    responseMiddleware: async (res: any) => {
      const aa = res;
      // if (aa.response.errors[0].extensions.code == "FORBIDDEN") {
      //   console.log("\n\n\n\n\n\n\nsignout()", {
      //     ...aa.response.errors[0].extensions,
      //   });
      //   await signOut();
      //   return {};
      // }
    },
  });

export const client = getSdk(clientcachemiddleware());
export const getClient = (accessToken: string) =>
  getSdk(clientcachemiddleware(accessToken));
