"use client";

import UploadMultiFileMini from "@/app/[locale]/(routes)/components/upload/upload";
import AutoCompleteSelect from "@/components/ui/autocompletedropdown";
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
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { uploadImages } from "@/components/upload-images";
import { RoutePaths } from "@/constants/route";
import useBoolean from "@/hooks/useBoolean";
import { FileType, PostCommonPartsFragment } from "@/lib/__generated/sdk";
import { client } from "@/lib/client";
import { getImagePath } from "@/utils/aws";
import { getErrorMessage } from "@/utils/error";
import { getFinalCallbackUrl } from "@/utils/url";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { RadioButton } from "@/components/ui/radiobuttongroup";

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
    description: z.string().min(1, {
      message: t("admin_slider_description_error"),
    }),
    sliderNumber: z.string().min(1, {
      message: t("admin_slider_type_error"),
    }),
    publishStatus: z.boolean(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      title: slider?.title || "",
      description: slider?.description || "",
      sliderNumber: slider?.tags || "1",
      publishStatus: slider?.publishStatus || false,
    },
  });

  const {
    formState: { isValid },
    watch,
    setValue,
  } = form;

  const sliderOptions = [
    { id: "1",value: "1", label: "Drama" },
    { id: "3",value: "3", label: "Creator" },
    { id: "2",value: "2", label: "Documentary" },
  ];

  const sliderNumber = watch("sliderNumber");

  const selectedSliderOption = sliderOptions?.find(
    option => option.value === sliderNumber,
  );

  useEffect(() => {
    if (slider?.file) {
      setFiles([getImagePath(slider.file?.[0].url)]);
    }
  }, [slider?.file]);

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
        publishStatus: values.publishStatus,
        categoryId: "11",
        file: [imageEntry],
        tags: values.sliderNumber,
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

      router.push(getFinalCallbackUrl(RoutePaths.adminSlider.value));
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
        <div className="flex flex-col gap-3 flex-wrap divide-y divide-dashed mt-4 mb-8">
          <div className="flex w-full pb-8">
            <p className="w-2/3">
              <strong>{t("admin_feature_sec_title")}</strong> <br />{" "}
              {t("admin_feature_sec_subtitle")}
            </p>
            <div className="flex flex-col gap-3 flex-wrap w-[800px] space-y-3">
              <div className="flex gap-x-4 flex-wrap">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full">
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
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t("admin_slider_description")}</FormLabel>
                    <FormControl>
                      <Input
                        variant="outline"
                        placeholder={t("admin_slider_description_placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-12 flex flex-col space-y-5">
              <div>{t("admin_slider_type")}</div>
              <FormField
                control={form.control}
                name="sliderNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioButton
                        fields={sliderOptions}
                        value={field.value}
                        onChange={field.onChange}
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

          <div className="flex w-full py-8">
            <p className="w-2/3">
              <strong>{t("admin_feature_status_title")}</strong> <br />{" "}
              {t("admin_feature_status_subtitle")}
            </p>
            <div className="flex flex-col gap-3 flex-wrap w-[800px]">
              <div className="flex">
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
                {/* <div style={{ marginLeft: 10 }}>Active</div> */}
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
