import CollegeList from "@/components/college/CollegeList";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const colleges = await prisma.college.findMany();

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8">
        College Compass
      </h1>

      <Link
        href="/compare"
        className="inline-block mb-8 bg-blue-600 px-4 py-2 rounded-lg"
      >
        Compare Colleges
      </Link>

      <CollegeList colleges={colleges} />
    </main>
  );
}