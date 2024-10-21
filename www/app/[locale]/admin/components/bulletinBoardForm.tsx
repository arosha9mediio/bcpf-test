"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ChipsInput } from "@/components/ui/chipsinput";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import UploadMultiFileMini from "@/app/[locale]/(routes)/components/upload/upload";
import useUploadFiles from "@/app/[locale]/(routes)/components/upload/useUpdateFiles";
import Editor from "@/components/editor/editor";
import { getFinalCallbackUrl } from "@/utils/url";
import AutoCompleteSelect from "@/components/ui/autocompletedropdown";
import {
  ContestCommonPartsFragment,
  FileType,
  PostCommonPartsFragment,
} from "@/lib/__generated/sdk";
import { client } from "@/lib/client";
import { cn } from "@/lib/utils";
import { getImagePath } from "@/utils/aws";
import { getErrorMessage } from "@/utils/error";
import { uploadImages } from "@/components/upload-images";
import { RoutePaths } from "@/constants/route";
import useBoolean from "@/hooks/useBoolean";
import UploadImage from "../../(routes)/components/upload/uploadImage";
import UploadFiles from "../../(routes)/components/upload/uploadFiles";

type Props = {
  post: PostCommonPartsFragment;
  formType: "notice" | "press";
  contests?: ContestCommonPartsFragment[];
};

const BulletinBoardForm: React.FC<Props> = ({ post, formType, contests }) => {
  const { uploadFiles } = useUploadFiles();
  const { toast } = useToast();
  const router = useRouter();
  const createState = useBoolean();
  const [viewId, setViewId] = useState("");
  const [viewUrl, setViewUrl] = useState("");

  const formSchema = z.object({
    title: z.string().min(1, { message: "Title must be provided." }),
    description: z
      .string()
      .min(1, { message: "Description must be provided." }),
    body: z.string().min(1, { message: "Body must be provided." }),
    publishStatus: z.boolean(),
    pin: z.boolean(),
    language: z.string({ message: "Language must be selected." }),
    slug: z.string().min(1, { message: "Slug must be provided." }),
    tags: z.string().array(),
    publishedAt: z.date({ message: "Date must be selected." }),
    contestId: z
      .string()
      .min(1, { message: "Contest must be selected." })
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
      language: post?.language || "",
      slug: post?.slug || "",
      tags: post?.tags ? post.tags.split(",") : [],
      publishedAt: post?.publishedAt ? new Date(post?.publishedAt) : new Date(),
    },
  });

  const {
    formState: { isValid },
    setValue,
    watch,
  } = form;

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [files, setFiles] = useState([]);

  const generateRandomId = () => {
    return Math.floor(Math.random() * 100000000).toString();
  };

  const contestId = watch("contestId");
  const language = watch("language");
  const title = watch("title");

  useEffect(() => {
    if (!post?.id) {
      if (title) {
        const newSlug = `${title.toLowerCase().replace(/\s+/g, "-")}-${generateRandomId()}`;
        setValue("slug", newSlug, { shouldValidate: true });
      } else {
        setValue("slug", "");
      }
    }
  }, [title, setValue]);

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
        }));
      setSelectedFiles(fileObjects);
    }
  }, [post?.file]);

  useEffect(() => {
    setViewId(contestId);
    setViewUrl(
      `<p><a href="/contest/${contestId}/general" rel="noopener noreferrer" target="_blank">참가신청하기</a></p>`,
    );
  }, [contestId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles([...e.target.files]);
  };

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
          url: file.url,
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
        tags: values.tags.join(","),
        publishedAt: values.publishedAt,
        pin: Number(values.pin),
        categoryId: formType === "notice" ? "1" : "2",
        file: [imageEntry, ...fileEntries],
      };

      // if (post?.id) {
      //   await client.updatePost({
      //     input: {
      //       id: post.id,
      //       ...data,
      //     },
      //   });
      // } else {
      //   await client.createPost({
      //     input: {
      //       ...data,
      //     },
      //   });
      // }

      // router.push(
      //   formType === "notice"
      //     ? getFinalCallbackUrl(RoutePaths.adminNotice.value)
      //     : getFinalCallbackUrl(RoutePaths.adminPress.value),
      // );
      // router.refresh();
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
    { value: "en", label: "English" },
    { value: "ko", label: "Korean" },
  ];

  const selectedContestOption = contestOptions?.find(
    option => option.value === contestId,
  );

  const selectedLanguageOption = languageOptions?.find(
    option => option.value === language,
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="flex gap-x-24 flex-wrap">
          <div className="flex flex-col w-3/5 gap-y-6">
            <div className="flex flex-row gap-x-4 w-full">
              {formType === "press" && (
                <div className="flex flex-col w-1/4">
                  {/* <p className="font-medium mb-2">Select image</p> */}
                  <UploadImage
                    value={files}
                    onChange={setFiles}
                    sx={{ width: "100%", height: "100%" }}
                    maxFiles={1}
                  />
                </div>
              )}

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
                          placeholder="Title to show above the post image"
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
                          placeholder="Short description about this post"
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
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Editor {...field} id="toolbarId" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between">
              <div>Post</div>
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
              <div>Notice</div>
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
            <div className="mt-4">
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language</FormLabel>
                    <FormControl>
                      <AutoCompleteSelect
                        {...field}
                        options={languageOptions}
                        isClearable
                        isSearchable
                        placeholder="Select a Language"
                        value={selectedLanguageOption}
                        onChange={option =>
                          //@ts-ignore
                          setValue("language", option ? option.value : "")
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
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        variant="outline"
                        placeholder="Slug"
                        {...field}
                        disabled
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
                      <ChipsInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-4">
              <FormField
                control={form.control}
                name="publishedAt"
                render={({ field }) => (
                  <FormItem className="flex flex-1">
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "justify-start text-left font-normal flex-1",
                              !field.value && "text-muted-foreground",
                            )}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Publish date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-4">
              <p className="font-medium mb-2">Select Attachment</p>
              <UploadFiles
                value={selectedFiles}
                onChange={setSelectedFiles}
                sx={{ mb: 0 }}
                // maxFiles={1}
              />
            </div>
            {/* <div className="mt-4">
              <div className="mt-1 flex items-center space-x-2 placeholder:text-muted-foreground focus-visible:outline-none  focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  w-full  h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50">
                <label htmlFor="file-upload" className="">
                  <span>Attachment</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    multiple
                    onChange={handleFileChange}
                  />
                </label>
                <span className="text-gray-500">
                  {selectedFiles.length} files selected
                </span>
              </div>
            </div> */}
            <div className="mt-4">
              <FormField
                control={form.control}
                name="contestId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contest</FormLabel>
                    <FormControl>
                      <AutoCompleteSelect
                        {...field}
                        options={contestOptions}
                        isClearable
                        isSearchable
                        placeholder="Select a contest"
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
                    <FormLabel>View Button Info</FormLabel>
                    <FormControl>
                      <Input variant="outline" value={viewUrl} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end mt-12">
              <Button
                disabled={!(isValid && files.length) || createState.value}>
                {post ? "Update" : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default BulletinBoardForm;
