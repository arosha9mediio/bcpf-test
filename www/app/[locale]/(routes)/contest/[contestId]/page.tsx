import { client } from "@/lib/client";
import { notFound } from "next/navigation";
import React from "react";
import DramaDialog from "../../components/contestComponents/common/DramaDialog";
import { ExpiredDialog } from "../../components/contestComponents/common/ExpiredDialog";
import { ContestForms } from "../../components/contestComponents/forms/ContestForm";
import { ContestType } from "../../components/contestComponents/forms/components/segments/common";
import { getApplicationByContest, getContest } from "./actions";
import { isCurrentDateWithinInterval } from "./utils";

interface Props {
  params: { contestId: string };
}

const fetchBatched = async (id: string) => {
  try {
    const [user, contest, application] = await Promise.all([
      client.getMe(),
      getContest(id),
      getApplicationByContest(id),
    ]);

    return { user, contest, application };
  } catch (error) {
    console.error("Error fetching data:", { ...error });
    throw error;
    return notFound();
  }
};

const Contest: React.FC<Props> = async ({ params }) => {
  const { user, application, contest } = await fetchBatched(params.contestId);

  const contentType = contest?.findContest?.contestType as ContestType;

  const dramaOverflow =
    contentType === "drama" && contest?.findContest?.Application?.length >= 3;

  const dramaNotOverflow =
    contentType === "drama" && contest?.findContest?.Application?.length < 3;

  const isContestAvailable = isCurrentDateWithinInterval(
    contest?.findContest?.startDate,
    contest?.findContest?.endDate,
  );

  if (user?.getMe?.role === "ADMIN") {
    return (
      <ContestForms
        user={user}
        type={contentType}
        contestApply={{}}
        contest={contest?.findContest}
      />
    );
  }

  if (!isContestAvailable) {
    return (
      <div className="h-svh">
        <ExpiredDialog />
      </div>
    );
  }

  if (dramaOverflow) {
    return (
      <div className="h-svh">
        <DramaDialog contest={contest} />
      </div>
    );
  }

  if (dramaNotOverflow) {
    return (
      <ContestForms
        user={user}
        type={contentType}
        contestApply={{}}
        contest={contest?.findContest}
      />
    );
  }

  return (
    <div>
      {application.getApplicationByContest === null ? (
        <div>
          <ContestForms
            user={user}
            type={contentType}
            contestApply={{}}
            contest={contest?.findContest}
          />
        </div>
      ) : (
        <div>
          <ContestForms
            user={user}
            viewMode="EDIT"
            type={contentType}
            contestApply={application.getApplicationByContest}
            contest={contest?.findContest}
          />
        </div>
      )}
    </div>
  );
};

export default Contest;
