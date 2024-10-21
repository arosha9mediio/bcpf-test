"use client";

import { useRouter } from "next/navigation";
import { MutationMethod, handleCreation, handleMutation } from "./mutations";
import { RoutePaths } from "@/constants/route";
import { useToast } from "@/components/ui/use-toast";
import { useTranslations } from "next-intl";
import { getErrorMessage } from "@/utils/error";

type UnionKeys<T extends object, U extends object> = keyof T | keyof U;

type PartialUnion<T1, T2> = Partial<T1> | Partial<T2>;

/**
 * @param isMutation new | edit
 * @param networkCallback callback for setState of network loading
 * @param creation gql mutation of creation
 * @param mutation gql mutation of update
 * @param related pipe values to dto that arnt in form payload
 * @param skip skipping props of DTO
 * @param formSkip skipping props of form. !!!manual
 * @returns
 */
const useOnSumbit = <CDTO extends object, MDTO extends object, CR, MR>(
  isMutation: boolean,
  networkCallback: (state: boolean) => void,
  creation: MutationMethod<CDTO, CR>,
  mutation: MutationMethod<MDTO, MR>,
  related: PartialUnion<CDTO, MDTO>,
  skip: UnionKeys<CDTO, MDTO>[],
  formSkip?: string[],
) => {
  const { push, refresh } = useRouter();
  const { toast } = useToast();
  const t = useTranslations();
  //

  const handleRouter = () => {
    push(RoutePaths.mypage.value);
    refresh();
  };

  const handleMutationSuccessToast = (e: unknown) => {
    toast({
      title: `${t("user_contest_update_toast")} | ${e}`,
    });
  };

  const handleCreationSuccessToast = (e: unknown) => {
    toast({
      title: `${t("user_contest_apply_toast")} ${e}`,
    });
  };

  const handleFailureToast = (e: unknown) => {
    toast({
      variant: "destructive",
      title: t("user_contest_apply_failure_toast"),
      description: getErrorMessage(e),
    });
  };

  const submit = async (payload: PartialUnion<CDTO, MDTO>) => {
    networkCallback(true);

    try {
      const _relatedPayload = { ...related, ...payload };

      const omitted = omitProps(_relatedPayload, skip, formSkip);

      if (isMutation) {
        await handleMutation(omitted, mutation);

        handleRouter();

        handleMutationSuccessToast(related?.["id"]);
        return;
      }

      await handleCreation(omitted, creation);
      handleRouter();
      handleCreationSuccessToast(related?.["contestId"]);

      //
    } catch (error) {
      console.log(error);

      handleFailureToast(related?.["contestId"]);
    } finally {
      networkCallback(false);
    }
  };

  return { punch: submit };
};

const omitProps = <T extends object, E extends object>(
  payload: PartialUnion<T, E>,
  _keys: UnionKeys<T, E>[],
  miscKeys?: string[],
) => {
  const keys = [..._keys, ...(miscKeys as UnionKeys<T, E>[])];

  if (keys?.length === 0 && miscKeys?.length == 0) {
    return payload;
  }

  return Object?.keys(payload).reduce(
    (result, key) => {
      if (!keys?.includes(key as UnionKeys<T, E>)) {
        result[key as keyof PartialUnion<T, E>] =
          payload[key as keyof PartialUnion<T, E>];
      }
      return result;
    },
    {} as PartialUnion<T, E>,
  );
};

export { useOnSumbit };
export type { PartialUnion, UnionKeys };
