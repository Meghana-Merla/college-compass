"use client";

import { useState } from "react";

export default function RecommendPage() {
  const [state, setState] = useState("");
  const [budget, setBudget] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");

  async function handleSubmit() {
    setLoading(true);

    const res = await fetch("/api/ai/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        state,
        budget,
        type,
      }),
    });

    const data = await res.json();

    setAnswer(data.response);

    setLoading(false);
  }

  return (
    <div className="max-w-4xl mx-auto p-10">

      <h1 className="text-4xl font-bold mb-8">
        🤖 AI College Recommendation
      </h1>

      <div className="space-y-4">

        <input
          className="border p-3 rounded w-full"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />

        <input
          className="border p-3 rounded w-full"
          placeholder="Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />

        <input
          className="border p-3 rounded w-full"
          placeholder="Type (Government / Private)"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          {loading ? "Generating..." : "Get AI Recommendation"}
        </button>

      </div>

      <div className="mt-10 whitespace-pre-wrap border rounded p-6">

        {answer}

      </div>

    </div>
  );
}