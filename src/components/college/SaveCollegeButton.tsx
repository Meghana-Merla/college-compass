"use client";

import { useState } from "react";

interface Props {
  collegeId: string;
}

export default function SaveCollegeButton({
  collegeId,
}: Props) {
  const [saved, setSaved] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const handleSave = async () => {
    setLoading(true);

    const res = await fetch(
      "/api/saved-colleges",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          collegeId,
        }),
      }
    );

    if (res.ok) {
      setSaved(true);
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleSave}
      disabled={saved || loading}
      className={`
        px-6
        py-3
        rounded-xl
        font-semibold
        transition-all
        duration-300
        ${
          saved
            ? "bg-green-600"
            : "bg-gradient-to-r from-red-500 to-pink-500 hover:scale-105"
        }
      `}
    >
      {loading
        ? "Saving..."
        : saved
        ? "✅ Saved"
        : "❤️ Save College"}
    </button>
  );
}