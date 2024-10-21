"use client";
import { toast } from "@/components/ui/use-toast";
import {
  SessionProvider,
  SessionProviderProps,
  signOut,
} from "next-auth/react";
import { useEffect } from "react";

type NextSessionProviderProps = {} & SessionProviderProps;

type NextSessionProviderType = (props: NextSessionProviderProps) => JSX.Element;

const NextSessionProvider: NextSessionProviderType = ({
  session,
  children,
}) => {
  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signOut(); // Sign out user if token invalid
      return;
    } else if (session?.error === "LoginError") {
      // signOut();
      toast({
        variant: "destructive",
        description: "로그인 오류가 발생하였습니다. 다시 시도해 주세요.",
      });
    }
  }, [session]);

  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export { NextSessionProvider };
