"use server";
import prisma from "@/lib/db";

export async function getProblems() {
  try {
    const problems = await prisma.problem.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        slug: true,
        likes: true,
        solved: true,
        difficulty: true,
        Submission: true,
      },
    });
    return problems;
  } catch (error) {
    console.log(error);
  }
}

export async function getProblem(slug: string) {
  try {
    const problem = await prisma.problem.findFirst({
      where: {
        slug: slug,
      },
      select: {
        description: true,
        createdAt: true,
        difficulty: true,
        id: true,
        slug: true,
        title: true,
        Submission: {
          select: {
            id: true,
            createdAt: true,
            problemId: true,
            code: true,
            status: true,
            languageID: true,
            userName: true,
          },
        },
      },
    });
    return problem;
  } catch (error) {
    console.log(error);
  }
}

export async function getDefaultCodes(id: string | undefined) {
  try {
    const defaultCodes = await prisma.defaultCode.findMany({
      where: {
        problemId: id,
      },
    });
    return defaultCodes;
  } catch (error) {
    console.log(error);
  }
}

export async function getSubmission(problemID: string) {
  const res = await prisma.submission.findMany({
    where: {
      problemId: problemID,
    },
    select: {
      code: true,
      createdAt: true,
      languageID: true,
      id: true,
      problemId: true,
      status: true,
      userName: true,
    },
  });

  return res;
}
