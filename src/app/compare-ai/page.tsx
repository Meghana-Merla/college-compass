"use client";

import { useState } from "react";

export default function CompareAIPage() {
  const [college1, setCollege1] = useState("");
  const [college2, setCollege2] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function compare() {
    setLoading(true);

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

    setAnswer(data.response);

    setLoading(false);
  }

  return (
    <div className="max-w-5xl mx-auto p-10">

      <h1 className="text-4xl font-bold mb-8">
        🤖 AI College Comparison
      </h1>

      <input
        className="border rounded p-3 w-full mb-4"
        placeholder="First College"
        value={college1}
        onChange={(e) => setCollege1(e.target.value)}
      />

      <input
        className="border rounded p-3 w-full mb-4"
        placeholder="Second College"
        value={college2}
        onChange={(e) => setCollege2(e.target.value)}
      />

      <button
        onClick={compare}
        className="bg-blue-600 text-white px-6 py-3 rounded"
      >
        {loading ? "Comparing..." : "Compare"}
      </button>

      <div className="mt-8 border rounded p-6 whitespace-pre-wrap">
        {answer}
      </div>

    </div>
  );
}