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

  const college = await prisma.college.findUnique({
    where: {
      id,
    },
  });

  if (!college) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto p-8">
        <Link
        href="/"
        className="inline-block mb-8 text-blue-400 hover:underline"
        >
        ← Back to Colleges
        </Link>

      <h1 className="text-4xl font-bold mb-6">
        {college.name}
      </h1>


      <div className="space-y-4">
        <p>
          📍 Location: {college.location}
        </p>

        <p>
          ⭐ Rating: {college.rating}
        </p>

        <p>
          💰 Fees: ₹{college.fees.toLocaleString()}
        </p>

        <p>
          📈 Placements: ₹
          {college.placements.toLocaleString()}
        </p>

        <SaveCollegeButton
          collegeId={college.id}
        />
      </div>
    </main>
  );
}