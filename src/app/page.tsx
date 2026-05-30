import CollegeList from "@/components/college/CollegeList";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const colleges = await prisma.college.findMany();

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8">
        College Compass
      </h1>

      <CollegeList colleges={colleges} />
    </main>
  );
}