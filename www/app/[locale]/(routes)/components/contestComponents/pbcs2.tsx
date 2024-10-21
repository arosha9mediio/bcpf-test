"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
// import { uploadImages } from "@/components/upload-images";
import useBoolean from "@/hooks/useBoolean";
import { FileType } from "@/lib/__generated/sdk";
import { client } from "@/lib/client";
import { getImagePath } from "@/utils/aws";
import { getErrorMessage } from "@/utils/error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { SelectButton } from "@/components/ui/selectButtons";

import { useAuth } from "@/hooks/use-auth";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import UploadContestFile from "../upload/uploadContestFile";
import useUploadFiles from "../upload/useUpdateFiles";
import { AGGREE_TO_TC, APPLIER1_GENDER, FOUND_BY } from "./common";
import ContextImage from "./contextImage";
import "./styles.css";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

function isValidEmail(email) {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const Pbcs2 = ({ contestApply, contest, isEdit = false }) => {
  const { toast } = useToast();
  const t = useTranslations();
  const router = useRouter();
  const createState = useBoolean();
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { uploadFiles } = useUploadFiles();
  const [termsAndConditions, settermsAndContions] = useState(
    isEdit ? true : false,
  );
  const { user } = useAuth();
  const scrollRef = useRef(null);

  const formSchema = z.object({
    applier1Name: z.string().min(1, {
      message: "Name must be provided.",
    }),
    applier1Mobile: z.string().min(1, {
      message: "Phoneno must be provided.",
    }),
    applier1Email: z
      .string()
      .min(1, {
        message: "Email must be provided.",
      })
      .email({ message: "Invalid email format." }),
    applier1Birth: z.date({ message: "Date must be selected." }),
    applier1Gender: z.string().min(1, {
      message: "Gender must be provided.",
    }),

    programChannel: z.string().min(1, {
      message: "Program Channel must be provided.",
    }),
    programRegion: z.string().min(1, {
      message: "Program Region must be provided.",
    }),
    programTitle: z.string().min(1, {
      message: "Program must be provided.",
    }),
    programGenre: z.string().min(1, {
      message: "Gene must be provided.",
    }),
    trailerUrl: z.string().min(1, {
      message: "Trailer Url must be provided.",
    }),
    applier1Carrier: z.string().min(1, {
      message: "Career must be provided.",
    }),
    applyBCPFYn: z.string().min(1, {
      message: "yes no must be provided.",
    }),

    howToCome: z.string().min(1, {
      message: "type must be provided.",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      applier1Name: contestApply?.applier1Name || "",
      applier1Mobile: contestApply?.applier1Mobile || "",
      applier1Email: contestApply?.applier1Email || "",
      applier1Birth: contestApply?.applier1Birth
        ? new Date(contestApply?.applier1Birth)
        : null,
      applier1Gender: contestApply?.applier1Gender || "남성",
      programChannel: contestApply?.programChannel || "",
      programRegion: contestApply?.programRegion || "",
      programTitle: contestApply?.programTitle || "",
      programGenre: contestApply?.programGenre || "",
      trailerUrl: contestApply?.trailerUrl || "",
      applier1Carrier: contestApply?.applier1Carrier || "",
      applyBCPFYn: contestApply?.applyBCPFYn || "예",
      howToCome: contestApply?.howToCome || "재단",
    },
  });

  const {
    formState: { isValid },
    watch,
    setValue,
  } = form;

  useEffect(() => {
    if (contestApply?.file?.[0]?.url) {
      setFiles([getImagePath(contestApply.file[0].url)]);
    }

    if (contestApply?.file) {
      const fileObjects = contestApply.file
        .filter(file => file.type === FileType.Doc)
        .map(file => ({
          name: file.filename,
          url: getImagePath(file.url),
          base: file.url,
        }));
      setSelectedFiles(fileObjects);
    }
  }, [contestApply?.file]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      createState.setValue(true);

      let fileUrl = selectedFiles;
      let originalName, fileName;

      let fileEntries = [];

      if (selectedFiles[0]?.type && typeof fileUrl !== "string") {
        console.log(selectedFiles);
        const fileUploads = await uploadFiles(
          selectedFiles,
          "application",
          contest.title,
        );
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
        applier1Name: values.applier1Name,
        applier1Mobile: values.applier1Mobile,
        applier1Email: values.applier1Email,
        applier1Birth: values.applier1Birth,
        applier1Gender: values.applier1Gender,
        programChannel: values.programChannel,
        programRegion: values.programRegion,
        programTitle: values.programTitle,
        programGenre: values.programGenre,
        trailerUrl: values.trailerUrl,
        applier1Carrier: values.applier1Carrier,
        applyBCPFYn: values.applyBCPFYn,
        howToCome: values.howToCome,
        contestType: contest.contestType,
        contestId: parseInt(contest.id),
        applier1Address: " ",
        applierType: " ",
        applyNumber: " ",
        passChasu: " ",
        passStatus: " ",
        userId: parseInt(user.id),
        file: [...fileEntries],
      };

      if (isEdit) {
        console.log("edit", data, contestApply?.id);
        const response = await client.updateApplication({
          input: {
            id: contestApply?.id,
            applyNumber: contestApply?.applyNumber,
            applier1Address: contestApply?.applier1Address,
            applierType: contestApply?.applierType,
            passChasu: contestApply?.passChasu,
            passStatus: contestApply?.passStatus,
            ...data,
          },
        });
      } else {
        const response = await client.createApplicant({
          input: {
            applyNumber: " ",
            applier1Address: " ",
            applierType: " ",
            passChasu: " ",
            passStatus: " ",
            ...data,
            prefix: contest.applyNumberPrefix,
          },
        });
      }

      router.push("/post/notice");
      router.refresh();
    } catch (e) {
      console.log(e);
      toast({
        variant: "destructive",
        description: getErrorMessage(e),
      });
    } finally {
      createState.setValue(false);
    }
  };

  return (
    <div
      id="Hero1"
      className="container flex flex-col-reverse sm:flex-row mt-[90px] sm:mt-[150px] pb-120"
      ref={scrollRef}>
      <div className="sm:w-2/3 ">
        <h1 className="text-2xl font-bold">
          {"지역살리기프로젝트 <방방곳곡:지역이-음>"}
        </h1>
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-black mr-2"></div>
            <div>모든 항목은 필수값 항목 처리</div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-black mr-2"></div>
            <div>접수파일 업로드는 한글(.hwp) 포맷만 가능하도록 설정</div>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-black mr-2"></div>
            <div>온라인 신청서 제출 이후 수정.삭제 불가</div>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 sm:space-y-4">
            <h3 className="mt-8 sm:mt-12 sm:pb-3 font-bold">대표자(감독)</h3>
            <div className="w-full md:flex md:space-x-6 space-y-3 sm:space-y-0">
              <FormField
                control={form.control}
                name="applier1Name"
                render={({ field }) => (
                  <FormItem className="w-full mt-1">
                    <FormControl>
                      <Input
                        placeholder="이름"
                        {...field}
                        borderBottom={true}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full">
                {/* <FormLabel>date</FormLabel> */}
                <FormField
                  control={form.control}
                  name="applier1Mobile"
                  render={({ field }) => (
                    <FormItem className="w-full mt-1">
                      <FormControl>
                        <Input
                          placeholder="연락처"
                          {...field}
                          borderBottom={true}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full md:flex md:space-x-6 space-y-3 sm:space-y-0">
              <FormField
                control={form.control}
                name="applier1Email"
                render={({ field }) => (
                  <FormItem className="w-full mt-1">
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="이메일"
                        {...field}
                        borderBottom={true}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full">
                {/* <FormLabel>date</FormLabel> */}
                <FormField
                  control={form.control}
                  name="applier1Birth"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <DatePicker
                          label={t("forms_placeholders_dob")}
                          value={field.value}
                          onChange={field.onChange}
                          slotProps={{
                            textField: {
                              // variant: "standard",
                              style: {
                                width: "100%",
                              },
                            },
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="pt-4 sm:pt-0">
              <p className="mt-8 mb-2 text-black">성별</p>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="applier1Gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <SelectButton
                          isBorder={true}
                          fields={APPLIER1_GENDER}
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
            <div className="mt-12">
              <h3 className="mt-12 pb-3 font-bold">
                {contest.title}회 첫단추프로젝트 신청서
              </h3>
              <div className="md:space-y-6">
                <div className="w-full md:flex md:space-x-6">
                  <FormField
                    control={form.control}
                    name="programChannel"
                    render={({ field }) => (
                      <FormItem className="w-full mt-1">
                        <FormControl>
                          <Input
                            placeholder="채널명"
                            {...field}
                            borderBottom={true}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="programRegion"
                      render={({ field }) => (
                        <FormItem className="w-full mt-1">
                          <FormControl>
                            <Input
                              placeholder="제작지역"
                              {...field}
                              borderBottom={true}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="w-full md:flex md:space-x-6">
                  <FormField
                    control={form.control}
                    name="programTitle"
                    render={({ field }) => (
                      <FormItem className="w-full mt-1">
                        <FormControl>
                          <Input
                            placeholder="작품명"
                            {...field}
                            borderBottom={true}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="programGenre"
                      render={({ field }) => (
                        <FormItem className="w-full mt-1">
                          <FormControl>
                            <Input
                              placeholder="장르"
                              {...field}
                              borderBottom={true}
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
                  name="trailerUrl"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          placeholder="콘텐츠 URL"
                          {...field}
                          borderBottom={true}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="applier1Carrier"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          placeholder="출품 / 경력사항"
                          {...field}
                          borderBottom={true}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <h3 className="mt-8 pt-3 font-bold">개인정보 수집 및 이용 동의</h3>
            <div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="applyBCPFYn"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <SelectButton
                          isBorder={true}
                          fields={AGGREE_TO_TC}
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
            <h3 className="mt-8 pt-3 font-bold">모집공고 알게 된 경로</h3>
            <div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="howToCome"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        {/* <SelectButton
                          isBorder={true}
                          isSmall={true}
                          fields={FOUND_BY}
                          value={field.value}
                          onChange={field.onChange}
                          {...field}
                        /> */}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="mt-12 space-y-4 sm:space-y-8">
              <h3 className="sm:mt-12 mt-8 font-bold">첨부파일 업로드</h3>

              {/* <UploadContestFile
                value={files}
                onChange={setFiles}
                sx={{ mb: 0 }}
                maxFiles={1}
              /> */}
              <UploadContestFile
                value={selectedFiles}
                onChange={setSelectedFiles}
                sx={{ mb: 0, mt: 0 }}
                maxFiles={1}
              />
              <div className="sm:mt-12 sm:space-y-3">
                {contest?.content ? (
                  contest?.content
                ) : (
                  <div className="sm:mt-12 space-y-3">
                    <p className="text-md">참가신청서 1부(필수)</p>
                    <p className="text-md">
                      ❈ 파일형식은 .hwp로만 10MB 이하로 제출
                    </p>
                  </div>
                )}
              </div>
              <div className="flex mt-8">
                <input
                  id="cb1"
                  checked={termsAndConditions}
                  className="bg-black text-black h-6 w-6"
                  type="checkbox"
                  onChange={() => settermsAndContions(!termsAndConditions)}
                />

                <div className="mb-1 ml-2 text-md">
                  본인은 방송콘텐츠진흥재단이 시행하는 {contest.title}의
                  참가신청에 대한 안내 및 유의사항을 충분히 숙지하였으며 기재한
                  내용은 사실과 다름이 없음을 확인합니다.
                </div>
              </div>
            </div>

            <div className="sticky sm:static inset-x-0 bottom-0 py-4 bg-background z-40">
              <div className="flex justify-between gap-4">
                <Button className="w-full p-4 bg-[#999999] dark:bg-[#999999]">
                  {"취소하기"}
                </Button>
                <Button
                  disabled={!termsAndConditions || createState.value}
                  className="w-full p-4">
                  {"지원하기"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
      <ContextImage />
    </div>
  );
};

export default Pbcs2;
