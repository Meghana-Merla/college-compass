"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!message.trim()) return;

    setLoading(true);

    const res = await fetch("/api/ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    });

    const data = await res.json();

    setAnswer(data.response);
    setLoading(false);
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full w-16 h-16 shadow-xl text-2xl z-50"
      >
        🤖
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 w-[420px] h-[600px] bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl flex flex-col z-50">
 
          <div className="p-4 border-b border-zinc-700 font-bold">
            🤖 College Compass AI
          </div>

          <div className="p-4 flex-1 overflow-hidden flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">

            <button
            onClick={()=>setMessage("Best colleges for CSE")}
            className="text-xs bg-zinc-800 px-2 py-1 rounded">
            Best CSE
            </button>

            <button
            onClick={()=>setMessage("Suggest colleges under 3 lakh")}
            className="text-xs bg-zinc-800 px-2 py-1 rounded">                          
            Under ₹3L
            </button>

            <button
            onClick={()=>setMessage("Highest placement college")}
            className="text-xs bg-zinc-800 px-2 py-1 rounded">
            Placements
            </button>

            </div>

            <input
              className="w-full border rounded p-2 bg-zinc-800"
              placeholder="Ask anything..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button
              onClick={send}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {loading ? "Thinking..." : "Send"}
            </button>

            <div className="mt-4 h-80 overflow-y-auto rounded-lg border border-zinc-700 p-3">
                <div className="prose prose-invert max-w-none text-sm">
                    <ReactMarkdown>{answer}</ReactMarkdown>
                </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}