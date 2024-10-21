"use client";

import UploadMultiFileMini from "@/app/[locale]/(routes)/components/upload/upload";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Checkbutton } from "@/components/ui/checkbutton";
import { RadioButton } from "@/components/ui/radiobuttongroup";
import { getFinalCallbackUrl } from "@/utils/url";
import Editor from "@/components/editor/editor";
import { DateTimeRangePicker } from "@/components/date-time-range-picker/date-time-range--picker";
import { useTranslations } from "next-intl";
import { convertToISO } from "@/utils/date";

// type Props = {
//   slider: PostCommonPartsFragment;
// };

const RADIO_GROUP_VALUES = [
  { id: "-1", value: "Preparing", label: "접수대기" },
  { id: "0", value: "Ongoing", label: "접수중" },
  { id: "10", value: "Reviewing", label: "심사중" },
  { id: "11", value: "R1_Reviewing", label: "1차 심사중" },
  { id: "12", value: "R2_Reviewing", label: "2차 심사중" },
  { id: "1", value: "1st_selection", label: "1차 선정" },
  { id: "2", value: "2nd_selection", label: "2차 선정" },
  { id: "99", value: "Selection", label: "선정" },
  { id: "100", value: "End", label: "종료" },
];

const ContestForm = ({ contest }) => {
  const { toast } = useToast();
  const router = useRouter();
  const t = useTranslations();
  const createState = useBoolean();
  // const { user, refresh } = useAuth();

  console.log("contest", contest);

  const formSchema = z.object({
    contestType: z.string().min(1, {
      message: t("admin_contest_type_error"),
    }),
    applyNumberPrefix: z.string().min(1, {
      message: t("admin_contest_prefix_error"),
    }),
    title: z.string().min(1, {
      message: t("admin_ticker_title_error"),
    }),
    content: z.string().min(1, {
      message: t("admin_description_error"),
    }),
    date: z
      .object({
        from: z.string().optional(),
        to: z.string().optional(),
      })
      .refine(data => (data.from && data.to) || (!data.from && !data.to), {
        message: t("admin_contest_date_error"),
      }),
    guideUrl: z.string().optional(),
    highlight: z.string().optional(),
    // active: z.boolean(),
    viewMain: z.boolean(),
    statusId: z.string(),
    // publishStatus: z.boolean(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      contestType: contest?.contestType || "",
      applyNumberPrefix: contest?.applyNumberPrefix || "",
      title: contest?.title || "",
      content: contest?.content || "",
      date: {
        from: contest?.startDate ? contest?.startDate : null,
        to: contest?.endDate ? contest?.endDate : null,
      },
      guideUrl: contest?.guideUrl || "",
      highlight: contest?.highlight || "",
      // active: slider?.active || false,
      viewMain: contest?.viewMain == "예" || false,
      statusId: String(contest?.statusId) || "99",
    },
  });
  const {
    formState: { isValid },
  } = form;

  useEffect(() => {
    if (contest?.file) {
      setFiles([getImagePath(contest?.file?.[0].url)]);
    }
  }, [contest?.file?.original]);

  const [files, setFiles] = useState([]);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      createState.setValue(true);
      let imageUrl = files[0];
      let originalName;

      if (files[0]?.type && typeof imageUrl !== "string") {
        const uploads = await uploadImages(files, "images", "images");
        console.log(files);

        imageUrl = uploads?.[0]?.path?.fields?.Key;
        originalName = uploads?.[0]?.originalName;
      } else {
        imageUrl = contest?.file?.[0].url;
        originalName = contest?.file?.[0].filename;
      }
      const data = {
        contestType: values.contestType,
        applyNumberPrefix: values.applyNumberPrefix,
        title: values.title,
        content: values.content,
        startDate: values.date.from,
        endDate: values.date.to,
        guideUrl: values?.guideUrl ? values.guideUrl : values.title,
        highlight: values?.highlight,
        // active
        viewMain: values.viewMain == true ? "예" : "아니요",
        statusId: parseInt(values.statusId),
        applyYn: 0,
        snippet: "snippet",
        views: 0,
        file: [
          {
            url: imageUrl,
            filename: originalName,
            type: FileType.Image,
          },
        ],
      };

      if (contest?.id) {
        const response = await client.updateContest({
          input: {
            id: contest.id,
            ...data,
          },
        });
      } else {
        const response = await client.createContest({
          input: {
            ...data,
          },
        });
      }
      router.push(getFinalCallbackUrl(RoutePaths.adminContest.value));
      router.refresh();
    } catch (e) {
      // console.log("EEEEEEEEEEEEEEE", e);
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
        <div className="flex flex-col gap-3 flex-wrap divide-y divide-dashed mt-4 pb-16">
          <div className="flex w-full pb-8">
            <p className="w-2/3">
              <strong>{t("admin_contest_section_title_1")}</strong> <br />
              {t("admin_contest_section_subtitle_1")}
            </p>
            <div className="flex flex-col gap-3 flex-wrap w-[800px]">
              <FormField
                control={form.control}
                name="contestType"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Type</FormLabel> */}
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="지원구분" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="firstButton">
                            첫단추프로젝트
                          </SelectItem>
                          <SelectItem value="mcn">1인방송제작스쿨</SelectItem>
                          <SelectItem value="drama">
                            드라마극본공모전
                          </SelectItem>
                          <SelectItem value="bcpf">
                            BCPF 대한민국 1인 방송대상
                          </SelectItem>
                          <SelectItem value="safe">안전드림공모전</SelectItem>
                          <SelectItem value="pbcs2">
                            방방곳곡 : 지역이-음
                          </SelectItem>
                          <SelectItem value="school">BCPF콘텐츠학교</SelectItem>
                          {/* <SelectItem value="green">Green</SelectItem>
                          <SelectItem value="young">Young</SelectItem>
                          <SelectItem value="susi">Susi</SelectItem>
                          <SelectItem value="global">Global</SelectItem>
                          <SelectItem value="vr">Vr</SelectItem>
                          <SelectItem value="pbcs">Pbcs</SelectItem>
                          <SelectItem value="dramaonit">Dramaonit</SelectItem>
                          <SelectItem value="upcycle">Upcycle</SelectItem>
                          <SelectItem value="eco">Eco</SelectItem> */}
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
              <strong>{t("admin_contest_section_title_2")}</strong> <br />{" "}
              {t("admin_contest_section_subtitle_2")}
            </p>
            <div className="flex flex-col gap-3 flex-wrap w-[800px] space-y-3">
              <FormField
                control={form.control}
                name="applyNumberPrefix"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t("admin_contest_prefix")}</FormLabel>
                    <FormControl>
                      <Input
                        variant="outline"
                        placeholder={t("admin_contest_prefix_placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t("column_title")}</FormLabel>
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
                name="content"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t("admin_slider_description")}</FormLabel>
                    <FormControl>
                      {/* <Textarea placeholder="내용" {...field} /> */}
                      <Editor
                        {...field}
                        id="toolbarId"
                        placeholder={t("admin_slider_description_placeholder")}
                        toolBar={false}
                        modules={{
                          toolbar: false,
                        }}
                        className="rounded-md border dark:border-slate-500 dark:focus:border-white dark:focus-visible:border-2"
                        theme="bubble"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col w-full">
                <DateTimeRangePicker
                  type={["DATE-TIME-RANGE"]}
                  form={form}
                  label={t("admin_contest_period")}
                />
              </div>
              <FormField
                control={form.control}
                name="highlight"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t("admin_contest_highlight")}</FormLabel>
                    <FormControl>
                      <Input
                        variant="outline"
                        placeholder={t("admin_contest_highlight_placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="guideUrl"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t("admin_contest_url")}</FormLabel>
                    <FormControl>
                      <Input variant="outline" placeholder="Url" {...field} />
                    </FormControl>
                    <FormMessage />
                    <p className="text-sm text-slate-400">
                      * /notice/ 뒤에 공지사항을 만들 때 사용한 고유주소를
                      입력하시면 됩니다.
                    </p>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex">
            <div className="flex items-center ">
              {/* <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Checkbutton
                      checked={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
              {/* <div className="mb-1 ml-2 mr-4">Active</div> */}
            </div>
            <div className="flex w-full py-8">
              <p className="w-2/3">
                <strong>{t("admin_contest_section_title_3")}</strong> <br />{" "}
                {t("admin_contest_section_subtitle_3")}
              </p>
              <div className="flex flex-col gap-3 flex-wrap w-[800px]">
                <div className="flex">
                  <FormField
                    control={form.control}
                    name="viewMain"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Checkbutton
                            checked={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="mb-1 ml-2">{t("admin_contest_main")}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full py-8">
            <p className="w-2/3">
              <strong>{t("admin_contest_section_title_4")}</strong> <br />{" "}
              {t("admin_contest_section_subtitle_4")}
            </p>
            <div className="flex flex-col gap-3 flex-wrap w-[800px]">
              <FormField
                control={form.control}
                name="statusId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioButton
                        fields={RADIO_GROUP_VALUES}
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

          <div className="flex w-full py-8">
            <p className="w-2/3">
              <strong>{t("admin_contest_section_title_5")}</strong> <br />{" "}
              {t("admin_contest_section_subtitle_5")}
            </p>
            <div className="flex flex-col gap-3 flex-wrap w-[800px]">
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
              {contest ? t("admin_button_save") : t("admin_button_complete")}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ContestForm;
