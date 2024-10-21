"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ApplicantCommonPartsFragment,
  ContestCommonPartsFragment,
  FileType,
  GetMeQuery,
} from "@/lib/__generated/sdk";
import { client } from "@/lib/client";
import { getImagePath } from "@/utils/aws";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import useUploadFiles from "../../upload/useUpdateFiles";
import { PrivateDataDialog } from "../common/PrivateDataDialog";
import ContextImage from "../contextImage";
import { applier1Schema, applier2Schema } from "../schema/applier-schema";
import {
  consentSchema,
  fileSchema,
  referralSchema,
} from "../schema/misc-schema";
import { programSchema } from "../schema/program-schema";
import { schoolSchema } from "../schema/schoolSchema";
import { FormHeader } from "./components/FormHeader";
import { useSegment } from "./components/common";
import { CONTEST_FORM_HEADERS } from "./components/constants";
import { Applicant2Segment } from "./components/segments/Applicant2Segment";
import { ApplicantSegment } from "./components/segments/ApplicantSegment";
import { COISegment } from "./components/segments/COISegment";
import { ProgramSegment } from "./components/segments/ProgramSegment";
import { ReferralSegment } from "./components/segments/ReferralSegment";
import { SchoolSegment } from "./components/segments/SchoolSegment";
import { UploadSegment } from "./components/segments/UploadSegment";
import { ContestType } from "./components/segments/common";
import { useOnSumbit } from "./components/tools/useSegmentTools";
import { getGender } from "./components/tools/utils";
import { LoadingSpinner } from "@/components/table/components/TableActionLoader";
import { RoutePaths } from "@/constants/route";

type ContestFormsProps = {
  user: GetMeQuery;
  contest: Partial<ContestCommonPartsFragment>;
  contestApply: Partial<ApplicantCommonPartsFragment>;
  viewMode?: ViewMode;
  type: ContestType;
  expired?: boolean;
};

type ViewMode = "DEFAULT" | "EDIT" | "READONLY";

type ContestFormsType = (props: ContestFormsProps) => JSX.Element;

