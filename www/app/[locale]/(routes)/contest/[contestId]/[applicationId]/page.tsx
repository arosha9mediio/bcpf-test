import {
  ContestForms,
  ViewMode,
} from "@/app/[locale]/(routes)/components/contestComponents/forms/ContestForm";
import { client } from "@/lib/client";
import { notFound } from "next/navigation";
import React from "react";
import { ContestType } from "../../../components/contestComponents/forms/components/segments/common";
import {
  getApplication,
  getApplicationByContest,
  getContest,
} from "../actions";
import { isCurrentDateWithinInterval } from "../utils";

interface Props {
  params: { contestId: string; applicationId: string };
}

const fetchBatched = async (contestId: string, applicationId: string) => {
  try {
    const [user, application, applicationByContest] = await Promise.all([
      client.getMe(),
      // getContest(contestId),
      getApplication(applicationId),
      getApplicationByContest(contestId),
    ]);

    return { user, application, applicationByContest };
  } catch (error) {
    throw error;
    return notFound();
  }
};

const Contest: React.FC<Props> = async ({ params }) => {
  const { user, application, applicationByContest } = await fetchBatched(
    params.contestId,
    params.applicationId,
  );

  const contest = application?.findApplication.Contest;
  const contentType = contest?.contestType as ContestType;

  const applicationId = application?.findApplication?.id;
  //const applIdsOnContestSet = new Set(contest?.Application?.map(c => c?.id));

  if (!applicationId) {
    return notFound();
  }

  const isContestAvailable = isCurrentDateWithinInterval(
    contest?.startDate,
    contest?.endDate,
  );

  if (user?.getMe?.role !== "ADMIN" && !isContestAvailable) {
    throw new Error("접수기간이 종료되어 지원서를 수정할 수 없습니다.");
  }
  if (user?.getMe?.role === "ADMIN") {
    return (
      <ContestForms
        user={user}
        viewMode={"EDIT"}
        type={contentType}
        contestApply={application?.findApplication}
        contest={contest}
      />
    );
  }

  const mode: ViewMode = !isContestAvailable ? "READONLY" : "EDIT";

  // found via {params.applicationId} availability
  if (application?.findApplication) {
    return (
      <ContestForms
        user={user}
        viewMode={mode}
        type={contentType}
        contestApply={application?.findApplication}
        contest={contest}
      />
    );
  }

  // found via {params.applicationId} unavailability
  if (applicationByContest?.getApplicationByContest) {
    return (
      <ContestForms
        user={user}
        type={contentType}
        viewMode={mode}
        contestApply={applicationByContest?.getApplicationByContest}
        contest={contest}
      />
    );
  }

  return (
    <ContestForms
      user={user}
      type={contentType}
      contestApply={{}}
      contest={contest}
    />
  );
};

export default Contest;
