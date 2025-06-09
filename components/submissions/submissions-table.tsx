import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LANGUAGES_VERSIONS } from "@/lib/problems";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TableCell } from "@/components/ui/table";
import React from "react";
import { CircleCheckBig, CircleX, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Editor } from "@monaco-editor/react";
import { Badge } from "../ui/badge";

export const SubmissionsTable = ({ submissions }: { submissions: any }) => {
  return (
    <div className="w-full overflow-y-scroll">
      <Table>
        <TableHeader className="">
          <TableRow className="">
            <TableHead className=" text-[14px] text-center">Status</TableHead>
            <TableHead className=" text-[14px] text-center">Language</TableHead>
            <TableHead className=" text-[14px] text-center">Date</TableHead>
            <TableHead className="text-[14px] text-center">
              Submitted by
            </TableHead>
            <TableHead className="text-[14px] text-center">Solution</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions?.map((submission: any) => (
            <Submission
              key={submission.id}
              code={submission.code}
              language={
                Object.keys(LANGUAGES_VERSIONS).find(
                  (k) => LANGUAGES_VERSIONS[k] === submission.languageID
                ) as string
              }
              status={submission.status}
              date={submission.createdAt.toISOString().split("T")[0] as string}
              user={submission.userName}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const Submission = ({
  status,
  language,
  date,
  user,
  code,
}: {
  status: string;
  language: string;
  date: string;
  user: string;
  code: string;
}) => {
  return (
    <TableRow className="w-full">
      <TableCell
        className={`text-center flex flex-row items-center justify-center gap-1
        `}
      >
        <Badge
          variant={"outline"}
          className={`px-2 rounded-[4px] w-[80px] dark:text-black ${
            status === "Accepted"
              ? "bg-linear-to-br from-transparent dark:from-white to-green-100 dark:to-green-300"
              : "bg-linear-to-br from-transparent dark:from-white to-rose-100 dark:to-rose-300"
          }`}
        >
          {status === "Accepted" ? (
            <>
              <CircleCheckBig className="h-3 w-3" /> Accepted
            </>
          ) : (
            <>
              <CircleX className="h-3 w-3" />
              Rejected
            </>
          )}
        </Badge>
      </TableCell>

      <TableCell className="text-center">
        {language.charAt(0).toUpperCase() + language.slice(1).toLowerCase()}
      </TableCell>
      <TableCell className="text-center">
        {new Date(date).toLocaleDateString()}
      </TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-center gap-1">
          <Avatar className="h-5 w-5 flex items-center justify-center">
            <AvatarFallback className="bg-black dark:bg-gray-400 text-white dark:text-black text-xs p-1">
              {user.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>{user}</div>
        </div>
      </TableCell>
      <TableCell>
        <div className="w-full flex items-center justify-center">
          <Dialog>
            <DialogTrigger className="hover:opacity-75 cursor-pointer">
              <Eye className="h-5 w-5" />
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-bold">Submission</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                <Editor value={code} height={"60vh"} theme="vs-dark" />
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </div>
      </TableCell>
    </TableRow>
  );
};
