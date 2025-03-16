"use client";

import { useState } from "react";
import { analyzeCode } from "../utils/eslintRunner";

export default function Home() {
  const [code, setCode] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    const results = analyzeCode(code);
    setSuggestions(results);
  };

  const handleAiAnalyze = async () => {
    setLoading(true);
    setAiSuggestions(["Fetching AI suggestions..."]);

    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();
    setAiSuggestions(data.suggestions);
    setLoading(false);
  };

  const getSuggestionStyle = (suggestion: string) => {
    if (suggestion.includes("[Readability]")) return "text-green-600";
    if (suggestion.includes("[Best Practice]")) return "text-blue-600";
    if (suggestion.includes("[Security]")) return "text-red-600";
    if (suggestion.includes("[Performance]")) return "text-orange-600";
    return "text-gray-700"; //Default color
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">CodeInsight</h1>
      <textarea
        className="w-full max-w-2xl h-48 p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Paste your JavaScript Code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <div className="flex gap-4">
        <button
          className="mt-4 p-3 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleAnalyze}
        >
          Analyze with ESLint
        </button>
        <button
          className="mt-4 p-3 px-6 bg-green-500 text-white rounded-md hover:bg-green-600"
          onClick={handleAiAnalyze}
        >
          Analyze with AI
        </button>
      </div>

      {suggestions.length > 0 && (
        <div className="mt-4 bg-white p-4 rounded-md shadow-md w-full max-w-2xl">
          <h2 className="text-xl font-bold mb-2">ESLint Suggestions:</h2>
          <ul className="list-disc pl-4">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="text-red-600">{suggestion}</li>
            ))}
          </ul>
        </div>
      )}

      {aiSuggestions.length > 0 && (
        <div className="mt-4 bg-white p-4 rounded-md shadow-md w-full max-w-2xl">
          <h2 className="text-xl font-bold mb-2">AI Suggestions:</h2>
          <ul className="pl-4">
            {aiSuggestions.map((suggestion, index) => (
              <li key={index} className={getSuggestionStyle(suggestion)}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}

      {loading && <p className="mt-4 text-gray-600">AI is analyzing your code...</p>}
    </div>
  );
}
