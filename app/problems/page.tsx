import React from "react";
import { getProblems } from "@/action/getProblems";
import ProblemCard from "@/components/problems/problem-tile";


const page = async () => {
  const problems = await getProblems();

  return (
    <section className="w-screen h-screen">
      <div className="px-20 pt-28">
        <div>
          <h2 className="text-4xl">Problems</h2>
          <p className="text-base">
            Sharpen Your Skills with Diverse Challenges
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-10">
          {problems?.map((problem) => (
            <ProblemCard
              key={problem.id}
              slug={problem.slug}
              title={problem.title}
              description={problem.description}
              likes={(problem?.likes).toString()}
              difficulty={problem.difficulty}
              submissions={(problem?.Submission?.length).toString()}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;
