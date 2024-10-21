import AlertModal from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { RoutePaths } from "@/constants/route";
import useBoolean from "@/hooks/useBoolean";
import { client } from "@/lib/client";
import { getErrorMessage } from "@/utils/error";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const DeleteAccount = ({}: Props) => {
  const t = useTranslations();
  const confirmState = useBoolean();
  const loadingState = useBoolean();
  const { push, refresh } = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();

  const onDelete = async () => {
    try {
      loadingState.setValue(true);
      await client.deleteUser({ id: session?.user?.id });
      await signOut({ callbackUrl: RoutePaths.home.value });
    } catch (e) {
      toast({
        variant: "destructive",
        description: getErrorMessage(e),
      });
    } finally {
      loadingState.setValue(false);
      confirmState.setValue(false);
    }
  };

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-xl">{t("Delete account")}</h2>
        <p className="mt-4 text-lg">{t("delete_account_description_1")}</p>
        <p className="mt-4 text-lg">{t("delete_account_description_2")}</p>
        <p className="mt-4 text-lg">{t("delete_account_description_3")}</p>
        <p className="mt-4 text-lg">{t("delete_account_description_4")}</p>
      </div>
      <Button variant="destructive" onClick={() => confirmState.setValue(true)}>
        {t("Delete")}
      </Button>
      <AlertModal
        isOpen={confirmState.value}
        onClose={() => confirmState.setValue(false)}
        onConfirm={onDelete}
        loading={loadingState.value}
      />
    </section>
  );
};

export default DeleteAccount;
