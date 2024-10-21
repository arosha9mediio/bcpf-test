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
import { UserRoles } from "@/constants/enums";
import { RoutePaths } from "@/constants/route";
import useBoolean from "@/hooks/useBoolean";
import { CreateUserDto, FindUserQuery, User } from "@/lib/__generated/sdk";
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
  user: FindUserQuery["findUser"];
};

const USER_TYPES = [
  {
    value: "ADMIN",
    label: "Admin",
  },
  {
    value: "USER",
    label: "User",
  },
  {
    value: "TEACHER",
    label: "Teacher",
  },
  {
    value: "GUEST",
    label: "Guest",
  },
];

const USER_STATUS = [
  {
    value: "1",
    label: "Active",
  },
  {
    value: "2",
    label: "Inactive",
  },
  {
    value: "3",
    label: "Banned",
  },
  {
    value: "4",
    label: "Deleted",
  },
];

const UserForm: React.FC<Props> = ({ user }) => {
  const { toast } = useToast();
  const router = useRouter();
  const t = useTranslations();
  const createState = useBoolean();

  const formSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    // password: z.string().min(8),
    // confirmPassword: z.string().min(8),
    phone: z.string().min(9, { message: t("admin_user_phone_error") }),
    status: z.number({ message: t("admin_user_status_error") }),
    role: z.string({ message: t("admin_user_role_error") }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      name: user?.UserProfile?.name || "",
      email: user?.email || "",
      phone: user?.UserProfile?.phone || "",
      role: user?.role || "USER",
      status: user?.status || 1,
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
      };
      if (!user?.id) {
        const response = await client.createUser({
          // @ts-ignore
          input: {
            ...data,
          },
        });
      } else {
        delete data.email;
        const response = await client.updateUserProfile({
          updateUserProfileDto: {
            userId: user.id,
            ...data,
          },
        });
      }
      router.push(getFinalCallbackUrl(RoutePaths.adminUsers.value));
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="flex flex-col gap-3 flex-wrap divide-y divide-dashed mt-4">
          <div className="flex w-full pb-8">
            <p className="w-2/3">
              <strong>{t("admin_user_section_title")}</strong> <br />{" "}
              {t("admin_user_section_subtitle")}
            </p>
            <div className="flex flex-col gap-3 flex-wrap w-[800px] space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t("column_email")}</FormLabel>
                    <FormControl>
                      <Input
                        variant="outline"
                        placeholder={t("admin_user_email_placeholder")}
                        {...field}
                        disabled={!!user}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="********" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input placeholder="********" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t("column_name")}</FormLabel>
                    <FormControl>
                      <Input
                        variant="outline"
                        placeholder={t("admin_user_name_placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t("admin_user_phone")}</FormLabel>
                    <FormControl>
                      <Input
                        variant="outline"
                        placeholder={t("admin_user_phone_placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t("admin_user_role")}</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value.toString()}
                        onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("admin_user_role_placeholder")}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {USER_TYPES.map(type => {
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

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t("admin_user_status")}</FormLabel>

                    <FormControl>
                      <Select
                        value={field.value.toString()}
                        onValueChange={value => field.onChange(+value)}>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("admin_user_status_placeholder")}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {USER_STATUS.map(type => {
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

          <div className="flex justify-end gap-x-4 fixed bottom-0 py-4 px-[20px] w-full right-0 border-t-2">
            <Button
              variant="outline"
              onClick={() => router.back()}
              type="button">
              {t("admin_button_cancel")}
            </Button>
            <Button disabled={!isValid || createState.value} type="submit">
              {user ? t("admin_button_save") : t("admin_button_complete")}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default UserForm;
