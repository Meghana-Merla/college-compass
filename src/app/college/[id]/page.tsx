import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import SaveCollegeButton from "@/components/college/SaveCollegeButton";
import AddReviewForm from "@/components/college/AddReviewForm";
import DeleteReviewButton from "@/components/college/DeleteReviewButton";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function CollegeDetailPage({
  params,
}: Props) {
  const { id } = await params;

  const college = await prisma.college.findUnique({
    where: {
      id,
    },
    include: {
      reviews: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!college) {
    notFound();
  }

  const similarColleges = await prisma.college.findMany({
    where: {
      id: {
        not: college.id,
      },
      type: college.type,
    },
    take: 3,
  });

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let currentUserId: string | null = null;

  if (token) {
    const payload = verifyToken(token) as {
      userId: string;
    } | null;

    if (payload) {
      currentUserId = payload.userId;
    }
  }

  const existingReview =
    college.reviews.find(
      (review) => review.user.id === currentUserId
    ) ?? null;

  const totalReviews = college.reviews.length;

  const averageUserRating =
    totalReviews > 0
      ? college.reviews.reduce(
          (sum, review) => sum + review.rating,
          0
        ) / totalReviews
      : null;

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <Link
        href="/"
        className="inline-block mb-8 text-blue-400 hover:underline"
      >
        ← Back to Colleges
      </Link>

      <div
        className="
          backdrop-blur-xl
          bg-white/5
          border border-white/10
          rounded-3xl
          p-8
          shadow-2xl
        "
      >
        <h1 className="text-5xl font-bold mb-6">
          {college.name}
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mb-8">

          <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
            <p className="text-zinc-400 mb-2">
              Location
            </p>

            <p className="text-xl font-semibold">
              📍 {college.city}, {college.state}
            </p>
          </div>

          <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
            <p className="text-zinc-400 mb-2">
              Official Rating
            </p>

            <p className="text-xl font-semibold">
              ⭐ {college.rating?.toFixed(1) ?? "N/A"} / 10
            </p>
          </div>

          <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
            <p className="text-zinc-400 mb-2">
              User Rating
            </p>

            <p className="text-xl font-semibold">
              ⭐{" "}
              {averageUserRating
                ? averageUserRating.toFixed(1)
                : "No Ratings Yet"}{" "}
              {averageUserRating && "/ 10"}
            </p>

            <p className="text-sm text-zinc-400 mt-2">
              {totalReviews} Review
              {totalReviews !== 1 && "s"}
            </p>
          </div>

          <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
            <p className="text-zinc-400 mb-2">
              Fees
            </p>

            <p className="text-xl font-semibold">
              💰{" "}
              {college.fees
                ? `₹${college.fees.toLocaleString()}`
                : "N/A"}
            </p>
          </div>

          <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
            <p className="text-zinc-400 mb-2">
              Average Package
            </p>

            <p className="text-xl font-semibold">
              📈{" "}
              {college.averagePackage
                ? `${college.averagePackage} LPA`
                : "N/A"}
            </p>
          </div>

          <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
            <p className="text-zinc-400 mb-2">
              Type
            </p>

            <p className="text-xl font-semibold">
              🏛️ {college.type}
            </p>
          </div>

          <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
            <p className="text-zinc-400 mb-2">
              NIRF Rank
            </p>

            <p className="text-xl font-semibold">
              🏆 {college.nirfRank ?? "N/A"}
            </p>
          </div>

        </div>

        <div className="flex flex-wrap gap-4 mt-8 mb-8">

          <SaveCollegeButton collegeId={college.id} />

          <a
            href={`https://www.google.com/maps/search/${encodeURIComponent(
              `${college.name} ${college.city}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              items-center
              justify-center
              rounded-xl
              bg-blue-600
              px-5
              py-3
              font-medium
              text-white
              hover:bg-blue-700
              transition
            "
          >
            📍 View on Google Maps
          </a>

          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(
              college.name
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              items-center
              justify-center
              rounded-xl
              bg-blue-600
              px-5
              py-3
              font-medium
              text-white
              hover:bg-blue-700
              transition
            "
          >
            🔍 Search on Google
          </a>

        </div>
        <AddReviewForm
          collegeId={college.id}
          existingReview={existingReview}
        />        
        <div className="mt-10">
          <h2 className="text-3xl font-bold mb-6">
            Student Reviews
          </h2>

          {college.reviews.length === 0 ? (
            <p className="text-zinc-400">
              No reviews yet.
            </p>
          ) : (
            <div className="space-y-4">
              {college.reviews.map((review) => (
                <div
                  key={review.id}
                  className="
                    bg-white/5
                    border
                    border-white/10
                    rounded-2xl
                    p-5
                  "
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-lg">
                      {review.user.name}
                    </h3>

                    <span className="text-yellow-400">
                      ⭐ {review.rating.toFixed(1)}/10
                    </span>
                  </div>

                  <p className="text-zinc-300 mb-3">
                    {review.comment}
                  </p>

                  {review.user.id === currentUserId && (
                    <DeleteReviewButton reviewId={review.id} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">
            Similar Colleges
          </h2>

          {similarColleges.length === 0 ? (
            <p className="text-zinc-400">
              No similar colleges found.
            </p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {similarColleges.map((item) => (
                <Link
                  key={item.id}
                  href={`/college/${item.id}`}
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    p-5
                    hover:bg-white/10
                    transition
                  "
                >
                  <h3 className="text-xl font-semibold mb-3">
                    {item.name}
                  </h3>

                  <p className="text-zinc-400">
                    📍 {item.city}, {item.state}
                  </p>

                  <p className="mt-2">
                    ⭐ {item.rating ?? "N/A"}
                  </p>

                  <p>
                    💰{" "}
                    {item.fees
                      ? `₹${item.fees.toLocaleString()}`
                      : "N/A"}
                  </p>

                  <p className="mt-4 text-blue-400 font-medium">
                    View Details →
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}