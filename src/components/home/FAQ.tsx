"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How are college rankings determined?",
    answer:
      "College rankings are based on official NIRF rankings along with institutional data available in our database.",
  },
  {
    question: "Can I compare multiple colleges?",
    answer:
      "Yes. Use the Compare page to compare two colleges side-by-side with an AI-generated summary.",
  },
  {
    question: "How does the AI chatbot work?",
    answer:
      "Our AI chatbot uses Google's Gemini API together with the College Compass database to answer questions about colleges, fees, placements, rankings, and more.",
  },
  {
    question: "Can I save my favourite colleges?",
    answer:
      "Yes. After logging in, you can save colleges and access them anytime from the Saved Colleges page.",
  },
  {
    question: "Is the information regularly updated?",
    answer:
      "The platform uses curated college data. AI responses are generated based on the available information in the database.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold text-center mb-3">
        Frequently Asked Questions
      </h2>

      <p className="text-zinc-400 text-center mb-12">
        Everything you need to know about College Compass.
      </p>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
          >
            <button
              onClick={() =>
                setOpen(open === index ? null : index)
              }
              className="w-full flex justify-between items-center px-6 py-5 text-left"
            >
              <span className="font-semibold text-lg">
                {faq.question}
              </span>

              <span className="text-2xl">
                {open === index ? "−" : "+"}
              </span>
            </button>

            {open === index && (
              <div className="px-6 pb-5 text-zinc-400 leading-7">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}