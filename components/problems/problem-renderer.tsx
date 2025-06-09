"use client";

import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import { Editor } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { codeType } from "./problem";
import { LANGUAGES, LANGUAGES_VERSIONS } from "@/lib/problems";
import { Badge } from "../ui/badge";
import { CircleCheckBig } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

export default function ProblemRenderer({
  title,
  difficulty,
  description,
  status,
  handleSubmission,
  codes,
}: {
  title: string;
  difficulty: string;
  description: string;
  status: boolean;
  handleSubmission: any;
  codes: codeType;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [language, setLanguage] = useState<string>("java");
  const editorRef = useRef<any | null>(null);
  const [code, setCode] = useState("");

  function handleEditorDidMount(editor: any) {
    if (!editorRef.current) {
      return;
    }
    editorRef.current = editor;
    editorRef.current?.focus();
  }

  useEffect(() => {
    let value;
    if (codes) {
      value =
        codes[0]?.language === LANGUAGES_VERSIONS[language]
          ? codes[0]?.functionCode
          : codes[1]?.functionCode;
    }

    setCode(value as string);
  }, [codes, language]);

  return (
    <div className="w-full flex md:flex-row flex-col py-4 px-6">
      <div className="md:w-1/2 flex flex-col space-y-4">
        <div className="flex flex-row justify-between">
          <div className={`text-xl font-bold `}>{title}</div>
          <div className="flex flex-row gap-2">
            <Badge
              variant={"outline"}
              className={`h-7 px-2 rounded-[4px] ${
                difficulty === "EASY"
                  ? "bg-linear-to-br from-transparent dark:from-white  to-green-100 dark:to-green-300"
                  : difficulty === "MEDIUM"
                  ? "bg-gradient-to-br from-transparent dark:from-white to-amber-200 dark:to-amber-300"
                  : "bg-gradient-to-br from-transparent dark:from-white to-rose-300 dark:to-rose-300"
              }`}
            >
              <div className=" text-xs dark:text-black">{difficulty}</div>
            </Badge>
            <div className="flex items-center justify-center">
              {status && (
                <div className="flex items-center justify-center text-black dark:text-white">
                  <Badge
                    className="w-full h-7 bg-linear-to-br from-transparent dark:from-white to-yellow-100 p-2"
                    variant={"outline"}
                  >
                    <CircleCheckBig className="text-black font-bold" />{" "}
                    <span className="text-black">Solved</span>
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </div>
        <Markdown remarkPlugins={[remarkGfm]}>{description.trim()}</Markdown>
      </div>
      <div className="w-1/2 px-6">
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-row justify-between">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger value={language} size="sm">
                {" "}
                <SelectValue placeholder={language} className="font-semibold" />
              </SelectTrigger>
              <SelectContent className="bg-gray-50 border">
                {LANGUAGES.map((k: string) => (
                  <SelectItem value={k} key={k}>
                    {k.charAt(0).toUpperCase() + k.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={() => handleSubmission(code, setIsSubmitting, language)}
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </div>
          <Editor
            height="60vh"
            width={535}
            language={language}
            //@ts-ignore
            onChange={(value: string) => setCode(value)}
            value={code}
            theme="vs-dark"
            onMount={handleEditorDidMount}
          />
        </div>
      </div>
    </div>
  );
}
