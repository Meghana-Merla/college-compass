import CollegeList from "@/components/college/CollegeList";
import FAQ from "@/components/home/FAQ";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Features from "@/components/home/Features";
import Categories from "@/components/home/Categories";

export default async function Home() {
  const colleges = await prisma.college.findMany();

  return (
    <main>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">

        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-black to-cyan-950" />

        <div className="absolute -top-20 left-10 h-72 w-72 rounded-full bg-blue-500/20 blur-[120px]" />

        <div className="absolute top-40 right-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-6 py-16">

          <div className="grid lg:grid-cols-2 items-center gap-16">

            {/* Left */}
            <div>

              <span className="inline-flex items-center rounded-full bg-blue-500/10 border border-blue-500/30 px-5 py-2 text-blue-300 text-sm mb-8">
                🤖 AI Powered College Discovery
              </span>

              <h1 className="text-6xl lg:text-7xl font-extrabold leading-tight">
                Discover
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Your Perfect College
                </span>
              </h1>

              <p className="mt-8 text-xl text-zinc-400 leading-9 max-w-xl">
                Search, compare and explore India's best colleges using
                placements, fees, rankings and AI-powered insights.
              </p>

              <div className="mt-10 flex gap-5">

                <a
                  href="#colleges"
                  className="rounded-xl bg-blue-600 px-7 py-4 font-semibold hover:bg-blue-700 transition"
                >
                  Explore Colleges →
                </a>

                <Link
                  href="/compare"
                  className="rounded-xl border border-white/20 px-7 py-4 hover:bg-white/10 transition"
                >
                  Compare Colleges
                </Link>

              </div>

            </div>

            {/* Right */}
            <div className="grid grid-cols-2 gap-5">

              <div className="rounded-3xl bg-white/5 border border-white/10 p-7">
                <h2 className="text-5xl font-bold text-blue-400">1200+</h2>
                <p className="mt-3 text-zinc-400">Colleges</p>
              </div>

              <div className="rounded-3xl bg-white/5 border border-white/10 p-7">
                <h2 className="text-5xl">🤖</h2>
                <p className="mt-3 text-zinc-400">AI Chatbot</p>
              </div>

              <div className="rounded-3xl bg-white/5 border border-white/10 p-7">
                <h2 className="text-5xl">⭐</h2>
                <p className="mt-3 text-zinc-400">Student Reviews</p>
              </div>

              <div className="rounded-3xl bg-white/5 border border-white/10 p-7">
                <h2 className="text-5xl">🏆</h2>
                <p className="mt-3 text-zinc-400">NIRF Rankings</p>
              </div>

            </div>

          </div>

        </div>

      </section>
      <Features />
      <Categories/>

      {/* College List */}
      <section
        id="colleges"
        className="max-w-7xl mx-auto px-6 py-12"
      >

        <h2 className="text-4xl font-bold">
          Browse Colleges
        </h2>

        <p className="text-zinc-400 mt-3 mb-10">
          Discover top engineering colleges across India with detailed
          information about placements, fees, rankings and student reviews.
        </p>

        <CollegeList colleges={colleges} />

      </section>

      <FAQ />

    </main>
  );
}