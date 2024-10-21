"use client";

import UploadMultiFileMini from "@/app/[locale]/(routes)/components/upload/upload";
import { DateTimeRangePicker } from "@/components/date-time-range-picker/date-time-range--picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { uploadImages } from "@/components/upload-images";
import { RoutePaths } from "@/constants/route";
import useBoolean from "@/hooks/useBoolean";
import { FileType, PostCommonPartsFragment } from "@/lib/__generated/sdk";
import { client } from "@/lib/client";
import { cn } from "@/lib/utils";
import { getImagePath } from "@/utils/aws";
import { getErrorMessage } from "@/utils/error";
import { getFinalCallbackUrl } from "@/utils/url";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { convertToISO } from "@/utils/date";

type Props = {
  slider: PostCommonPartsFragment;
};

const SliderForm: React.FC<Props> = ({ slider }) => {
  const { toast } = useToast();
  const router = useRouter();
  const t = useTranslations();
  const createState = useBoolean();
  const formSchema = z.object({
    date: z
      .object({
        from: z.string().optional(),
        to: z.string().optional(),
      })
      .refine(data => (data.from && data.to) || (!data.from && !data.to), {
        message: t("admin_date_picker_error"),
      }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      date: {
        from: slider?.publishedAt ? slider?.publishedAt : null,
        to: slider?.unpublishedAt ? slider?.unpublishedAt : null,
      },
    },
  });

  const {
    formState: { isValid },
    trigger,
    watch,
  } = form;

  useEffect(() => {
    if (slider?.file) {
      setFiles([slider?.file?.[0]?.url]);
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
        title: "Main slider",
        type: 1,
        categoryId: "13",
        file: [imageEntry],
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

      router.push(getFinalCallbackUrl(RoutePaths.adminHomeMainSlider.value));
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
              <strong>{t("admin_home_main_slider_datesec_title")}</strong>{" "}
              <br /> {t("admin_home_main_slider_datesec_subtitle")}
            </p>
            <div className="flex flex-col w-full">
              <DateTimeRangePicker
                type={["DATE-TIME-RANGE"]}
                form={form}
                label="공모전 기간"
              />
            </div>
          </div>

          <div className="flex w-full pt-8">
            <p className="w-2/3">
              <strong>{t("admin_feature_image_title")}</strong> <br />{" "}
              {t("admin_feature_image_subtitle")}
            </p>
            <UploadMultiFileMini
              value={files}
              onChange={setFiles}
              sx={{ mb: 0 }}
              maxFiles={1}
              style={{ width: "100%" }}
            />
          </div>
          <div className="flex justify-end gap-x-4 fixed bottom-0 py-4 px-[20px] w-full right-0 border-t-2 bg-background">
            <Button
              variant="outline"
              onClick={() => router.back()}
              type="button">
              {t("admin_button_cancel")}
            </Button>
            <Button
              disabled={!(isValid && files.length) || createState.value}
              type="submit">
              {slider ? t("admin_button_edit") : t("admin_button_save")}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SliderForm;
