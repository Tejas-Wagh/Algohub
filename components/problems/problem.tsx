"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { CodeXml } from "lucide-react";
import { LANGUAGES_VERSIONS, testCases } from "@/lib/problems";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { createSubmission } from "@/action/createSubmission";
import { saveSubmission } from "@/action/saveSubmission";
import { getSubmission } from "@/action/getProblems";
import ProblemRenderer from "./problem-renderer";
import Submission from "../submissions/submissions";

export type codeType =
  | {
      id: string;
      createdAt: Date;
      mainCode: string;
      functionCode: string;
      language: number;
      problemId: string;
    }[]
  | undefined;

export default function Problem({
  title,
  description,
  difficulty,
  status,
  codes,
  slug,
  problemID,
  submissions,
  userId,
  userEmail,
}: {
  title: string;
  description: string;
  difficulty: string;
  status: boolean;
  codes: codeType;
  slug: string | undefined;
  problemID: string;
  submissions?: any;
  userId: string | undefined;
  userEmail: string | undefined;
}) {
  const [activeTab, setActiveTab] = useState("Problem");

  const [updatedSubmissions, setUpdatedSubmissions] = useState(
    submissions || []
  );

  async function handleSubmission(
    code: string,
    setIsSubmitting: any,
    language: string
  ) {
    if (!userEmail || !userId) {
      redirect("/sign-in");
    }

    console.log(code, language);

    setIsSubmitting(true);
    const toastID = toast.loading("Running...");

    //@ts-ignore
    const cases = testCases[slug];
    let mainCode;

    if (codes) {
      mainCode =
        codes[0]?.language === LANGUAGES_VERSIONS[language]
          ? codes[0]?.mainCode
          : codes[1]?.mainCode;
    }

    const fullCode = mainCode?.replace("####", code);
    console.log(fullCode);

    const result: any = await createSubmission(
      fullCode as string,
      LANGUAGES_VERSIONS[language] as number,
      cases.testcase1,
      cases.output1,
      cases.testcase2,
      cases.output2,
      cases.testcase3,
      cases.output3
    );
    toast.dismiss(toastID);

    console.log(result?.status);

    if (result?.status === "Accepted") {
      toast.success("Code ran Successfully");
    } else {
      toast.error("An Error Occured");
    }
    setIsSubmitting(false);

    await saveSubmission(
      userId as string, //user comes from clerk
      problemID,
      code,
      LANGUAGES_VERSIONS[language] as number,
      result.status,
      userEmail as string
    );

    const allsubmissions = await getSubmission(problemID);
    setUpdatedSubmissions(allsubmissions);
  }

  return (
    <div className="px-14 pt-24 flex flex-col gap-3">
      <div className="flex gap-2">
        <Button
          variant={activeTab === "Problem" ? `default` : `outline`}
          onClick={() => setActiveTab("Problem")}
        >
          <CodeXml /> Problem
        </Button>
        <Button
          variant={activeTab === "Submissions" ? `default` : `outline`}
          onClick={() => setActiveTab("Submissions")}
        >
          Submissions
        </Button>
      </div>
      <div className="flex-1 border-[1px] border-gray-200 shadow-md border-dotted rounded-[4px] h-[450px]">
        {activeTab === "Problem" ? (
          <ProblemRenderer
            title={title}
            difficulty={difficulty}
            description={description}
            status={status}
            handleSubmission={handleSubmission}
            codes={codes}
          />
        ) : (
          <Submission submissions={updatedSubmissions} />
        )}
      </div>
    </div>
  );
}
