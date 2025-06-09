"use client";
import { Editor } from "@monaco-editor/react";
import React, { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import {
  boilerPlateCode,
  fixEncodingIssues,
  LANGUAGES,
  LANGUAGES_VERSIONS,
} from "@/constants";
import { createSubmission } from "@/action/ide-create-submission";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export default function IDE({ user }: { user?: string }) {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState<string>(boilerPlateCode[language]);
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    setCode(boilerPlateCode[language]);
  }, [language]);

  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
    //@ts-ignore
    editorRef.current.focus();
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  async function handleRunCode() {
    if (!user) {
      redirect("/sign-in");
    }
    setIsSubmitting(true);
    const toastID = toast.loading("Running...");
    const result = await createSubmission(
      code,
      input,
      LANGUAGES_VERSIONS[language]
    );
    toast.dismiss(toastID);
    if (result.status == "Accepted") {
      //@ts-ignore
      setOutput(result?.output);
      toast.success("Code ran Successfully");
    } else {
      const fixedText = fixEncodingIssues(result.description as string);
      setOutput(fixedText);
      toast.error("An Error Occured");
    }
    setIsSubmitting(false);
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row px-6 mt-12">
        <div className="flex flex-col px-5 pt-12 w-1/2 space-y-4">
          <div className="flex flex-row justify-between">
            <div>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[113px]">
                  <SelectValue
                    placeholder={language}
                    className="font-semibold"
                  />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((k: string) => (
                    <SelectItem value={k} key={k}>
                      {k.charAt(0).toUpperCase() + k.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center justify-centerrounded-md">
                <Button
                  variant={"ghost"}
                  className="cursor-pointer"
                  onClick={() => {
                    setCode("");
                    setInput("");
                    setOutput("");
                  }}
                >
                  Reset
                </Button>
              </div>

              <Button
                onClick={handleRunCode}
                className="cursor-pointer"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Running..." : "Run Code"}
              </Button>
            </div>
          </div>
          <Editor
            height="67vh"
            width="50"
            theme="vs-dark"
            language={language}
            value={code}
            //@ts-ignore
            onChange={(value: string) => setCode(value)}
            onMount={handleEditorDidMount}
            className="border border-gray-700"
          />
        </div>
        <div className="flex flex-col px-24 pt-16 w-1/2 space-y-4">
          <label>Input</label>
          <textarea
            className="text-start rounded-md border border-dashed shadow-md border-gray-300 focus:outline-none h-1/2 p-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <label>Output</label>
          <textarea
            className="border rounded-md shadow-md border-dashed border-gray-300 focus:outline-none h-1/2 p-1"
            value={output}
            disabled
          />
        </div>
      </div>
    </div>
  );
}
