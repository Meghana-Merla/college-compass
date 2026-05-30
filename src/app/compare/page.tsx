import { prisma } from "@/lib/prisma";
import CompareColleges from "@/components/college/CompareColleges";

export default async function ComparePage() {
  const colleges = await prisma.college.findMany();

  return (
    <main className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Compare Colleges
      </h1>

      <CompareColleges colleges={colleges} />
    </main>
  );
}