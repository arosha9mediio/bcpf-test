"use client";
import UploadFiles from "@/app/[locale]/(routes)/components/upload/uploadFiles";
import UploadImage from "@/app/[locale]/(routes)/components/upload/uploadImage";
import useUploadFiles from "@/app/[locale]/(routes)/components/upload/useUpdateFiles";
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
import { RadioButton } from "@/components/ui/radiobuttongroup";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { uploadImages } from "@/components/upload-images";
import { RoutePaths } from "@/constants/route";
import useBoolean from "@/hooks/useBoolean";
import {
  ContestCommonPartsFragment,
  FileType,
  PostCommonPartsFragment,
} from "@/lib/__generated/sdk";
import { client } from "@/lib/client";
import { getImagePath } from "@/utils/aws";
import { getErrorMessage } from "@/utils/error";
import { getFinalCallbackUrl } from "@/utils/url";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import * as z from "zod";

type Props = {
  post: PostCommonPartsFragment;
  contests?: ContestCommonPartsFragment[];
};

const PressForm: React.FC<Props> = ({ post, contests }) => {
  const { uploadFiles } = useUploadFiles();
  const { toast } = useToast();
  const router = useRouter();
  const t = useTranslations();
  const createState = useBoolean();
  const [viewId, setViewId] = useState("");

  const formSchema = z.object({
    title: z.string().min(1, { message: t("admin_slider_title_error") }),
    description: z.string().min(1, { message: t("admin_description_error") }),
    body: z.string().min(1, { message: "Body must be provided." }),
    publishStatus: z.boolean(),
    language: z.string({ message: t("admin_language_error") }),
    slug: z.string().min(1, { message: t("admin_slug_error") }),
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
      language: post?.language || "",
      slug: post?.slug || "",
      keywords: post?.keywords ? post.keywords.split(",") : [],
      metaDescription: post?.metaDescription || "",
    },
  });

  const {
    formState: { isValid },
    setValue,
    watch,
    setError,
    clearErrors,
  } = form;

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [files, setFiles] = useState([]);

  const generateRandomId = () => {
    return Math.floor(Math.random() * 100000000).toString();
  };

  const language = watch("language");
  const title = watch("title");

  const debouncedSlug = useDebouncedCallback(async (newSlug: string) => {
    const isAvailable = await client.isSlugExist({ slug: newSlug });

    if (isAvailable.isSlugExist) {
      setError("slug", {
        type: "manual",
        message: t("admin_slug_exist"),
      });
      setValue("slug", newSlug, { shouldValidate: false });
    } else {
      clearErrors("slug");
      setValue("slug", newSlug, { shouldValidate: true });
    }
  }, 1000);

  useEffect(() => {
    if (!post?.id) {
      if (title) {
        const newSlug = `${title.toLowerCase().replace(/\s+/g, "-")}-${generateRandomId()}`;
        debouncedSlug(newSlug);
      } else {
        setValue("slug", "");
      }
    }
  }, [title, setValue, debouncedSlug]);

  useEffect(() => {
    if (post?.file?.[0]?.url) {
      setFiles([getImagePath(post.file[0].url)]);
    }

    if (post?.file) {
      const fileObjects = post.file
        .filter(file => file.type === FileType.Doc)
        .map(file => ({
          name: file.filename,
          url: getImagePath(file.url),
          base: file.url,
        }));
      setSelectedFiles(fileObjects);
    }
  }, [post?.file]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      let attachedImages, attachedFiles;

      createState.setValue(true);

      let imageUrl = files[0];
      let fileUrl = selectedFiles;
      let originalName, fileName;
      let imageEntry = null;
      let fileEntries = [];

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
        imageUrl = post?.file?.[0].url;
        originalName = post?.file?.[0].filename;
        imageEntry = {
          url: imageUrl,
          filename: originalName,
          type: FileType.Image,
        };
      }

      if (selectedFiles[0]?.type && typeof fileUrl !== "string") {
        const fileUploads = await uploadFiles(selectedFiles, "files", "files");
        fileEntries = fileUploads.map((file, index) => ({
          url: file?.path?.fields?.Key,
          filename: file?.originalName,
          type: FileType.Doc,
        }));
      } else {
        fileEntries = selectedFiles.map(file => ({
          filename: file.name,
          url: file.base,
          type: FileType.Doc,
        }));
      }

      const data = {
        title: values.title,
        description: values.description,
        body: values.body,
        publishStatus: values.publishStatus,
        language: values.language,
        slug: values.slug,
        categoryId: "2",
        file: [imageEntry, ...fileEntries],
        keywords: values.keywords.join(","),
        metaDescription: values.metaDescription,
      };

      if (post?.id) {
        await client.updatePost({
          input: {
            id: post.id,
            ...data,
          },
        });
      } else {
        await client.createPost({
          input: {
            ...data,
          },
        });
      }

      router.push(getFinalCallbackUrl(RoutePaths.adminPress.value));
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

  const contestOptions = contests?.map(contest => ({
    value: contest.id,
    label: contest.title,
  }));

  const languageOptions = [
    { id: "ko", value: "ko", label: t("Korean") },
    { id: "en", value: "en", label: t("English") },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="flex gap-x-24 flex-wrap">
          <div className="flex flex-col w-3/5 gap-y-6">
            <div className="flex flex-row gap-x-4 w-full">
              <div className="flex flex-col w-1/4">
                {/* <p className="font-medium mb-2">Select image</p> */}
                <UploadImage
                  value={files}
                  onChange={setFiles}
                  sx={{ width: "100%", height: "100%" }}
                  maxFiles={1}
                />
              </div>
              <div className="flex flex-col w-full gap-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Title</FormLabel> */}
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
                      {/* <FormLabel>Description</FormLabel> */}
                      <FormControl>
                        <Textarea
                          placeholder={t("admin_notice_description")}
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

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
          <div className="flex-1 space-y-8">
            <div className="flex justify-between">
              <div>{t("admin_post")}</div>
              <div>
                <FormField
                  control={form.control}
                  name="publishStatus"
                  render={({ field }) => (
                    <FormItem>
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
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("admin_language")}</FormLabel>
                    <FormControl>
                      <RadioButton
                        fields={languageOptions}
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
                        onChange={e => {
                          const newSlug = e.target.value;
                          field.onChange(e);
                          debouncedSlug(newSlug);
                        }}
                        // disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-4">
              {/* <p className="font-medium mb-2">Select Attachment</p> */}
              <UploadFiles
                value={selectedFiles}
                onChange={setSelectedFiles}
                sx={{ mb: 0 }}
                // maxFiles={1}
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

            <div className="flex justify-end gap-x-4 fixed bottom-0 py-4 px-[20px] w-full right-0 border-t-2 bg-background">
              <Button
                variant="outline"
                onClick={() => router.back()}
                type="button">
                {t("admin_button_cancel")}
              </Button>
              <Button
                disabled={!(isValid && files.length) || createState.value}>
                {post ? t("admin_button_save") : t("admin_button_complete")}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default PressForm;
