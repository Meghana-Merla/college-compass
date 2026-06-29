"use client";

import { useRouter } from "next/navigation";

interface Props {
  reviewId: string;
}

export default function DeleteReviewButton({
  reviewId,
}: Props) {
  const router = useRouter();

  async function handleDelete() {
    const ok = confirm(
      "Are you sure you want to delete this review?"
    );

    if (!ok) return;

    const res = await fetch(`/api/reviews/${reviewId}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    alert("Review deleted successfully!");

    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="
        text-red-500
        hover:text-red-400
        text-sm
        font-semibold
      "
    >
      🗑 Delete
    </button>
  );
}