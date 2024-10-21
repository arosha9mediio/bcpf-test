"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog-document-view";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/components/ui/use-toast";
import useBoolean from "@/hooks/useBoolean";
import { client } from "@/lib/client";
import { cn } from "@/lib/utils";
import { getErrorMessage } from "@/utils/error";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { signOut } from "next-auth/react";

type Props = {
  open: boolean;
  phone: string;
  onOpenChange?: (open: boolean) => void;
};

const formSchema = z.object({
  pin: z.string().min(6, {
    message: "여섯자리의 인증번호를 정확하게 입력해주세요.",
  }),
});

const PhoneVerificationDialog = ({ open, phone, onOpenChange }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const { value: formState, setValue: setFormState } = useBoolean();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pin: "",
    },
    mode: "onSubmit",
  });

  const { isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setFormState(true);
      await client.updateUserPhone({
        updateUserPhoneDto: { encKey: values.pin!, phone },
      });
      toast({
        variant: "default",
        description: "전화번호가 업데이트 되었습니다. 다시 로그인해 주세요.",
      });
      onOpenChange(false);
      signOut();
      router.push("/");
    } catch (e) {
      toast({
        variant: "destructive",
        description: getErrorMessage(e),
      });
    } finally {
      setFormState(false);
    }
  }

  const t = useTranslations();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t("account_verify_code")}</DialogTitle>
              <DialogDescription>
                입력하신 {phone} {t("account_verify_code_description2")}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-600 dark:text-white">
                      {t("account_verify_label")}
                    </FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      {t("account_verify_code_helper")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                onClick={form.handleSubmit(onSubmit)}
                type="submit"
                className={cn("bg-black hover:bg-black/95")}
                disabled={!isValid || formState}>
                {t("account_verify_button")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
};

export default PhoneVerificationDialog;
