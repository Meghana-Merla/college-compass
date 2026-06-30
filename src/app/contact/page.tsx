import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">

      <div className="text-center mb-16">

        <span className="rounded-full bg-blue-600/20 px-4 py-2 text-blue-400">
          Contact Us
        </span>

        <h1 className="mt-6 text-5xl font-bold">
          We'd Love to Hear From You
        </h1>

        <p className="mt-6 text-zinc-400 max-w-3xl mx-auto text-lg leading-8">
          Have suggestions, feedback or questions about College Compass?
          Feel free to reach out using the details below.
        </p>

      </div>

      <div className="grid lg:grid-cols-2 gap-10">

        {/* Contact Info */}

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

          <h2 className="text-3xl font-bold mb-8">
            Get in Touch
          </h2>

          <div className="space-y-6">

            <div>
              <p className="text-zinc-400 mb-1">
                📧 Email
              </p>

              <p className="text-lg">
                meghana.merla31@example.com
              </p>
            </div>

            <div>
              <p className="text-zinc-400 mb-1">
                🐙 GitHub
              </p>

              <a
                href="https://github.com/Meghana-Merla"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                github.com/Meghana-Merla
              </a>
            </div>

            <div>
              <p className="text-zinc-400 mb-1">
                💼 LinkedIn
              </p>

              <a
                href="https://www.linkedin.com/in/durga-naga-meghana-merla-9338b7320/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                linkedin.com/in/Durga-Naga-Meghana-Merla
              </a>
            </div>

          </div>

        </div>

        {/* Contact Form */}

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

          <h2 className="text-3xl font-bold mb-8">
            Send Feedback
          </h2>

          <form className="space-y-5">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full rounded-xl bg-zinc-900 border border-white/10 p-4 outline-none focus:border-blue-500"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full rounded-xl bg-zinc-900 border border-white/10 p-4 outline-none focus:border-blue-500"
            />

            <textarea
              rows={6}
              placeholder="Your Message"
              className="w-full rounded-xl bg-zinc-900 border border-white/10 p-4 outline-none focus:border-blue-500 resize-none"
            />

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r
                from-blue-600
                to-cyan-600 py-4 font-semibold hover:bg-blue-700 transition"
            >
              Send Message
            </button>

          </form>

        </div>

      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/compare"
          className="rounded-xl bg-gradient-to-r
                from-blue-600
                to-cyan-600 px-8 py-4 font-semibold hover:bg-blue-700 transition"
        >
          Compare Colleges
        </Link>

        <Link
          href="/"
          className="rounded-xl border border-white/10 px-8 py-4 font-semibold hover:bg-white/10 transition"
        >
          Browse Colleges
        </Link>
      </div>

    </main>
  );
}