export default function AboutPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">

      <div className="text-center mb-16">

        <span className="rounded-full bg-blue-600/20 px-4 py-2 text-blue-400">
          About College Compass
        </span>

        <h1 className="mt-6 text-5xl font-bold">
          Helping Students Make Better College Decisions
        </h1>

        <p className="mt-6 text-zinc-400 max-w-3xl mx-auto text-lg leading-8">
          College Compass is an AI-powered platform that helps students
          discover, compare and evaluate colleges across India using
          verified information, student reviews and intelligent insights.
        </p>

      </div>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <div className="text-5xl mb-5">🎯</div>

          <h2 className="text-2xl font-semibold mb-4">
            Our Mission
          </h2>

          <p className="text-zinc-400">
            Make college discovery simple, transparent and accessible
            for every student.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <div className="text-5xl mb-5">🤖</div>

          <h2 className="text-2xl font-semibold mb-4">
            AI Powered
          </h2>

          <p className="text-zinc-400">
            Gemini AI helps students compare colleges, ask questions
            and understand important information quickly.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <div className="text-5xl mb-5">🏛️</div>

          <h2 className="text-2xl font-semibold mb-4">
            College Database
          </h2>

          <p className="text-zinc-400">
            Explore 1200+ colleges with information about rankings,
            placements, fees, ratings and more.
          </p>
        </div>

      </div>

      <div className="mt-20 rounded-3xl border border-white/10 bg-white/5 p-10 text-center">

        <h2 className="text-4xl font-bold mb-5">
          Built with Modern Technologies
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mt-8">

          {[
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "Prisma",
            "PostgreSQL",
            "JWT",
            "Gemini AI",
          ].map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-blue-300"
            >
              {tech}
            </span>
          ))}

        </div>

      </div>

    </main>
  );
}