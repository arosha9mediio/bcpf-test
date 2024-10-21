"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { RoutePaths } from "@/constants/route";
import useBoolean from "@/hooks/useBoolean";
import {
  CreateDonationDto,
  DonationCommonPartsFragment,
} from "@/lib/__generated/sdk";
import { client } from "@/lib/client";
import { getErrorMessage } from "@/utils/error";
import { getFinalCallbackUrl } from "@/utils/url";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useTranslations } from "next-intl";

type Props = {
  donation: DonationCommonPartsFragment;
};

const DONATION_TYPES = [
  {
    value: 1,
    label: "기부금 내역",
  },
  {
    value: 2,
    label: "기부금 사용 내역",
  },
];

const formSchema = z.object({
  names: z.string().min(1, "Name must be at least 1 letter."),
  price: z.string({ message: "Amount must be at lease more than 10$" }),
  type: z.string({ message: "Donation type need to be selected." }),
  year: z.string({ message: "Year must be selected." }),
  month: z.string().min(1, { message: "Month must be entered" }),
});

const DonationForm: React.FC<Props> = ({ donation }) => {
  const { toast } = useToast();
  const router = useRouter();
  const t = useTranslations();
  const createState = useBoolean();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      names: donation?.names || "",
      price: donation?.price || "0",
      type: donation?.type?.toString?.() || "1",
      year: donation?.year || "2024",
      month: donation?.month || "",
    },
  });

  const {
    formState: { isValid },
  } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      createState.setValue(true);
      const data = {
        ...values,
        type: +values.type,
      } as CreateDonationDto;
      if (donation?.id) {
        const response = await client.updateDonation({
          input: {
            id: donation.id,
            type: +data.type,
            ...data,
          },
        });
      } else {
        const response = await client.createDonation({
          input: {
            ...data,
            type: +data.type,
            statusId: 1,
          },
        });
      }
      router.push(getFinalCallbackUrl(RoutePaths.adminDonation.value));
      router.refresh();
    } catch (e) {
      toast({
        variant: "destructive",
        description: getErrorMessage(e),
      });
    } finally {
      createState.setValue(false);
    }
  };

  function getPastYears(): number[] {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];
    for (let i = 0; i < 20; i++) {
      years.push(currentYear - i);
    }
    return years;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="flex flex-col gap-3 flex-wrap divide-y divide-dashed mt-4">
          <div className="flex w-full pb-8">
            <p className="w-2/3">
              <strong>{t("admin_donation_title")}</strong> <br />{" "}
              {t("admin_donation_description")}
            </p>
            <div className="flex flex-col gap-3 flex-wrap w-[800px]">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="flex-1 max-w-[800px]">
                    <FormControl>
                      <Select
                        value={field.value.toString()}
                        onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Donation type" />
                        </SelectTrigger>
                        <SelectContent>
                          {DONATION_TYPES.map(type => {
                            return (
                              <SelectItem
                                key={type.value}
                                value={type.value.toString()}>
                                {type.label}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex w-full py-8">
            <p className="w-2/3">
              <strong>{t("admin_donation_date")}</strong> <br />{" "}
              {t("admin_donation_date_description")}
            </p>
            <div className="flex flex-col gap-4 flex-wrap w-[800px]">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem className="flex-1 max-w-[800px]">
                    <FormLabel>{t("admin_donation_year")}</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value.toString()}
                        onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                          {getPastYears().map(year => {
                            return (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="month"
                render={({ field }) => (
                  <FormItem className="flex-1 max-w-[800px]">
                    <FormLabel>{t("admin_donation_month")}</FormLabel>
                    <FormControl>
                      <Input
                        variant="outline"
                        placeholder={t("admin_donation_month_placeholder")}
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
              <strong>{t("")}</strong> <br />
              {t("admin_donation_section_description")}
            </p>
            <div className="flex flex-col gap-4 flex-wrap w-[800px]">
              <FormField
                control={form.control}
                name="names"
                render={({ field }) => (
                  <FormItem className="flex-1 max-w-[800px]">
                    <FormLabel>{t("admin_donation_donator")}</FormLabel>
                    <FormControl>
                      <Input
                        variant="outline"
                        placeholder={t("admin_donation_donator_placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="flex-1 max-w-[800px]">
                    <FormLabel>{t("admin_donation_amount")}</FormLabel>
                    <FormControl>
                      <Input
                        variant="outline"
                        placeholder={t("admin_donation_amount_placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-x-4 fixed bottom-0 py-4 px-[20px] w-full right-0 border-t-2 border-dotted">
          <Button variant="outline" onClick={() => router.back()} type="button">
            {t("admin_button_cancel")}
          </Button>
          <Button disabled={!isValid || createState.value} type="submit">
            {donation ? t("admin_button_save") : t("admin_button_complete")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default DonationForm;
