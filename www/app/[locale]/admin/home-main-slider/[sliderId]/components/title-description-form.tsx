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
import { useToast } from "@/components/ui/use-toast";
import { RoutePaths } from "@/constants/route";
import useBoolean from "@/hooks/useBoolean";
import { FileType, PostCommonPartsFragment } from "@/lib/__generated/sdk";
import { client } from "@/lib/client";
import { getErrorMessage } from "@/utils/error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { uploadImages } from "@/components/upload-images";
import UploadFiles from "@/app/[locale]/(routes)/components/upload/uploadFiles";
import { getImagePath } from "@/utils/aws";

type Props = {
  slider: PostCommonPartsFragment;
};

const TitleDescriptionForm: React.FC<Props> = ({ slider }) => {
  const { toast } = useToast();
  const router = useRouter();
  const t = useTranslations();
  const createState = useBoolean();
  const [files, setFiles] = useState([]);

  const formSchema = z.object({
    title: z.string().min(1, {
      message: t("admin_slider_title_error"),
    }),
    description: z.string().min(1, {
      message: t("admin_slider_description_error"),
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      title: slider?.title || "",
      description: slider?.description || "",
    },
  });

  const {
    formState: { isValid },
  } = form;

  useEffect(() => {
    if (slider?.file) {
      const fileObjects = slider.file
        .filter(file => file.type === FileType.Video)
        .map(file => ({
          name: file.filename,
          url: getImagePath(file.url),
          base:file.url
        }));
      setFiles(fileObjects);
    }
  }, [slider?.file?.[0]]);  

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      createState.setValue(true);
      let imageUrl = files[0];
      let originalName;
      let imageEntry = null;

      if (files[0]?.type && typeof imageUrl !== "string") {
        const isVideo = files[0]?.type?.startsWith("video");
        const imageUploads = await uploadImages(
          files,
          !isVideo ? "images" : "videos",
          !isVideo ? "images" : "videos",
        );
        imageUrl = imageUploads?.[0]?.path?.fields?.Key;
        originalName = imageUploads?.[0]?.originalName;
        imageEntry = {
          url: imageUrl,
          filename: originalName,
          type: !isVideo ? FileType.Image : FileType.Video,
        };
        console.log(imageEntry);
        
      } else {
        imageUrl = slider?.file?.[0].url;
        originalName = slider?.file?.[0].filename;
        imageEntry = {
          url: imageUrl,
          filename: originalName,
          type: slider?.file?.[0].type,
        };        
      }

      const data = {
        title: values.title,
        description: values.description,
        type: 1,
        file: [imageEntry],
        categoryId: "14",
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
      router.push(RoutePaths.adminHomeMainSlider.value);
      router.refresh();
    } catch (e) {
      console.error({ ...e });
      toast({
        variant: "destructive",
        description: getErrorMessage(e),
      });
    } finally {
      createState.setValue(false);
    }
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="flex flex-col gap-3 flex-wrap divide-y divide-dashed mt-4">
            <div className="flex w-full pb-8">
              <p className="w-2/3">
                <strong>{t("admin_home_main_slider_sec_title")}</strong> <br />{" "}
                {t("admin_home_main_slider_sec_description")}
              </p>
              <div className="flex flex-col gap-3 flex-wrap w-[800px] space-y-3">
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
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{t("admin_slider_description")}</FormLabel>
                      <FormControl>
                        <Input
                          variant="outline"
                          placeholder={t(
                            "admin_slider_description_placeholder",
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <UploadFiles
                  value={files}
                  onChange={setFiles}
                  sx={{ mb: 0 }}
                  // style={{ width: "100%" }}
                  maxFiles={1}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-x-4 fixed bottom-0 py-4 px-[20px] w-full right-0 border-t-2 border-dotted bg-background">
            <Button
              variant="outline"
              onClick={() => router.back()}
              type="button">
              {t("admin_button_cancel")}
            </Button>
            <Button disabled={!(isValid && files.length) || createState.value} type="submit">
              {slider ? t("admin_button_edit") : t("admin_button_save")}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default TitleDescriptionForm;
