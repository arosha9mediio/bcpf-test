"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { TickerDatePickerWithRange } from "./ticker-date-range";
import { client } from "@/lib/client";
import { useToast } from "@/components/ui/use-toast";
import { getErrorMessage } from "@/utils/error";
import { ToastAction } from "@/components/ui/toast";
import { Post, PostCommonPartsFragment } from "@/lib/__generated/sdk";
import { useTranslations } from "next-intl";
import { RoutePaths } from "@/constants/route";
import { LoadingSpinner } from "@/components/table/components/TableActionLoader";
import Link from "next/link";
import { DateTimeRangePicker } from "@/components/date-time-range-picker/date-time-range--picker";
import { convertToISO } from "@/utils/date";

type Props = {
  ticker: PostCommonPartsFragment;
};

const TickerForm: React.FC<Props> = ({ ticker }) => {
  const router = useRouter();
  const t = useTranslations();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const isMutation = useMemo(() => Boolean(ticker), [ticker]);

  const formSchema = z.object({
    title: z
      .string({
        message: t("admin_date_picker_error"),
      })
      .min(1, t("admin_date_picker_error")),

    body: z
      .string({ message: t("admin_date_picker_error") })
      .min(1, t("admin_date_picker_error")), // link
    date: z
      .object({
        from: z.string().optional(),
        to: z.string().optional(),
      })
      .refine(data => (data.from && data.to) || (!data.from && !data.to), {
        message: t("admin_date_picker_error"),
      }),
  });

  const lang = useMemo(() => {
    return {
      button: isMutation
        ? t("admin_ticker_mutation_btn")
        : t("admin_ticker_creation_btn"),
    } as const;
  }, [isMutation]);

  // const formSchema = TICKER_FORM_SCHEMA(t);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ticker?.title || null,
      body: ticker?.body || null,
      date: {
        from: ticker?.publishedAt ? ticker?.publishedAt : null,
        to: ticker?.unpublishedAt ? ticker?.unpublishedAt : null,
      },
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    formState: { isValid },
    trigger,
    watch,
  } = form;

  const watchedDate = watch("date");

  useEffect(() => {
    if (watchedDate?.to) {
      trigger();
    }
  }, [watchedDate.to]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    try {
      if (isMutation) {
        await handleMutation(ticker?.id, values);
        handleMutationSuccessToast(ticker?.id);
        router.push(RoutePaths.adminTicker.value);
        router.refresh();
        return;
      }

      await handleCreation(values);
      handleSuccessToast(ticker?.id);
      router.push(RoutePaths.adminTicker.value);
      router.refresh();
      //
    } catch (error) {
      handleFailureToast(error, values);
    } finally {
      setLoading(false);
    }
  };

  const handleMutation = async (id: string, payload) => {
    await client.updatePost({
      input: {
        id: id,
        categoryId: "30",
        title: payload.title,
        body: payload.body,
        publishedAt: payload.date.from,
        unpublishedAt: payload.date.to,
      },
    });
  };

  const handleCreation = async payload => {
    await client.createPost({
      input: {
        categoryId: "30",
        title: payload.title,
        body: payload.body,
        publishedAt: payload.date.from,
        unpublishedAt: payload.date.to,
      },
    });
  };

  const handleFailureToast = (e: unknown, payload) =>
    toast({
      variant: "destructive",
      title: t("admin_ticker_failed"),
      description: getErrorMessage(e),
      action: (
        <ToastAction
          onClick={async () => await onSubmit(payload)}
          altText={t("admin_ticker_try_again")}>
          {t("admin_ticker_try_again")}
        </ToastAction>
      ),
    });

  const handleSuccessToast = (e: unknown) =>
    toast({
      title: `${t("admin_ticker_creation_success")}`,
    });

  const handleMutationSuccessToast = (e: unknown) =>
    toast({
      title: `${t("admin_ticker_mutation_success")}`,
    });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="flex flex-col gap-3 flex-wrap divide-y divide-dashed mt-4">
          <div className="flex w-full pb-8">
            <p className="w-2/3">
              <strong>{t("admin_ticker_form_title")}</strong> <br />
              {t("admin_ticker_form_title_label")}
            </p>
            <div className="flex flex-col gap-3 flex-wrap w-full">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className=" ">
                    <FormControl>
                      <Input
                        variant={"outline"}
                        borderBottom
                        placeholder={t("admin_ticker_title_placeholder")}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex w-full py-8">
            <p className="w-2/3">
              <strong>{t("admin_ticker_form_link")}</strong> <br />
              {t("admin_ticker_form_link_label")}
            </p>
            <div className="flex flex-col gap-4 flex-wrap w-full ">
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem className="w-full ">
                    <FormControl>
                      <Input
                        variant={"outline"}
                        placeholder={t("admin_ticker_link_placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex w-full pt-8">
            <p className="w-2/3">
              <strong>{t("admin_ticker_form_range")}</strong> <br />
              {t("admin_ticker_form_range_label")}
            </p>
            <div className="flex flex-col gap-4 flex-wrap w-full ">
              <DateTimeRangePicker type={["DATE-TIME-RANGE"]} form={form} />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-x-4 fixed bottom-0 py-4 px-[20px] w-full right-0 border-t-2 border-dotted bg-background">
          <Link
            prefetch={false}
            href={{ pathname: RoutePaths.adminTicker.value }}>
            <Button variant="outline" type="button">
              {t("admin_ticker_cancel_btn")}
            </Button>
          </Link>
          <Button disabled={!form.formState.isValid || loading} type="submit">
            {loading && <LoadingSpinner className={null} />}
            {!loading && lang.button}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export { TickerForm };
