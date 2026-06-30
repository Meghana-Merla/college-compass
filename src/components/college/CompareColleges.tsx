"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { College } from "@/types/college";
import remarkGfm from "remark-gfm";
import { useEffect } from "react";

interface Props {
  colleges: College[];
}

export default function CompareColleges({
  colleges,
}: Props) {
  const [college1Id, setCollege1Id] =
    useState("");

  const [college2Id, setCollege2Id] =
    useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    setAiSummary("");
  }, [college1Id, college2Id]);

  const [aiSummary, setAiSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const college1 = colleges.find(
    (college) => college.id === college1Id
  );

  const college2 = colleges.find(
    (college) => college.id === college2Id
  );

  async function generateSummary() {
    if (!college1 || !college2) return;

    setLoading(true);

    try {
      const res = await fetch("/api/ai/compare", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          college1,
          college2,
        }),
      });

      const data = await res.json();

      setAiSummary(data.response);
    } catch {
      setAiSummary("Failed to generate AI summary.");
    }

    setLoading(false);
  }

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <select
          value={college1Id}
          onChange={(e) =>
            setCollege1Id(e.target.value)
          }
          className="
              w-full
              p-4
              rounded-xl
              bg-zinc-900
              text-white
              border
              border-zinc-700
              outline-none
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-500/20
              transition-all
            "
        >
          <option value="">
            Select College 1
          </option>

          {colleges.map((college) => (
            <option
              key={college.id}
              value={college.id}
            >
              {college.name}
            </option>
          ))}
        </select>

        <select
          value={college2Id}
          onChange={(e) =>
            setCollege2Id(e.target.value)
          }
          className="
              w-full
              p-4
              rounded-xl
              bg-zinc-900
              text-white
              border
              border-zinc-700
              outline-none
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-500/20
              transition-all
            "
        >
          <option value="">
            Select College 2
          </option>

          {colleges
            .filter(
              (college) =>
                college.id !== college1Id
            )
            .map((college) => (
              <option
                key={college.id}
                value={college.id}
              >
                {college.name}
              </option>
            ))}
        </select>
      </div>

      {college1 && college2 && (
        <>
            <div className="grid lg:grid-cols-2 gap-8">

              <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-8">
                <h2 className="text-3xl font-bold mb-4">
                  {college1.name}
                </h2>

                <div className="space-y-3">
                  <p>
                    📍 {college1.city}, {college1.state}
                  </p>

                  <p>
                    🏛️ {college1.type}
                  </p>

                  <p>
                    ⭐ {college1.rating ?? "N/A"}
                  </p>

                  <p>
                    🏆 NIRF Rank:{" "}
                    {college1.nirfRank ?? "N/A"}
                  </p>

                  <p>
                    💰{" "}
                    {college1.fees
                      ? `₹${college1.fees.toLocaleString()}`
                      : "N/A"}
                  </p>

                  <p>
                    📈{" "}
                    {college1.averagePackage
                      ? `${college1.averagePackage} LPA`
                      : "N/A"}
                  </p>
                </div>
              </div>

              <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-8">
                <h2 className="text-3xl font-bold mb-4">
                  {college2.name}
                </h2>

                <div className="space-y-3">
                  <p>
                    📍 {college2.city}, {college2.state}
                  </p>

                  <p>
                    🏛️ {college2.type}
                  </p>

                  <p>
                    ⭐ {college2.rating ?? "N/A"}
                  </p>

                  <p>
                    🏆 NIRF Rank:{" "}
                    {college2.nirfRank ?? "N/A"}
                  </p>

                  <p>
                    💰{" "}
                    {college2.fees
                      ? `₹${college2.fees.toLocaleString()}`
                      : "N/A"}
                  </p>

                  <p>
                    📈{" "}
                    {college2.averagePackage
                      ? `${college2.averagePackage} LPA`
                      : "N/A"}
                  </p>
                </div>
              </div>

                    </div>

            <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 transition-all duration-300">

              <div className="flex items-center justify-between mb-6">

                {(loading || aiSummary) && (
                  <h2 className="text-2xl font-bold">
                    🤖 AI Insights
                  </h2>
                )}

                <div className="flex items-center gap-3">

                  {aiSummary && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(aiSummary);
                        setCopied(true);

                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="rounded-xl bg-zinc-800 px-4 py-3 text-white hover:bg-zinc-700"
                    >
                      {copied ? "✅ Copied" : "📋 Copy"}
                    </button>
                  )}

                  <button
                    onClick={generateSummary}
                    disabled={!college1 || !college2 || loading}
                    className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Generating...
                      </div>
                    ) : (
                      "✨ Generate AI Summary"
                    )}
                  </button>

                </div>

              </div>

              {aiSummary && (
                
                <div className="prose prose-invert max-w-none overflow-x-auto">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {aiSummary}
                  </ReactMarkdown>
                  <div className="mt-6 rounded-xl bg-green-600/20 border border-green-500 px-4 py-3 text-green-300">
                  ⭐ AI Recommendation generated using Gemini AI
                  </div>
                </div>
              )}

            </div>
            
          </>
      )}
    </div>
  );
}