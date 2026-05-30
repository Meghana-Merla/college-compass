import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import SaveCollegeButton from "@/components/college/SaveCollegeButton";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function CollegeDetailPage({
  params,
}: Props) {
  const { id } = await params;

  const college =
    await prisma.college.findUnique({
      where: {
        id,
      },
    });

  if (!college) {
    notFound();
  }

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
              📍 {college.location}
            </p>
          </div>

          <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
            <p className="text-zinc-400 mb-2">
              Rating
            </p>

            <p className="text-xl font-semibold">
              ⭐ {college.rating}
            </p>
          </div>

          <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
            <p className="text-zinc-400 mb-2">
              Fees
            </p>

            <p className="text-xl font-semibold">
              💰 ₹
              {college.fees.toLocaleString()}
            </p>
          </div>

          <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
            <p className="text-zinc-400 mb-2">
              Placement Package
            </p>

            <p className="text-xl font-semibold">
              📈 ₹
              {college.placements.toLocaleString()}
            </p>
          </div>

        </div>

        <SaveCollegeButton
          collegeId={college.id}
        />
      </div>

    </main>
  );
}