const ContestForms: ContestFormsType = ({
  contest,
  contestApply,
  type,
  user: usr,
  expired = false,
  viewMode = "DEFAULT",
}) => {
  const user = useMemo(() => usr?.getMe, [usr]);
  const t = useTranslations();
  const { uploadFiles } = useUploadFiles();
  const { back, push } = useRouter();
  const params = useSearchParams();

  const [termsAndConditions, settermsAndContions] = useState(true);
  const [network, setNetwork] = useState(false);
  //const [hasTeam, setHasTeam] = useState(false);

  const emptyString = " ";

  const isEdit = useMemo(() => viewMode === "EDIT", [viewMode]);
  const mode = useMemo(() => params?.get("mode"), [params]);

  const isOwner = useMemo(() => {
    return (
      Object.keys(contestApply)?.length !== 0 &&
      contestApply?.userId !== Number(user?.id) &&
      user?.role !== "ADMIN"
    );
  }, [user, contestApply]);

  const readOnly = useMemo(
    () => isOwner || mode === "readOnly" || viewMode === "READONLY",
    [user, mode],
  );

  const related = useMemo(() => {
    const base = {
      contestId: Number(contest.id),
      userId: Number(user?.id),
      contestType: contest.contestType,
      applyNumber: contestApply?.applyNumber || emptyString,
      applier1Address: contestApply?.applier1Address || emptyString,
      applierType: contestApply?.applierType || emptyString,
      passChasu: contestApply?.passChasu || emptyString,
      passStatus: contestApply?.passStatus || emptyString,
      id: contestApply?.id,
    };

    const conditional = isEdit
      ? { ...base }
      : { ...base, prefix: contest.applyNumberPrefix };

    return conditional;
  }, [contest, contestApply, user]);

  const { punch } = useOnSumbit(
    isEdit,
    setNetwork,
    client.createApplicant,
    client.updateApplication,
    related,
    [isEdit ? "applyNumber" : null],
    ["hasTeammate", "isSensitive"],
  );

  const handleDeadEndSubmit = a => {};

  const _type: ContestType = type;

  const embedFiles = useMemo(() => {
    const invokedPaths = contestApply.file?.map(file => {
      const payload = {
        name: file.filename,
        url: getImagePath(file.url),
        base: file.url,
      };

      const fileContent = JSON.stringify(payload);
      const f = new File([fileContent], payload.name, {
        type: file.type,
      });

      return f;
    });

    return invokedPaths;
  }, [contestApply?.file]);

  const getProfileData = async () => {
    {
      if (isEdit || user?.role === "ADMIN") {
        return {
          ...contestApply,
          hasTeammate: "no",
        };
      }

      const profileData = {
        applier1Name: user?.UserProfile?.name,
        applier1Mobile: user?.UserProfile?.phone,
        applier1Email: user?.email,
        applier1Birth: user?.UserProfile?.birthday,
        applier1Gender: getGender(user?.UserProfile?.gender),
        applier1Address: user?.UserProfile?.address,
        hasTeammate: "no",
      };

      return profileData;
    }
  };

  const [a1, a1v, takeApp, aF] = useSegment(
    applier1Schema,
    _type,
    getProfileData,
  );

  const [a2, a2v, takeApp2, a2F] = useSegment(
    applier2Schema,
    _type,
    contestApply,
  );
  const [sc, _, takeSc, scF] = useSegment(schoolSchema, _type, contestApply);
  const [pg, pv, takePg, pF] = useSegment(programSchema, _type, contestApply);
  const [coi, cv, takeCoi, cF] = useSegment(consentSchema, _type, {
    applyBCPFYn: contestApply?.applyBCPFYn,
  });
  const [referral, rv, takeRef, rf] = useSegment(referralSchema, _type, {
    howToCome: contestApply?.howToCome,
  });
  const [file, fv, takeFile, fF] = useSegment(fileSchema, _type, {
    file: embedFiles ?? [],
  });

  const coiDisabled = coi.watch("applyBCPFYn");
  const isSensitive = pg?.watch("isSensitive");
  const hasTeam = a1?.watch("hasTeammate");

  const createFileEntries = async (files: File[], contestTitle: string) => {
    if (files[0]?.type && typeof files !== "string") {
      const f = await uploadFiles(files, "application", contestTitle);
      const fileEntries = f.map((file, index) => ({
        url: file?.path?.fields?.Key,
        filename: file?.originalName,
        type: FileType.Doc,
      }));

      return fileEntries;
    }

    return files.map(file => ({
      filename: file.name,
      url: file?.["base"],
      type: FileType.Doc,
    }));
  };

  const handleEx = async () => {
    const basePromises = [
      _type !== "school" && takeApp(),
      _type !== "school" && takePg(),
      takeCoi(),
      takeRef(),
      _type === "school" ? takeSc() : null,
      hasTeam === "yes" ? takeApp2() : null,
    ];

    const objs = await Promise.all(basePromises);
    const mergedData = objs.reduce((acc, obj) => Object.assign(acc, obj), {});

    const files = await takeFile();
    const fileEntries = await createFileEntries(files?.file, contest.title);

    const secondMajor = {
      ...mergedData,
      companyAttDate: String(mergedData["companyAttDate"]),
      file: [...fileEntries],
    };

    await punch(secondMajor);
  };

  const handlePrivateDialogOnContinue = () => {
    pg?.setValue("isSensitive", "no");
    pg?.trigger("isSensitive");
  };

  const handleGoBack = () => {
    if (window?.history?.length > 1) {
      back();
      return;
    }

    push(RoutePaths.home.value);
  };

  return (
    <div
      id="Hero1"
      className="container flex flex-col sm:flex-row mt-[90px] sm:mt-[75px] pb-120">
      <div className="flex flex-col-reverse md:flex-row mt-[25px]">
        <div className="sm:w-2/3 ">
          {/* HEADER */}

          <FormHeader contest={contest} {...CONTEST_FORM_HEADERS[_type]} />

          {/* SEGMENTS */}
          <div className="space-y-3 sm:space-y-4">
            {_type !== "school" && (
              <ApplicantSegment
                form={a1}
                type={_type}
                fields={aF}
                teamCallback={null}
                callback={handleDeadEndSubmit}
                readOnly={readOnly}
              />
            )}

            {hasTeam === "yes" && (
              <Applicant2Segment
                fields={a2F}
                type={_type}
                form={a2}
                callback={handleDeadEndSubmit}
                readOnly={readOnly}
              />
            )}

            {_type === "school" && (
              <SchoolSegment
                fields={scF}
                form={sc}
                type={_type}
                callback={null}
                readOnly={readOnly}
              />
            )}

            {_type !== "school" && (
              <ProgramSegment
                fields={pF}
                type={_type}
                form={pg}
                callback={handleDeadEndSubmit}
                readOnly={readOnly}
              />
            )}

            <COISegment
              fields={cF}
              type={_type}
              form={coi}
              callback={handleDeadEndSubmit}
              readOnly={readOnly}
            />

            <ReferralSegment
              fields={rf}
              type={_type}
              form={referral}
              callback={handleDeadEndSubmit}
              readOnly={readOnly}
            />

            <div className="mt-12 space-y-4 sm:space-y-8">
              <UploadSegment
                form={file}
                type={_type}
                callback={null}
                fields={null}
                readOnly={readOnly}
              />
              <div className="sm:mt-12 sm:space-y-3">
                {contest?.content ? (
                  <div
                    className="cms-view"
                    dangerouslySetInnerHTML={{ __html: contest?.content }}
                  />
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
                <Checkbox
                  id="c1"
                  checked={termsAndConditions}
                  onCheckedChange={() =>
                    settermsAndContions(!termsAndConditions)
                  }
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
                <Button
                  onClick={handleGoBack}
                  variant="outline"
                  className="w-full border-solid">
                  {"취소하기"}
                </Button>
                <Button
                  type="button"
                  onClick={handleEx}
                  disabled={
                    !termsAndConditions ||
                    network ||
                    coiDisabled === "no" ||
                    readOnly
                  }
                  className="w-full p-4">
                  {!network && "지원하기"}
                  {network && <LoadingSpinner />}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <ContextImage src={getImagePath(contest?.file?.[0]?.url)} />
        <PrivateDataDialog
          open={isSensitive === "yes"}
          onContinue={handlePrivateDialogOnContinue}
          onClose={handleGoBack}
        />
      </div>
    </div>
  );
};

export { ContestForms };
export type { ViewMode };
