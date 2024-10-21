"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
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
import { Input } from "../ui/input";
import PhoneVerificationDialog from "@/app/[locale]/(routes)/components/my-page/phone-verification-dialog";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

type Props = {
  open: boolean;
};

const formSchema = z.object({
  phone: z.string().min(9, { message: "올바른 전화 번호를 입력해 주세요" }),
});

const RequestPhoneNumberDialog = ({ open }: Props) => {
  const { refresh } = useRouter();
  const { value: otpOpen, setValue: setOtpOpen } = useBoolean(false);
  const { toast } = useToast();
  const { value: formState, setValue: setFormState } = useBoolean();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
    },
    mode: "all",
  });

  const { isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setFormState(true);
      await client.sendPhoneVerifyToken({
        sendPhoneVerifyTokenDto: { phone: values.phone },
      });
      setOtpOpen(true);
    } catch (e) {
      toast({
        variant: "destructive",
        description: getErrorMessage(e),
      });
      // Show loading button if success only refresh will remove the loading
      setFormState(false);
    }
  }
  const phone = form.watch("phone");

  const t = useTranslations();

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6">
          <Dialog open={open}>
            <DialogContent className="sm:max-w-[425px]" hideClose={true}>
              <DialogHeader>
                <DialogTitle>{t("account_phone_header")}</DialogTitle>
                <DialogDescription>
                  {t("account_phone_description")}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="flex-1 max-w-[800px]">
                      <FormLabel>{t("account_phone")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("account_phone_placeholder")}
                          {...field}
                        />
                      </FormControl>
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
                  {t("account_phone_action_button")}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </form>
      </Form>
      <PhoneVerificationDialog
        open={otpOpen}
        onOpenChange={value => {
          setOtpOpen(value);
          refresh();
        }}
        phone={phone}
      />
    </>
  );
};

export default RequestPhoneNumberDialog;
