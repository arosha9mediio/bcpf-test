"use client";
import UploadFiles from "@/app/[locale]/(routes)/components/upload/uploadFiles";
import useUploadFiles from "@/app/[locale]/(routes)/components/upload/useUpdateFiles";
import { DateTimeRangePicker } from "@/components/date-time-range-picker/date-time-range--picker";
import Editor2 from "@/components/editor/editor2";
import AutoCompleteSelect from "@/components/ui/autocompletedropdown";
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
import { RoutePaths } from "@/constants/route";
import useBoolean from "@/hooks/useBoolean";
import {
  ContestCommonPartsFragment,
  FileType,
  PostCommonPartsFragment,
} from "@/lib/__generated/sdk";
import { client } from "@/lib/client";
import { getImagePath } from "@/utils/aws";
import { convertToISO } from "@/utils/date";
import { getErrorMessage } from "@/utils/error";
import { getFinalCallbackUrl } from "@/utils/url";
import { zodResolver } from "@hookform/resolvers/zod";
import { Copy } from "lucide-react";
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

const NoticeForm: React.FC<Props> = ({ post, contests }) => {
  const { uploadFiles } = useUploadFiles();
  const { toast } = useToast();
  const router = useRouter();
  const t = useTranslations();
  const createState = useBoolean();
  const [viewId, setViewId] = useState("");
  const [viewUrl, setViewUrl] = useState("");

  console.log({ ...post });

  const formSchema = z.object({
    title: z.string().min(1, { message: t("admin_slider_title_error") }),
    description: z
      .string()
      // .min(1, { message: "설명을 입력해 주세요." })
      .optional(),
    body: z.string().min(1, { message: t("admin_description_error") }),
    publishStatus: z.boolean(),
    pin: z.boolean(),
    language: z.string({
      message: t("admin_language_error"),
    }),
    slug: z.string().min(1, { message: t("admin_slug_error") }),
    tags: z.string().optional(),
    date: z.string().optional().or(z.literal(null)),
    keywords: z.string().array(),
    metaDescription: z.string().min(1, {
      message: t("admin_meta_error"),
    }),
    contestId: z
      .string()
      .min(1, { message: t("admin_contest_error") })
      .optional(),
    viewUrl: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      title: post?.title || "",
      description: post?.description || "",
      body: post?.body || "",
      publishStatus: post?.publishStatus || false,
      pin: Boolean(post?.pin) || false,
      language: post?.language || "ko",
      slug: post?.slug || "",
      tags: post?.tags || "공지",
      date: post?.createdAt ? post?.createdAt : null,

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

  const generateRandomId = () => {
    return Math.floor(Math.random() * 100000000).toString();
  };

  const contestId = watch("contestId");
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

  useEffect(() => {
    setViewId(contestId);
    setViewUrl(
      `<p style="text-align: center;"><a href="/contest/${contestId}" rel="noopener noreferrer" target="_blank"><button style="background-color: #000000; font-family: 'Georgia', 'Palatino', serif; color: white; border: none; border-radius: 8px; padding: 10px 20px; font-size: 16px; cursor: pointer; transition: background-color 0.3s ease, transform 0.3s ease;">참가신청하기</button></a></p>`,
    );
  }, [contestId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles([...e.target.files]);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      let attachedImages, attachedFiles;

      createState.setValue(true);

      // let imageUrl = files[0];
      let fileUrl = selectedFiles;
      let originalName, fileName;
      let fileEntries = [];

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
        tags: values.tags,
        createdAt: values.date,
        pin: Number(values.pin),
        categoryId: "1",
        file: [...fileEntries],
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

      router.push(getFinalCallbackUrl(RoutePaths.adminNotice.value));
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

  const tagOptions = [
    { id: "공지", value: "공지", label: "공지" },
    { id: "공고", value: "공고", label: "공고" },
    { id: "결과", value: "결과", label: "결과" },
  ];

  const selectedContestOption = contestOptions?.find(
    option => option.value === contestId,
  );

  const handleCopy = () => {
    navigator.clipboard
      .writeText(viewUrl)
      .then(() => {
        toast({
          description: t("admin_url_copied"),
        });
      })
      .catch(() => {
        toast({
          variant: "destructive",
          description: t("admin_url_copy_failed"),
        });
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="flex gap-x-24 flex-wrap mb-20">
          <div className="flex flex-col w-3/5 gap-y-6">
            <div className="flex flex-row gap-x-4 w-full">
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
            {/* ToDo: Add or remove previous editor after testing of new editor */}
            {/* <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem className="h-full">
                  <FormLabel>{t("admin_notice_content")}</FormLabel>
                  <FormControl>
                    <Editor {...field} id="toolbarId" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem className="h-full">
                  <FormLabel>Content</FormLabel>
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
          <div className="flex-1">
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
            <div className="flex justify-between mt-4">
              <div>{t("admin_notice_pin")}</div>
              <div>
                <FormField
                  control={form.control}
                  name="pin"
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
            <div className="mt-6 flex flex-col space-y-3">
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
            <div className="mt-6">
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
            <div className="mt-6  flex flex-col space-y-3">
              <div>{t("admin_tag")}</div>
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioButton
                        fields={tagOptions}
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
            <div className="flex flex-col w-full mt-8">
              <p className="font-medium">{t("column_createdAt")}</p>
              <DateTimeRangePicker type={["DATE-TIME"]} form={form} />
            </div>
            <div className="mt-1">
              <p className="font-medium mb-2">{t("column_files")}</p>
              <UploadFiles
                value={selectedFiles}
                onChange={setSelectedFiles}
                sx={{ mb: 0 }}
                // maxFiles={1}
              />
            </div>
            <div className="mt-4">
              <p className="font-medium mb-2">{t("admin_meta")}</p>
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
              <div className="text-sm mt-2 text-slate-400">
                ❈ {t("admin_keywords_hint")}
              </div>
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
            <div className="mt-4">
              <FormField
                control={form.control}
                name="contestId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("admin_contest")}</FormLabel>
                    <FormControl>
                      <AutoCompleteSelect
                        {...field}
                        options={contestOptions}
                        isClearable
                        isSearchable
                        placeholder={t("admin_contest_select")}
                        value={selectedContestOption}
                        onChange={option =>
                          //@ts-ignore
                          setValue("contestId", option ? option.value : "")
                        }
                        components={{ ClearIndicator: null }}
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
                name="viewUrl"
                render={() => (
                  <FormItem>
                    <FormLabel>{t("admin_notice_button_code")}</FormLabel>
                    <div className="flex items-center gap-x-2">
                      <FormControl>
                        <Input variant="outline" value={viewUrl} readOnly />
                      </FormControl>
                      <Button
                        variant="outline"
                        type="button"
                        onClick={handleCopy}>
                        <Copy className="h-[1.2rem] w-[1.2rem]" />
                      </Button>
                    </div>
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
              <Button disabled={!isValid || createState.value}>
                {post ? t("admin_button_save") : t("admin_button_complete")}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default NoticeForm;
