import { prisma } from "@/lib/prisma";
import CompareColleges from "@/components/college/CompareColleges";

export default async function ComparePage() {
  const colleges = await prisma.college.findMany();

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">

      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">
          Compare Colleges
        </h1>

        <p className="text-zinc-400 text-lg">
          Compare fees, placements, ratings and
          make the best college decision.
        </p>
      </div>

      <CompareColleges colleges={colleges} />
    </main>
  );
}