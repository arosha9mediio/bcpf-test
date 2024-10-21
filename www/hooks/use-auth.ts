import { client } from "@/lib/client";
import { signOut } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState(null);

  const getUserAndSetState = useCallback(() => {
    client
      .getMe()
      .then(res => {
        setUser(res.getMe);
      })
      .catch(e => {
        console.error({ ...e });
        // signOut();
      });
  }, []);

  useEffect(() => {
    getUserAndSetState();
  }, [getUserAndSetState]);

  return { user, refresh: getUserAndSetState };
};
