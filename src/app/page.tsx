import CollegeList from "@/components/college/CollegeList";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const colleges = await prisma.college.findMany();

  return (
    <main>
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 blur-3xl" />

        <div className="relative max-w-6xl mx-auto text-center px-6">
          <h1 className="text-6xl font-bold mb-6">
            Find Your Perfect College
          </h1>

          <p className="text-xl text-zinc-400 mb-6">
            Compare colleges, explore placements,
            fees, ratings and save your favorites.
          </p>

          <div className="flex justify-center gap-4">
            <a
              href="#colleges"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
            >
              Explore Colleges
            </a>

            <Link
              href="/compare"
              className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition"
            >
              Compare Colleges
            </Link>
          </div>

          <div className="flex justify-center gap-12 mt-10 text-center">
            <div>
              <h3 className="text-3xl font-bold">1000+</h3>
              <p className="text-zinc-400">
                Colleges
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">95%</h3>
              <p className="text-zinc-400">
                Placement Data
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">
                4.8★
              </h3>
              <p className="text-zinc-400">
                Top Ratings
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="colleges"
        className="max-w-6xl mx-auto px-6 pb-10"
      >
        <CollegeList colleges={colleges} />
      </section>
    </main>
  );
}