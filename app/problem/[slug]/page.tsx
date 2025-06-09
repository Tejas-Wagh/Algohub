import { getDefaultCodes, getProblem } from "@/action/getProblems";
import Problem from "@/components/problems/problem";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

interface SubmissionType {
  id: string;
  createdAt: Date;
  problemId: string;
  code: string;
  status: string;
  languageID: number;
  userName: string;
}

function submissionByUser(
  submissions: SubmissionType[] | undefined,
  userName: string
) {
  const submission = submissions?.find(
    (submission) => submission.userName === userName
  );
  return submission;
}

export type paramsType = Promise<{ slug: string }>;

const Page = async (props: { params: paramsType }) => {
  const { slug } = await props.params;
  const user = await currentUser();
  const userId = user?.id;
  const userEmail = user?.emailAddresses[0].emailAddress;

  const problem = await getProblem(slug);
  const codes = await getDefaultCodes(problem?.id);
  let status: boolean | undefined = false;

  if (userEmail && submissionByUser(problem?.Submission, userEmail)) {
    status = true;
  }

  return (
    <Problem
      title={problem?.title as string}
      description={problem?.description as string}
      difficulty={problem?.difficulty as string}
      status={status}
      codes={codes}
      slug={problem?.slug as string}
      submissions={problem?.Submission}
      problemID={problem?.id as string}
      userId={userId}
      userEmail={userEmail}
    />
  );
};

export default Page;
