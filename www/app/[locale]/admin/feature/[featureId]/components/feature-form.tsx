"use client";

import UploadMultiFileMini from "@/app/[locale]/(routes)/components/upload/upload";
import { DateTimeRangePicker } from "@/components/date-time-range-picker/date-time-range--picker";
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
import { useToast } from "@/components/ui/use-toast";
import { uploadImages } from "@/components/upload-images";
import { RoutePaths } from "@/constants/route";
import useBoolean from "@/hooks/useBoolean";
import { FileType, PostCommonPartsFragment } from "@/lib/__generated/sdk";
import { client } from "@/lib/client";
import { getImagePath } from "@/utils/aws";
import { convertToISO } from "@/utils/date";
import { getErrorMessage } from "@/utils/error";
import { getFinalCallbackUrl } from "@/utils/url";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

type Props = {
  slider: PostCommonPartsFragment;
};

const SliderForm: React.FC<Props> = ({ slider }) => {
  const { toast } = useToast();
  const router = useRouter();
  const t = useTranslations();
  const createState = useBoolean();
  const formSchema = z.object({
    title: z.string().min(1, {
      message: t("admin_slider_title_error"),
    }),
    subtitle: z.string().min(1, {
      message: t("admin_slider_subtitle_error"),
    }),
    description: z.string().min(1, {
      message: t("admin_slider_description_error"),
    }),
    slug: z.string().min(1, {
      message: t("admin_slider_url_error"),
    }),
    date: z
      .object({
        from: z.string().optional(),
        to: z.string().optional(),
      })
      .refine(data => (data.from && data.to) || (!data.from && !data.to), {
        message:
          "Please select a complete date range (both 'from' and 'to' dates are required)",
      }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      title: slider?.title || "",
      subtitle: slider?.subTitle || "",
      description: slider?.description || "",
      slug: slider?.slug || "",
      date: {
        from: slider?.publishedAt ? slider?.publishedAt : null,
        to: slider?.unpublishedAt ? slider?.unpublishedAt : null,
      },
    },
  });

  const {
    formState: { isValid },
    watch,
    trigger,
  } = form;

  useEffect(() => {
    if (slider?.file) {
      setFiles([getImagePath(slider?.file?.[0].url)]);
    }
  }, [slider?.file]);

  const watchedDate = watch("date");

  useEffect(() => {
    if (watchedDate?.to) {
      trigger();
    }
  }, [watchedDate.to]);

  const [files, setFiles] = useState([]);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      createState.setValue(true);
      let imageUrl = files[0];
      let originalName;
      let imageEntry = null;

      if (files[0]?.type && typeof imageUrl !== "string") {
        const imageUploads = await uploadImages(files, "images", "images");
        imageUrl = imageUploads?.[0]?.path?.fields?.Key;
        originalName = imageUploads?.[0]?.originalName;
        imageEntry = {
          url: imageUrl,
          filename: originalName,
          type: FileType.Image,
        };
      } else {
        imageUrl = slider?.file?.[0].url;
        originalName = slider?.file?.[0].filename;
        imageEntry = {
          url: imageUrl,
          filename: originalName,
          type: FileType.Image,
        };
      }
      const data = {
        title: values.title,
        description: values.description,
        subTitle: values.subtitle,
        categoryId: "12",
        file: [imageEntry],
        slug: values.slug,
        publishedAt: values.date.from,
        unpublishedAt: values.date.to,
      };

      if (slider?.id) {
        const response = await client.updatePost({
          input: {
            id: slider.id,
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

      router.push(getFinalCallbackUrl(RoutePaths.adminFeature.value));
      router.refresh();
    } catch (e) {
      console.log("EEEEEEEEEEEEEEE", e);
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
        <div className="flex flex-col gap-3 flex-wrap divide-y divide-dashed mt-4 mb-8">
          <div className="flex w-full pb-8">
            <p className="w-2/3">
              <strong>{t("admin_feature_sec_title")}</strong> <br />{" "}
              {t("admin_feature_sec_subtitle")}
            </p>
            <div className="flex flex-col gap-3 flex-wrap w-[800px] space-y-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t("admin_feature_title")}</FormLabel>
                    <FormControl>
                      <Input
                        variant="outline"
                        placeholder={t("admin_feature_title_placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subtitle"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t("admin_feature_subtitle")}</FormLabel>
                    <FormControl>
                      <Input
                        variant="outline"
                        placeholder={t("admin_feature_subtitle_placeholder")}
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
                  <FormItem className="w-full">
                    <FormLabel>{t("admin_feature_description")}</FormLabel>
                    <FormControl>
                      <Input
                        variant="outline"
                        placeholder={t("admin_feature_description_placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t("admin_feature_link")}</FormLabel>
                    <FormControl>
                      <Input
                        variant="outline"
                        placeholder={t("admin_feature_link_placeholder")}
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
              <strong>{t("admin_feature_status_title")}</strong> <br />{" "}
              {t("admin_feature_status_subtitle")}
            </p>
            <div className="flex flex-col gap-3 flex-wrap w-[800px]">
              <div className="flex flex-col w-full">
                <DateTimeRangePicker type={["DATE-TIME-RANGE"]} form={form} />
              </div>
            </div>
          </div>

          <div className="flex w-full py-8">
            <p className="w-2/3">
              <strong>{t("admin_feature_image_title")}</strong> <br />{" "}
              {t("admin_feature_image_subtitle")}
            </p>
            <div className="flex flex-col gap-4 flex-wrap w-[800px]">
              <UploadMultiFileMini
                value={files}
                onChange={setFiles}
                sx={{ mb: 0 }}
                maxFiles={1}
              />
            </div>
          </div>

          <div className="flex justify-end gap-x-4 fixed bottom-0 py-4 px-[20px] w-full right-0 border-t-2 bg-background">
            <Button
              variant="outline"
              onClick={() => router.back()}
              type="button">
              {t("admin_button_cancel")}
            </Button>
            <Button disabled={!(isValid && files.length) || createState.value}>
              {slider ? t("admin_button_edit") : t("admin_button_save")}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SliderForm;
