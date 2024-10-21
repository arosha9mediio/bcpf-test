import { Exact } from "@/lib/__generated/sdk";
import { GraphQLClientRequestHeaders } from "graphql-request/build/esm/types";

type MutationMethod<DTO, R> = (
  variables?: Exact<{
    input: DTO;
  }>,
  requestHeaders?: GraphQLClientRequestHeaders,
) => Promise<R>;

const handleMutation = async <T, R>(
  payload: T,
  mutation: MutationMethod<T, R>,
): Promise<R> => {
  return mutation({ input: payload });
};

const handleCreation = async <T, R>(
  payload: T,
  creation: MutationMethod<T, R>,
): Promise<R> => {
  return creation({ input: payload });
};

export { handleMutation, handleCreation };
export type { MutationMethod };
