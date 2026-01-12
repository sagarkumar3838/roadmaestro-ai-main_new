import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

type RunResult = {
  stdout?: string | null;
  stderr?: string | null;
  compile_output?: string | null;
  message?: string | null;
  status?: { id: number; description: string };
};

type CodeEditorProps = {
  initialCode?: string;
};

export default function CodeEditor({ initialCode }: CodeEditorProps) {
  const [code, setCode] = useState(
    initialCode ?? "// Write your code here...\nconsole.log('Hello, World!')"
  );
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const apiKey = import.meta.env.VITE_RAPIDAPI_KEY as string | undefined;


  const runCode = async () => {
    if (!apiKey) {
      setOutput("Error: Missing VITE_RAPIDAPI_KEY in .env");
      return;
    }
    setIsRunning(true);
    setOutput("Running...");
    try {
      const { data } = await axios.post<RunResult>(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        {
          source_code: code,
          language_id: 63,
        },
        {
          headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            "Content-Type": "application/json",
          },
        }
      );

      
  console.log('RapidAPI key present:', Boolean(import.meta.env.VITE_RAPIDAPI_KEY));

      const combined =
        (data.stdout ?? "") + (data.stderr ?? "") + (data.compile_output ?? "") ||
        data.message ||
        "No output";
      setOutput(combined);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setOutput("Error: " + message);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="p-4">
      <Editor
        height="50vh"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={code}
        onChange={(val) => setCode(val ?? "")}
      />

      <button
        onClick={runCode}
        disabled={isRunning}
        className="mt-4 px-4 py-2 bg-blue-600 disabled:opacity-60 text-white rounded-lg"
      >
        {isRunning ? "Running..." : "Run Code"}
      </button>

      <div className="mt-4 bg-gray-900 text-green-400 p-3 rounded-lg">
        <pre>{output}</pre>
      </div>
    </div>
  );
}


