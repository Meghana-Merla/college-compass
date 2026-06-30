"use client";

import { useState } from "react";

interface Props {
  collegeId: string;
  initialSaved: boolean;
}

export default function SaveCollegeButton({
  collegeId,
  initialSaved,
}: Props) {
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);

    const res = await fetch("/api/saved-colleges", {
      method: saved ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        collegeId,
      }),
    });

    if (res.ok) {
      setSaved(!saved);
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`
        px-6
        py-3
        rounded-xl
        font-semibold
        transition-all
        duration-300
        ${
          saved
            ? "bg-green-600 hover:bg-red-600"
            : "bg-gradient-to-r from-red-500 to-pink-500 hover:scale-105"
        }
      `}
    >
      {loading
        ? "Please wait..."
        : saved
        ? "🗑 Unsave College"
        : "❤️ Save College"}
    </button>
  );
}