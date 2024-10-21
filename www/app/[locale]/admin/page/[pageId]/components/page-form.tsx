"use client";

import Editor2 from "@/components/editor/editor2";
import { Button } from "@/components/ui/button";
import { ChipsInput } from "@/components/ui/chipsinput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { RoutePaths } from "@/constants/route";
import useBoolean from "@/hooks/useBoolean";
import { PostCommonPartsFragment } from "@/lib/__generated/sdk";
import { client } from "@/lib/client";
import { getErrorMessage } from "@/utils/error";
import { getFinalCallbackUrl } from "@/utils/url";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

type Props = {
  post: PostCommonPartsFragment;
};

const PageForm: React.FC<Props> = ({ post }) => {
  const { toast } = useToast();
  const router = useRouter();
  const t = useTranslations();
  const createState = useBoolean();
  const formSchema = z.object({
    title: z.string().min(1, {
      message: t("admin_slider_title_error"),
    }),
    description: z.string().min(1, {
      message: t("admin_slider_title_error"),
    }),
    body: z.string().min(1, {
      message: t("admin_description_error"),
    }),
    publishStatus: z.boolean(),
    slug: z.string().min(1, {
      message: t("admin_slug_error"),
    }),
    tags: z.string().array(),
    keywords: z.string().array(),
    metaDescription: z.string().min(1, {
      message: t("admin_meta_error"),
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      title: post?.title || "",
      description: post?.description || "",
      body: post?.body || "",
      publishStatus: post?.publishStatus || false,
      slug: post?.slug,
      tags: post?.tags ? post.tags.split(",") : [],
      keywords: post?.keywords ? post.tags.split(",") : [],
      metaDescription: post?.metaDescription || "",
    },
  });

  const {
    formState: { isValid },
    watch,
  } = form;

  const title = watch("title");

  useEffect(() => {}, [title]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      createState.setValue(true);
      const data = {
        title: values.title,
        description: values.description,
        body: values.body,
        publishStatus: values.publishStatus,
        slug: values.slug,
        tags: values.tags.join(","),
        keywords: values.keywords.join(","),
        categoryId: "15",
        metaDescription: values.metaDescription,
        publishedAt: new Date(),
      };

      if (post?.id) {
        const response = await client.updatePost({
          input: {
            id: post.id,
            ...data,
          },
        });
      } else {
        const response = await client.createPost({
          input: {
            ...data,
          },
        });
      }

      router.push(getFinalCallbackUrl(RoutePaths.adminPage.value));
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
        <div className="flex gap-x-24 flex-wrap">
          <div className="w-2/3 space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("admin_slider_title")}</FormLabel>
                  <FormControl>
                    <Input
                      variant="outline"
                      placeholder={t("admin_slider_title_placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-white">
                    {t("admin_slider_description")}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("admin_notice_description")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem className="h-full">
                  <FormLabel>{t("admin_notice_content")}</FormLabel>
                  <FormControl>
                    <Editor2
                      {...field}
                      placeholder="Start typing..."
                      onBlur={newContent => field.onChange(newContent)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1 mt-9 space-y-8">
            <div className="flex justify-between">
              <div>{t("admin_post")}</div>
              <div>
                <FormField
                  control={form.control}
                  name="publishStatus"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Description</FormLabel> */}
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="mt-4">
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        variant="outline"
                        placeholder={t("column_slug")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-4">
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ChipsInput placeholder={t("admin_tag")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-4">
              <FormField
                control={form.control}
                name="keywords"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ChipsInput
                        placeholder={t("admin_keywords")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-4">
              <FormField
                control={form.control}
                name="metaDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder={t("admin_meta_description")}
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

        <div className="flex justify-end gap-x-4 fixed bottom-0 py-4 px-[20px] w-full right-0 border-t-2 bg-background border-dotted">
          <Button variant="outline" onClick={() => router.back()} type="button">
            {t("admin_button_cancel")}
          </Button>
          <Button disabled={!isValid || createState.value}>
            {post ? t("admin_button_save") : t("admin_button_complete")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PageForm;
