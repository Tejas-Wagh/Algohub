import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ChevronLeft, Clock4, ThumbsUp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

type props = {
  title: string;
  description: string;
  submissions: string;
  likes: string;
  slug: string;
  difficulty: string;
};

const ProblemCard = ({
  title,
  description,
  submissions,
  likes,
  difficulty,
  slug,
}: props) => {
  const formattedDescription = description.slice(0, 30);

  return (
    <div className="border-[1.2px] border-gray-200 rounded-md space-y-4 max-w-[480px] h-[160px]  p-4 shadow-md backdrop-blur-2xl backdrop:bg-gray-500">
      <div className="flex flex-row justify-between">
        <h3 className="font-semibold">{title}</h3>

        <div className="flex items-center justify-center text-black dark:text-white">
          <Badge
            className={`w-full h-6 p-2 rounded-[4px] ${
              difficulty === "EASY"
                ? "bg-linear-to-br from-transparent dark:from-white  to-green-100 dark:to-green-300 "
                : difficulty === "MEDIUM"
                ? "bg-gradient-to-br from-transparent dark:from-white to-amber-200 dark:to-amber-300"
                : "bg-gradient-to-br from-transparent dark:from-white to-rose-300 dark:to-rose-300"
            }`}
            variant={"outline"}
          >
            <span className="text-black">{difficulty}</span>
          </Badge>
        </div>
      </div>
      <div className="text-wrap">
        <p>{formattedDescription + "..."}</p>
      </div>
      <div className="mt-8">
        <div className="flex flex-row justify-between px-1">
          <Button asChild={true} size={"sm"}>
            <Link href={`/problem/${slug}`}>
              Solve{" "}
              <div className="flex items-center justify-center">
                <ChevronLeft className="rotate-180" size={10} />
              </div>
            </Link>
          </Button>

          <div className="flex gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge className="bg-gray-100 text-gray-700 px-2 py-1">
                    <div className="flex flex-row gap-1">
                      <div className="flex items-center justify-center">
                        <Clock4 size={14} />
                      </div>
                      <p className="flex items-center justify-center">
                        {submissions}
                      </p>
                    </div>
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Submissions</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge className="bg-gray-100 text-gray-700 px-2 py-1">
                    <div className="flex flex-row gap-1">
                      <div className="flex items-center justify-center">
                        <ThumbsUp size={14} />
                      </div>
                      <p className="flex items-center justify-center">
                        {likes}
                      </p>
                    </div>
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Likes</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemCard;
