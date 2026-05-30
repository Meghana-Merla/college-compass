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

  const handleSave = async () => {
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
  };

  return (
    <button
      onClick={handleSave}
      disabled={saved}
      className={`mt-6 px-4 py-2 rounded-lg ${
        saved
          ? "bg-green-600"
          : "bg-red-500"
      }`}
    >
      {saved
        ? "✅ Saved"
        : "❤️ Save College"}
    </button>
  );
}