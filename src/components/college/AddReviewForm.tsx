"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Review {
  id: string;
  rating: number;
  comment: string;
}

interface Props {
  collegeId: string;
  existingReview: Review | null;
}

export default function AddReviewForm({
  collegeId,
  existingReview,
}: Props) {
  const router = useRouter();
  const [rating, setRating] = useState(
    existingReview?.rating ?? 8
  );
  const [comment, setComment] = useState(
    existingReview?.comment ?? ""
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  if (existingReview) {
    setRating(existingReview.rating);
    setComment(existingReview.comment);
  } else {
    
  }
}, [existingReview]);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          comment,
          collegeId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      alert(
        existingReview
          ? "Review updated successfully!"
          : "Review added successfully!"
      );

      setRating(5);
      setComment("");

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        mt-10
        backdrop-blur-lg
        bg-white/5
        border border-white/10
        rounded-3xl
        p-8
      "
    >
      <h2 className="text-3xl font-bold mb-6">
        Add Review
      </h2>

      <div className="mb-6">
        <label className="block text-lg font-semibold mb-3">
          Rating: ⭐ {rating.toFixed(1)} / 10
        </label>

        <input
          type="range"
          min="0"
          max="10"
          step="0.5"
          value={rating}
          onChange={(e) =>
            setRating(Number(e.target.value))
          }
          className="w-full accent-blue-600 cursor-pointer"
        />

        <div className="flex justify-between text-sm text-zinc-400 mt-2">
          <span>0</span>
          <span>5</span>
          <span>10</span>
        </div>
      </div>

      <div className="mb-6">
        <label className="block mb-2">
          Comment
        </label>

        <textarea
          rows={5}
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
          required
          className="
            w-full
            p-3
            rounded-xl
            bg-zinc-900
            border border-zinc-700
          "
        />
      </div>

      <button
        disabled={loading}
        className="
          px-6
          py-3
          rounded-xl
          bg-blue-600
          hover:bg-blue-700
          disabled:opacity-50
        "
      >
        {loading
          ? "Saving..."
          : existingReview
          ? "Update Review"
          : "Submit Review"}
      </button>
    </form>
  );
}