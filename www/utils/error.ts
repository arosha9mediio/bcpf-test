"use client";

import { useToast } from "@/components/ui/use-toast";
import { get, isEmpty } from "lodash";
import { useEffect } from "react";
const errorPath = "graphQLErrors[0].extensions.exception.response.fields";
export const getFieldErrors = (error, path = errorPath) => get(error, path);

export const isInputError = graphqlError => {
  const code = get(graphqlError, "extensions.exception.response.fields", "");
  return code !== "";
};
export const getFieldError = err => {
  const errors = getFieldErrors(err);
  if (isEmpty(errors)) return "";
  return errors?.[0];
};

export function getErrorMessage(error: any) {
  if (error && error !== undefined) {
    const graphqlError = get(error, "response.errors[0]");
    if (graphqlError) {
      if (isInputError(graphqlError)) {
        return getFieldError(graphqlError);
      } else {
        if (graphqlError?.extensions?.code === "INTERNAL_SERVER_ERROR") {
          if (graphqlError?.extensions?.exception?.response?.MESSAGE) {
            return graphqlError?.extensions?.exception?.response?.MESSAGE;
          } else if (graphqlError?.extensions?.exception?.message) {
            return graphqlError?.extensions?.exception?.message;
          } else {
            return graphqlError?.message;
          }
        } else if (graphqlError.extensions.code === "FORBIDDEN") {
          return "이 작업을 수행 할 수 없습니다.";
        } else {
          return graphqlError.message || "알수없는 오류가 발생하였습니다.";
        }
      }
    } else {
      if (typeof error == "string") {
        return error;
      }
    }
  }
}

export const useErrorHandlerWithToast = error => {
  const { toast } = useToast();
  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: getErrorMessage(error) || "Something went wrong",
      });
    }
  }, [error]);
  return { isError: !!error };
};
