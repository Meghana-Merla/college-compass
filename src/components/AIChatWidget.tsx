"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    {
        role: "user" | "assistant";
        content: string;
    }[]
    >([]);
  const [loading, setLoading] = useState(false);
    useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function sendPrompt(prompt: string) {
    setLoading(true);

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: prompt,
      },
    ]);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: prompt,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry! Something went wrong.",
        },
      ]);
    }

    setLoading(false);
  }

  async function send() {
    if (!message.trim()) return;

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry! Something went wrong.",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-2xl text-2xl hover:scale-110 transition-all duration-300 z-50"
      >
        🤖
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 w-[420px] h-[600px] bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl flex flex-col z-50">
 
          <div className="p-4 border-b border-zinc-700 flex items-center justify-between">

            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                  🤖
                </div>

                <div>
                  <h2 className="font-bold text-white">
                    College Compass AI
                  </h2>

                  <p className="text-xs text-green-400">
                    ● Online
                  </p>
                </div>
              </div>

            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMessages([])}
                className="text-xs text-red-400 hover:text-red-300"
              >
                Clear
              </button>

              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-white text-lg"
              >
                ✕
              </button>
            </div>

          </div>

          <div className="p-4 flex-1 overflow-hidden flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">

            <button
            onClick={() => sendPrompt("Best colleges for CSE")}
            className="text-xs bg-zinc-800 px-2 py-1 rounded">
            🎓 Best CSE
            </button>

            <button
            onClick={() => sendPrompt("Suggest colleges under ₹3 lakh")}
            className="text-xs bg-zinc-800 px-2 py-1 rounded">                          
            💰 Under ₹3L
            </button>

            <button
            onClick={() => sendPrompt("Highest placement college")}
            className="text-xs bg-zinc-800 px-2 py-1 rounded">
            📈 Placements
            </button>

            </div>

            <div className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 p-2">

              <input
                className="flex-1 bg-transparent px-2 py-2 text-white placeholder:text-gray-400 outline-none"
                placeholder="Ask about colleges, placements, fees..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    send();
                  }
                }}
              />

              <button
                onClick={send}
                disabled={loading}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                ➤
              </button>

            </div>

            <div className="flex-1 overflow-y-auto rounded-lg border border-zinc-700 p-3 space-y-3">

              {messages.length === 0 && (
                <div className="text-center text-gray-400 text-sm py-6">

                  🤖 Hi! I'm <span className="font-semibold">College Compass AI</span>

                  <br />

                  Ask about colleges, placements, fees or compare two colleges..

                  <div className="mt-6 flex flex-col gap-2">

                    <button
                      onClick={() => sendPrompt("Suggest colleges under ₹3 lakh")}
                      className="rounded-lg bg-zinc-800 p-2 text-left text-sm hover:bg-zinc-700"
                    >
                      💰 Suggest colleges under ₹3 lakh
                    </button>

                    <button
                      onClick={() => sendPrompt("Compare IIT Bombay and IIT Delhi")}
                      className="rounded-lg bg-zinc-800 p-2 text-left text-sm hover:bg-zinc-700"
                    >
                      ⚖️ Compare IIT Bombay and IIT Delhi
                    </button>

                    <button
                      onClick={() => sendPrompt("Which college has the highest average package?")}
                      className="rounded-lg bg-zinc-800 p-2 text-left text-sm hover:bg-zinc-700"
                    >
                      📈 Highest placement college
                    </button>

                  </div>

                </div>
              )}

              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-end gap-2 ${
                    msg.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm flex-shrink-0">
                      🤖
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-zinc-800 text-white"
                    }`}
                  >
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-sm flex-shrink-0">
                      👤
                    </div>
                  )}
                </div>
              ))}

              
                  {loading && (
                    <div className="flex items-end gap-2">

                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm">
                        🤖
                      </div>

                      <div className="rounded-2xl bg-zinc-800 px-4 py-3 text-white">
                        <span className="animate-pulse">Thinking...</span>
                      </div>

                    </div>
                  )}
                

              <div ref={bottomRef}></div>

            </div>

          </div>
        </div>
      )}
    </>
  );
}